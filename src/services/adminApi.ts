// Base URL for the admin backend
const ADMIN_API_URL = process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
    token?: string | null;
    isFormData?: boolean;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { token, isFormData, ...fetchConfig } = options;
    const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...fetchConfig,
        headers,
    };

    const response = await fetch(`${ADMIN_API_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'API request failed');
    }

    if (response.status === 204) { // No content
        return null as T;
    }

    return response.json() as Promise<T>;
}

// Authentication
export const loginAdmin = (credentials: any) => fetchApi<any>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
// Add registerAdmin if needed for initial setup, though it might be done via backend directly or a separate script.
// export const registerAdmin = (userData: any) => fetchApi<any>('/auth/register', { method: 'POST', body: JSON.stringify(userData) });


// Site Content (Texts)
export interface SiteContentItem {
    _id?: string;
    identifier: string;
    type: 'text' | 'imagePath' | 'productDescription' | 'contactInfo';
    content: string;
    productId?: string;
    createdAt?: string;
    updatedAt?: string;
}
export const getAllSiteContent = (token: string) => fetchApi<SiteContentItem[]>('/content', { token });
export const getSiteContentByIdentifier = (identifier: string, token: string) => fetchApi<SiteContentItem>(`/content/${identifier}`, { token });
export const createOrUpdateSiteContent = (data: SiteContentItem, token: string) => fetchApi<SiteContentItem>('/content', { method: 'POST', body: JSON.stringify(data), token });
export const deleteSiteContent = (identifier: string, token: string) => fetchApi<any>(`/content/${identifier}`, { method: 'DELETE', token });


// Image Management
export const uploadImage = (identifier: string, type: string, formData: FormData, token: string) => {
    return fetchApi<any>(`/images/upload/${identifier}/${type}`, {
        method: 'POST',
        body: formData,
        token,
        isFormData: true, // Important for multer on backend
    });
};
export const deleteImage = (identifier: string, token: string) => fetchApi<any>(`/images/${identifier}`, { method: 'DELETE', token });
// Note: Serving images is typically done via static serving or direct URL,
// but if needed: export const getImageFile = (filename: string) => `${ADMIN_API_URL}/images/serve/${filename}`;


// Analytics
export interface AnalyticsSummary {
    totalPageViews: number;
    totalVisitors: number;
}
export interface ViewsByPath {
    _id: string; // path
    count: number;
}
export const getAnalyticsSummary = (token: string) => fetchApi<AnalyticsSummary>('/analytics/summary', { token });
export const getAnalyticsViewsByPath = (token: string) => fetchApi<ViewsByPath[]>('/analytics/views-by-path', { token });
// The /analytics/track endpoint is public and would be called from the main site, not typically from the admin panel itself.

// Helper to get image URL if backend serves them and prefix is needed
export const getImageUrl = (relativePath: string) => {
    // Assuming backend is on localhost:5000 and serves /uploads statically
    // and relativePath starts with /uploads/
    const backendBaseUrl = process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:5000';
    if (relativePath && relativePath.startsWith('/uploads')) {
         // Check if backendBaseUrl already ends with /api and remove it for image paths
        const base = backendBaseUrl.replace(/\/api$/, '');
        return `${base}${relativePath}`;
    }
    return relativePath; // Or handle differently if path structure varies
};
