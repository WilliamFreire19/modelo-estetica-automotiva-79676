const mongoose = require('mongoose');

const SiteContentSchema = new mongoose.Schema({
    identifier: { // e.g., 'welcomeText', 'contactInfo', 'logoPath', 'bannerImage1'
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: { // 'text', 'imagePath', 'productDescription'
        type: String,
        required: true,
        enum: ['text', 'imagePath', 'productDescription', 'contactInfo']
    },
    content: { // Actual text content or path to the image
        type: String,
        required: true
    },
    // For product descriptions, you might want to link to a product ID or add more fields
    productId: {
        type: String, // Or mongoose.Schema.Types.ObjectId if you have a Product model
        sparse: true // Allows this field to be optional and still maintain uniqueness for other fields if needed
    }
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', SiteContentSchema);
