const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const { protect } = require('../middleware/authMiddleware'); // Assuming only admin can view detailed analytics

// @route   POST /api/analytics/track
// @desc    Track a metric (e.g., pageView, visitor)
// @access  Public (as this would be hit by the main site)
router.post('/track', async (req, res) => {
    const { metric, path } = req.body;

    if (!metric) {
        return res.status(400).json({ message: 'Metric is required' });
    }
    if (!['pageView', 'visitor'].includes(metric)) {
        return res.status(400).json({ message: 'Invalid metric type' });
    }

    try {
        const newAnalytic = new Analytics({
            metric,
            path: path || '/', // Default path to root if not provided
        });
        await newAnalytic.save();
        res.status(201).json({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking analytic:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/analytics/summary
// @desc    Get analytics summary (e.g., total page views, unique visitors)
// @access  Protected (Admin only)
router.get('/summary', protect, async (req, res) => {
    try {
        const totalPageViews = await Analytics.countDocuments({ metric: 'pageView' });

        // Simplified visitor count: count distinct 'visitor' entries.
        // For true unique visitors, you'd typically look at distinct IPs or session IDs over a time period.
        // This is a placeholder for now.
        const totalVisitors = await Analytics.countDocuments({ metric: 'visitor' });
        // A more accurate unique visitor count might involve aggregation if storing more detail:
        // const uniqueVisitors = await Analytics.distinct('ipAddress', { metric: 'visitor' }).countDocuments();

        res.json({
            totalPageViews,
            totalVisitors
        });
    } catch (error) {
        console.error('Error fetching analytics summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/analytics/views-by-path
// @desc    Get page views grouped by path
// @access  Protected (Admin only)
router.get('/views-by-path', protect, async (req, res) => {
    try {
        const viewsByPath = await Analytics.aggregate([
            { $match: { metric: 'pageView' } },
            { $group: { _id: '$path', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json(viewsByPath);
    } catch (error) {
        console.error('Error fetching views by path:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
