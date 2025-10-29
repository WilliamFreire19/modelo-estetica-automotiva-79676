import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as adminApi from '../../services/adminApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming

const DashboardOverviewPage: React.FC = () => {
    const { token } = useAuth();
    const [summary, setSummary] = useState<adminApi.AnalyticsSummary | null>(null);
    const [viewsByPath, setViewsByPath] = useState<adminApi.ViewsByPath[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError("Authentication token not found.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const summaryData = await adminApi.getAnalyticsSummary(token);
                setSummary(summaryData);
                const viewsData = await adminApi.getAnalyticsViewsByPath(token);
                setViewsByPath(viewsData);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) return <div className="text-center py-10">Loading dashboard data...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Page Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{summary?.totalPageViews ?? 'N/A'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Visitors (Tracked Events)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{summary?.totalVisitors ?? 'N/A'}</p>
                        <p className="text-sm text-gray-500">Note: 'Visitor' count is based on tracked 'visitor' events. True uniques may vary.</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Page Views by Path</h2>
            {viewsByPath.length > 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <ul className="space-y-2">
                            {viewsByPath.map((item) => (
                                <li key={item._id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                                    <span className="text-gray-700">{item._id}</span>
                                    <span className="font-semibold">{item.count} views</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ) : (
                <p>No page view data by path available yet.</p>
            )}
        </div>
    );
};

export default DashboardOverviewPage;
