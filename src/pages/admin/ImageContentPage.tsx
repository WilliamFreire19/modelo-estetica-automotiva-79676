import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as adminApi from '../../services/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// import { toast } from '@/components/ui/use-toast'; // If you have a toast component

interface ImageContentDefinition {
    identifier: string; // e.g., 'siteLogo', 'homeBanner1', 'productThumbnail_XYZ'
    label: string; // User-friendly label, e.g., "Site Logo"
    type: string; // Backend type e.g. 'logoPath', 'bannerImage', 'productImage' (must match imageRoutes on backend)
    currentPath?: string | null;
    file?: File | null;
}

const ImageContentPage: React.FC = () => {
    const { token } = useAuth();
    // Define the images your site uses. This could also come from an API or config file.
    const [imageSlots, setImageSlots] = useState<ImageContentDefinition[]>([
        { identifier: 'siteLogo', label: 'Site Logo', type: 'logoPath' },
        { identifier: 'homeBanner1', label: 'Homepage Banner 1', type: 'bannerImage' },
        { identifier: 'productExampleImage1', label: 'Example Product Image 1', type: 'productImage' },
        // Add more predefined image slots as your site requires
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState<string | null>(null); // Holds identifier of image being uploaded

    const fetchImagePaths = useCallback(async () => {
        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const allContent = await adminApi.getAllSiteContent(token);
            setImageSlots(prevSlots =>
                prevSlots.map(slot => {
                    const matchingContent = allContent.find(
                        content => content.identifier === slot.identifier && content.type === 'imagePath'
                    );
                    return { ...slot, currentPath: matchingContent?.content || null };
                })
            );
        } catch (err: any) {
            setError(err.message || "Failed to fetch image paths.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchImagePaths();
    }, [fetchImagePaths]);

    const handleFileChange = (identifier: string, file: File | null) => {
        setImageSlots(prevSlots =>
            prevSlots.map(slot =>
                slot.identifier === identifier ? { ...slot, file: file || null } : slot
            )
        );
    };

    const handleUpload = async (identifier: string) => {
        if (!token) {
            alert("Not authenticated.");
            return;
        }
        const slot = imageSlots.find(s => s.identifier === identifier);
        if (!slot || !slot.file) {
            alert("No file selected for upload.");
            return;
        }

        setUploading(identifier);
        setError(null);
        const formData = new FormData();
        formData.append('image', slot.file);

        try {
            // The 'type' here is crucial and must match what the backend expects in `imageRoutes.js`
            // e.g., 'logoPath', 'bannerImage', 'productImage'
            await adminApi.uploadImage(slot.identifier, slot.type, formData, token);
            alert(`Image for ${slot.label} uploaded successfully!`);
            // toast({ title: 'Success', description: `Image for ${slot.label} uploaded.` });
            await fetchImagePaths(); // Refresh paths
            // Clear the file input after successful upload
            setImageSlots(prevSlots =>
                prevSlots.map(s => (s.identifier === identifier ? { ...s, file: null } : s))
            );
        } catch (err: any) {
            console.error(`Failed to upload ${slot.label}:`, err);
            setError(`Failed to upload ${slot.label}: ${err.message}`);
            // toast({ title: 'Error', description: `Failed to upload ${slot.label}: ${err.message}`, variant: 'destructive' });
        } finally {
            setUploading(null);
        }
    };

    const handleDelete = async (identifier: string) => {
        if (!token) {
            alert("Not authenticated.");
            return;
        }
        if (!window.confirm(`Are you sure you want to delete the image for "${identifier}"? This cannot be undone.`)) {
            return;
        }
        try {
            await adminApi.deleteImage(identifier, token);
            alert(`Image for ${identifier} deleted successfully.`);
            // toast({ title: 'Success', description: `Image for ${identifier} deleted.`});
            fetchImagePaths(); // Refresh
        } catch (err: any) {
            console.error(`Failed to delete image ${identifier}:`, err);
            alert(`Failed to delete image ${identifier}: ${err.message}`);
            // toast({ title: 'Error', description: `Failed to delete image ${identifier}: ${err.message}`, variant: 'destructive' });
        }
    };


    if (loading) return <div className="text-center py-10">Loading image management...</div>;
    if (error && !uploading) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Site Images</h1>
            {error && uploading && <p className="text-red-500 mb-4">Error during previous upload: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imageSlots.map(slot => (
                    <Card key={slot.identifier}>
                        <CardHeader>
                            <CardTitle>{slot.label}</CardTitle>
                            <CardDescription>Identifier: {slot.identifier} (Type: {slot.type})</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor={`file-${slot.identifier}`}>Upload new image:</Label>
                                <Input
                                    id={`file-${slot.identifier}`}
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                                    onChange={(e) => handleFileChange(slot.identifier, e.target.files ? e.target.files[0] : null)}
                                    className="mt-1"
                                    disabled={uploading === slot.identifier}
                                />
                            </div>
                            {slot.file && (
                                <p className="text-sm text-gray-600">Selected: {slot.file.name}</p>
                            )}
                            {slot.currentPath && (
                                <div className="mt-2">
                                    <p className="text-sm font-medium">Current Image:</p>
                                    <img
                                        src={adminApi.getImageUrl(slot.currentPath)}
                                        alt={slot.label}
                                        className="mt-1 max-w-full h-auto rounded border border-gray-300 max-h-48 object-contain"
                                    />
                                </div>
                            )}
                            {!slot.currentPath && <p className="text-sm text-gray-500 italic">No image currently set.</p>}
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2 items-start">
                             <Button
                                onClick={() => handleUpload(slot.identifier)}
                                disabled={!slot.file || uploading === slot.identifier}
                                className="w-full"
                            >
                                {uploading === slot.identifier ? 'Uploading...' : `Upload ${slot.label}`}
                            </Button>
                            {slot.currentPath && (
                                <Button
                                    onClick={() => handleDelete(slot.identifier)}
                                    variant="destructive"
                                    className="w-full"
                                    disabled={uploading === slot.identifier}
                                >
                                    Delete Current Image
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
             <p className="mt-8 text-sm text-gray-600">
                Note: Image types (e.g., 'logoPath', 'bannerImage') must match the configuration in the backend API.
                The 'identifier' is used to uniquely reference this image slot throughout the system.
            </p>
        </div>
    );
};

export default ImageContentPage;
