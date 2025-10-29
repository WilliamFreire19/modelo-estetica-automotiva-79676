const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    metric: { // 'pageView', 'visitor'
        type: String,
        required: true,
        enum: ['pageView', 'visitor']
    },
    path: { // Path of the page viewed, if applicable
        type: String,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    // Could add more details like IP (hashed), user agent, etc. for more detailed analytics
    // For simplicity, keeping it basic for now.
});

// Example of a compound index if we were to query by metric and date often
// AnalyticsSchema.index({ metric: 1, timestamp: -1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
