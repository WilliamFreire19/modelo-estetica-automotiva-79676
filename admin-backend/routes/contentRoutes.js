const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/content
// @desc    Get all site content or by identifier
// @access  Public (or Protected, depending on if content is sensitive before login)
router.get('/', async (req, res) => {
    try {
        const { identifier } = req.query;
        let content;
        if (identifier) {
            content = await SiteContent.findOne({ identifier });
            if (!content) {
                // Optionally return a default or empty state instead of 404
                // This is useful if the frontend expects certain identifiers
                return res.status(404).json({ message: `Content with identifier '${identifier}' not found.` });
            }
        } else {
            content = await SiteContent.find({});
        }
        res.json(content);
    } catch (error) {
        console.error('Error fetching site content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/content
// @desc    Create or update site content (text or image path)
// @access  Protected
router.post('/', protect, async (req, res) => {
    const { identifier, type, content, productId } = req.body;

    if (!identifier || !type || !content) {
        return res.status(400).json({ message: 'Identifier, type, and content are required' });
    }

    if (!['text', 'imagePath', 'productDescription', 'contactInfo'].includes(type)) {
        return res.status(400).json({ message: 'Invalid content type' });
    }

    try {
        let siteContent = await SiteContent.findOne({ identifier });

        if (siteContent) {
            // Update existing content
            siteContent.type = type;
            siteContent.content = content;
            if (productId !== undefined) siteContent.productId = productId;
            siteContent.updatedAt = Date.now();
        } else {
            // Create new content
            siteContent = new SiteContent({
                identifier,
                type,
                content,
                productId
            });
        }

        const updatedContent = await siteContent.save();
        res.status(201).json(updatedContent);
    } catch (error) {
        console.error('Error saving site content:', error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: `Content with identifier '${identifier}' already exists.` });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/content/:identifier
// @desc    Get specific site content by identifier
// @access  Public (or Protected)
router.get('/:identifier', async (req, res) => {
    try {
        const content = await SiteContent.findOne({ identifier: req.params.identifier });
        if (!content) {
            // Optionally return a default or empty state
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        console.error('Error fetching specific site content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// @route   DELETE /api/content/:identifier
// @desc    Delete site content by identifier
// @access  Protected
// Note: Use with caution. Usually, you update content, not delete it, unless it's dynamic.
router.delete('/:identifier', protect, async (req, res) => {
    try {
        const siteContent = await SiteContent.findOneAndDelete({ identifier: req.params.identifier });

        if (!siteContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.json({ message: 'Content removed successfully' });
    } catch (error) {
        console.error('Error deleting site content:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
