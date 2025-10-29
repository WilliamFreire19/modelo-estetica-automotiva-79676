const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Multer configuration
const SiteContent = require('../models/SiteContent');
const { protect } = require('../middleware/authMiddleware');
const fs = require('fs');
const path = require('path');

// @route   POST /api/images/upload/:identifier/:type
// @desc    Upload an image and associate it with an identifier
// @access  Protected
router.post('/upload/:identifier/:type', protect, upload.single('image'), async (req, res) => {
    const { identifier, type } = req.params;
    const validTypes = ['logoPath', 'bannerImage', 'productImage', 'galleryImage']; // Add more as needed

    if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
    }
    if (!identifier) {
        fs.unlinkSync(req.file.path); // Delete uploaded file if identifier is missing
        return res.status(400).json({ message: 'Identifier is required in the path' });
    }
    if (!type || !validTypes.includes(type)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: `Invalid image type. Valid types are: ${validTypes.join(', ')}` });
    }

    const imagePath = `/uploads/${req.file.filename}`; // Path to be stored in DB

    try {
        // Check if there's existing content for this identifier (e.g., an old image)
        const existingContent = await SiteContent.findOne({ identifier: identifier, type: 'imagePath' });

        if (existingContent && existingContent.content !== imagePath) {
            // Delete old image file if it exists and is different
            const oldImagePath = path.join(__dirname, '..', existingContent.content);
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                    console.log(`Old image ${existingContent.content} deleted.`);
                } catch (unlinkErr) {
                    console.error(`Error deleting old image ${existingContent.content}:`, unlinkErr);
                    // Decide if this error should prevent updating the DB entry.
                    // For now, we'll proceed to update the DB entry even if old file deletion fails.
                }
            }
        }

        // Create or update the SiteContent entry for this image
        let siteContent = await SiteContent.findOneAndUpdate(
            { identifier: identifier, type: 'imagePath' }, // Query to find the document
            { // Data to update or insert
                identifier: identifier,
                type: 'imagePath', // Storing as 'imagePath'
                content: imagePath // Store the relative path to the image
            },
            { upsert: true, new: true, setDefaultsOnInsert: true } // Options
        );

        res.status(201).json({
            message: 'Image uploaded and path saved successfully',
            filePath: imagePath,
            content: siteContent
        });

    } catch (error) {
        console.error('Error saving image path to DB:', error);
        // If DB operation fails, delete the uploaded file to prevent orphans
        fs.unlinkSync(req.file.path);
        res.status(500).json({ message: 'Server error while saving image information' });
    }
});

// @route   GET /api/images/serve/:filename
// @desc    Serve an image file (optional, if not serving statically from frontend or CDN)
// @access  Public
// Note: For production, it's often better to serve static files directly via Nginx/Apache
// or a CDN, rather than through Node.js, for performance.
// This backend is inside 'admin-backend', so images are in 'admin-backend/uploads'.
// The main frontend might be in a different directory or served differently.
// We need to ensure the frontend can access these images.
// One way is to make the 'uploads' folder static in this backend.
router.get('/serve/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.params.filename);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'Image not found' });
    }
});


// @route   DELETE /api/images/:identifier
// @desc    Delete an image record from DB and the file from server
// @access  Protected
router.delete('/:identifier', protect, async (req, res) => {
    const { identifier } = req.params;

    try {
        const imageContent = await SiteContent.findOne({ identifier: identifier, type: 'imagePath' });

        if (!imageContent) {
            return res.status(404).json({ message: 'Image record not found for this identifier.' });
        }

        const imagePathOnServer = path.join(__dirname, '..', imageContent.content);

        // Attempt to delete from DB first
        await SiteContent.deleteOne({ _id: imageContent._id });

        // Then attempt to delete file
        if (fs.existsSync(imagePathOnServer)) {
            try {
                fs.unlinkSync(imagePathOnServer);
                res.json({ message: `Image record and file ${imageContent.content} deleted successfully.` });
            } catch (unlinkErr) {
                console.error(`Error deleting image file ${imageContent.content}:`, unlinkErr);
                // If file deletion fails, the DB record is already deleted.
                // This might leave an orphan file, but the reference is gone.
                res.status(500).json({ message: `Image record deleted, but failed to delete file: ${unlinkErr.message}` });
            }
        } else {
            res.json({ message: 'Image record deleted, but file was not found on server.' });
        }

    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Server error while deleting image.' });
    }
});


module.exports = router;
