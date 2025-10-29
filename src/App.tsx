
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
// import Admin from "./pages/Admin"; // We will replace this with specific admin routes
import NotFound from "./pages/NotFound";
import ServiceRedirect from "./pages/ServiceRedirect";

// Admin Panel Imports
import { AuthProvider } from './context/AuthContext';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardOverviewPage from './pages/admin/DashboardOverviewPage';
import TextContentPage from './pages/admin/TextContentPage';
import ImageContentPage from './pages/admin/ImageContentPage';

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Better user experience
      retry: 1 // Limit retries
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider> {/* AuthProvider wraps BrowserRouter */}
        <div className="bg-autolux-white"> {/* Consider if this global background is desired for admin panel too */}
          <Toaster />
          <Sonner position="top-right" richColors closeButton />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/service-redirect" element={<ServiceRedirect />} />

              {/* Admin Panel Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<ProtectedRoute />}> {/* ProtectedRoute handles auth check */}
                <Route element={<AdminLayout />}> {/* AdminLayout provides nav and structure */}
                  <Route path="dashboard" element={<DashboardOverviewPage />} />
                  <Route path="text-content" element={<TextContentPage />} />
                  <Route path="image-content" element={<ImageContentPage />} />
                  {/* Default admin route: redirect to dashboard or show a welcome page */}
                  <Route index element={<DashboardOverviewPage />} />
                </Route>
              </Route>

              {/* Catch-all Not Found Route - Ensure this is last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
