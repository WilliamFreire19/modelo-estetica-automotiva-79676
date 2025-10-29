import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as adminApi from '../../services/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from '@/components/ui/use-toast'; // If you have a toast component

interface EditableContentItem extends adminApi.SiteContentItem {
    isEditing?: boolean;
    editedContent?: string;
}

const TextContentPage: React.FC = () => {
    const { token } = useAuth();
    const [contentItems, setContentItems] = useState<EditableContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newIdentifier, setNewIdentifier] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newType, setNewType] = useState<'text' | 'contactInfo' | 'productDescription'>('text'); // Add more as needed

    const textItemIdentifiers = [
        { id: 'welcomeText', label: 'Welcome Text', type: 'text' },
        { id: 'contactInfoPhone', label: 'Contact Phone', type: 'contactInfo' },
        { id: 'contactInfoEmail', label: 'Contact Email', type: 'contactInfo' },
        { id: 'contactInfoAddress', label: 'Contact Address', type: 'contactInfo' },
        { id: 'productDescriptionExample1', label: 'Example Product Description 1', type: 'productDescription' },
        // Add more predefined identifiers as needed by the site
    ];

    const fetchContent = useCallback(async () => {
        if (!token) {
            setError("Authentication token not found.");
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            // Fetch all content and then filter, or fetch specific items
            const fetchedItems: adminApi.SiteContentItem[] = await adminApi.getAllSiteContent(token);

            const textContent: EditableContentItem[] = textItemIdentifiers.map(ident => {
                const found = fetchedItems.find(item => item.identifier === ident.id && (item.type === 'text' || item.type === 'contactInfo' || item.type === 'productDescription'));
                return found ?
                    { ...found, isEditing: false, editedContent: found.content } :
                    { identifier: ident.id, type: ident.type as any, content: '', isEditing: true, editedContent: '' };
            });

            setContentItems(textContent);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch text content.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    const handleEditToggle = (identifier: string) => {
        setContentItems(prevItems =>
            prevItems.map(item =>
                item.identifier === identifier ? { ...item, isEditing: !item.isEditing, editedContent: item.content } : item
            )
        );
    };

    const handleContentChange = (identifier: string, value: string) => {
        setContentItems(prevItems =>
            prevItems.map(item =>
                item.identifier === identifier ? { ...item, editedContent: value } : item
            )
        );
    };

    const handleSave = async (identifier: string) => {
        if (!token) {
            // toast({ title: 'Error', description: 'Not authenticated.', variant: 'destructive' });
            alert('Error: Not authenticated.');
            return;
        }
        const itemToSave = contentItems.find(item => item.identifier === identifier);
        if (!itemToSave || itemToSave.editedContent === undefined) return;

        try {
            const payload: adminApi.SiteContentItem = {
                identifier: itemToSave.identifier,
                type: itemToSave.type,
                content: itemToSave.editedContent,
            };
            if (itemToSave._id) payload._id = itemToSave._id; // Include _id if it's an update

            await adminApi.createOrUpdateSiteContent(payload, token);
            // toast({ title: 'Success', description: `${itemToSave.identifier} updated.` });
            alert(`${itemToSave.identifier} updated successfully!`);
            fetchContent(); // Refresh content
        } catch (err: any) {
            console.error('Failed to save content:', err);
            // toast({ title: 'Error', description: `Failed to save ${itemToSave.identifier}: ${err.message}`, variant: 'destructive' });
            alert(`Failed to save ${itemToSave.identifier}: ${err.message}`);
        }
    };

    const handleAddNewContent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !newIdentifier.trim() || !newContent.trim()) {
            alert('Identifier and content cannot be empty. Ensure you are logged in.');
            return;
        }
        try {
            const payload: adminApi.SiteContentItem = {
                identifier: newIdentifier.trim(),
                type: newType,
                content: newContent.trim(),
            };
            await adminApi.createOrUpdateSiteContent(payload, token);
            alert(`Content '${newIdentifier}' added successfully!`);
            setNewIdentifier('');
            setNewContent('');
            fetchContent(); // Refresh
        } catch (err: any) {
            console.error('Failed to add new content:', err);
            alert(`Failed to add new content: ${err.message}`);
        }
    };


    if (loading && contentItems.length === 0) return <div className="text-center py-10">Loading text content...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Text Content</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Add New Text Content</CardTitle>
                    <CardDescription>Add a new piece of text content to the site.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddNewContent} className="space-y-4">
                        <div>
                            <Label htmlFor="newIdentifier">Identifier (unique key, e.g., 'aboutUsStatement')</Label>
                            <Input id="newIdentifier" value={newIdentifier} onChange={e => setNewIdentifier(e.target.value)} placeholder="Unique identifier" />
                        </div>
                        <div>
                            <Label htmlFor="newContent">Content</Label>
                            <Textarea id="newContent" value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Text content" />
                        </div>
                         <div>
                            <Label htmlFor="newType">Content Type</Label>
                            <select id="newType" value={newType} onChange={e => setNewType(e.target.value as any)} className="w-full p-2 border rounded">
                                <option value="text">General Text</option>
                                <option value="contactInfo">Contact Info</option>
                                <option value="productDescription">Product Description</option>
                            </select>
                        </div>
                        <Button type="submit">Add New Content</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {contentItems.map(item => (
                    <Card key={item.identifier}>
                        <CardHeader>
                            <CardTitle className="capitalize">{item.identifier.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                             <CardDescription>Identifier: {item.identifier} (Type: {item.type})</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {item.isEditing ? (
                                <div className="space-y-3">
                                    <Textarea
                                        value={item.editedContent}
                                        onChange={(e) => handleContentChange(item.identifier, e.target.value)}
                                        rows={item.type === 'text' ? 5 : 3}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex space-x-2">
                                        <Button onClick={() => handleSave(item.identifier)}>Save</Button>
                                        <Button variant="outline" onClick={() => handleEditToggle(item.identifier)}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-700 whitespace-pre-wrap min-h-[50px] p-2 bg-gray-50 rounded">
                                        {item.content || <span className="text-gray-400 italic">No content set. Click edit to add.</span>}
                                    </p>
                                    <Button variant="outline" className="mt-2" onClick={() => handleEditToggle(item.identifier)}>Edit</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
                {contentItems.length === 0 && !loading && <p>No text content items found or defined. You can add some above.</p>}
            </div>
        </div>
    );
};

export default TextContentPage;
