import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
// Assuming you might have icons, e.g., from lucide-react
// import { LayoutDashboard, FileText, Image, BarChart2, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', /*icon: <LayoutDashboard size={20} />*/ },
        { name: 'Text Content', path: '/admin/text-content', /*icon: <FileText size={20} />*/ },
        { name: 'Image Management', path: '/admin/image-content', /*icon: <Image size={20} />*/ },
        // Add more items as needed, e.g., for specific product management if separate from general text/images
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4 space-y-6">
                <div className="text-center py-4">
                    <h1 className="text-2xl font-semibold">Admin Panel</h1>
                    {user && <p className="text-sm text-gray-400">Welcome, {user.username}</p>}
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    {/* {item.icon} */}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto">
                    <Button
                        onClick={handleLogout}
                        variant="ghost" // Assuming a ghost or similar variant for contrast
                        className="w-full flex items-center space-x-2 text-red-400 hover:text-red-300 hover:bg-gray-700"
                    >
                        {/* <LogOut size={20} /> */}
                        <span>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet /> {/* Child routes will render here */}
            </main>
        </div>
    );
};

export default AdminLayout;
