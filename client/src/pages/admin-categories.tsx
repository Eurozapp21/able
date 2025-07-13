import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2, ArrowLeft, FolderOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  nameEl: z.string().optional(),
  description: z.string().optional(),
  descriptionEl: z.string().optional(),
  parentId: z.number().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

export default function AdminCategories() {
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      nameEl: "",
      description: "",
      descriptionEl: "",
      parentId: undefined,
      icon: "",
      image: "",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => apiRequest('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Success", description: "Category created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create category", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryFormData }) => 
      apiRequest(`/api/admin/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      setIsDialogOpen(false);
      setEditingCategory(null);
      form.reset();
      toast({ title: "Success", description: "Category updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update category", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/categories/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({ title: "Success", description: "Category deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete category", variant: "destructive" });
    },
  });

  const handleCreate = () => {
    setEditingCategory(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.reset({
      name: category.name,
      nameEl: category.nameEl || "",
      description: category.description || "",
      descriptionEl: category.descriptionEl || "",
      parentId: category.parentId || undefined,
      icon: category.icon || "",
      image: category.image || "",
      isActive: category.isActive !== false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this category? This will also affect related products.')) {
      deleteMutation.mutate(id);
    }
  };

  const getParentName = (parentId: number | null) => {
    if (!parentId) return "Main Category";
    const parent = categories?.find(c => c.id === parentId);
    return parent?.name || "Unknown";
  };

  const getHierarchyLevel = (category: Category): number => {
    if (!category.parentId) return 0;
    const parent = categories?.find(c => c.id === category.parentId);
    return parent ? getHierarchyLevel(parent) + 1 : 0;
  };

  if (categoriesLoading) {
    return <div className="container mx-auto px-4 py-8">Loading categories...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setLocation('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="text-gray-600">Manage categories in English and Greek</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} style={{ backgroundColor: '#ffeb3b', color: '#000' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" style={{ color: '#ffeb3b' }} />
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* English Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">English Content</h3>
                  
                  <div>
                    <Label htmlFor="name">Category Name *</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="Enter category name in English"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      {...form.register('description')}
                      placeholder="Category description in English"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Greek Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Greek Content (Ελληνικά)</h3>
                  
                  <div>
                    <Label htmlFor="nameEl">Category Name (Greek)</Label>
                    <Input
                      id="nameEl"
                      {...form.register('nameEl')}
                      placeholder="Εισάγετε το όνομα κατηγορίας στα ελληνικά"
                    />
                  </div>

                  <div>
                    <Label htmlFor="descriptionEl">Description (Greek)</Label>
                    <Textarea
                      id="descriptionEl"
                      {...form.register('descriptionEl')}
                      placeholder="Περιγραφή κατηγορίας στα ελληνικά"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentId">Parent Category</Label>
                  <Select value={form.watch('parentId')?.toString() || ""} onValueChange={(value) => form.setValue('parentId', value ? parseInt(value) : undefined)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Parent (Main Category)</SelectItem>
                      {categories?.filter(c => c.id !== editingCategory?.id).map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {"  ".repeat(getHierarchyLevel(category))}
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    {...form.register('icon')}
                    placeholder="Lucide icon name (e.g., package, user)"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Category Image URL</Label>
                <Input
                  id="image"
                  {...form.register('image')}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={form.watch('isActive')}
                  onCheckedChange={(checked) => form.setValue('isActive', checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{ backgroundColor: '#ffeb3b', color: '#000' }}
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 
                   editingCategory ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories List</CardTitle>
          <CardDescription>
            {categories?.length || 0} categories in hierarchy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    {"  ".repeat(getHierarchyLevel(category))}
                    {category.name}
                  </TableCell>
                  <TableCell>{getParentName(category.parentId)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Level {getHierarchyLevel(category)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      category.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{category.icon || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(category.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}