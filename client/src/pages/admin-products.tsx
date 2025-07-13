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
import { Plus, Edit, Trash2, ArrowLeft, Package } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Product, Category } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  nameEl: z.string().optional(),
  description: z.string().optional(),
  descriptionEl: z.string().optional(),
  categoryId: z.number().min(1, "Category is required"),
  images: z.array(z.string()).optional(),
  specifications: z.string().optional(),
  specificationsEl: z.string().optional(),
  price: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export default function AdminProducts() {
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      nameEl: "",
      description: "",
      descriptionEl: "",
      categoryId: 0,
      images: [],
      specifications: "",
      specificationsEl: "",
      price: "",
      isFeatured: false,
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => apiRequest('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        images: data.images?.filter(img => img.trim() !== '') || null,
      }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Success", description: "Product created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create product", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) => 
      apiRequest(`/api/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          images: data.images?.filter(img => img.trim() !== '') || null,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsDialogOpen(false);
      setEditingProduct(null);
      form.reset();
      toast({ title: "Success", description: "Product updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update product", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/products/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Success", description: "Product deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete product", variant: "destructive" });
    },
  });

  const handleCreate = () => {
    setEditingProduct(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      nameEl: product.nameEl || "",
      description: product.description || "",
      descriptionEl: product.descriptionEl || "",
      categoryId: product.categoryId,
      images: product.images || [],
      specifications: product.specifications || "",
      specificationsEl: product.specificationsEl || "",
      price: product.price || "",
      isFeatured: product.isFeatured || false,
      isActive: product.isActive !== false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  if (productsLoading) {
    return <div className="container mx-auto px-4 py-8">Loading products...</div>;
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
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage products in English and Greek</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} style={{ backgroundColor: '#ffeb3b', color: '#000' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" style={{ color: '#ffeb3b' }} />
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* English Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">English Content</h3>
                  
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="Enter product name in English"
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
                      placeholder="Product description in English"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specifications">Specifications</Label>
                    <Textarea
                      id="specifications"
                      {...form.register('specifications')}
                      placeholder="Technical specifications in English"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Greek Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Greek Content (Ελληνικά)</h3>
                  
                  <div>
                    <Label htmlFor="nameEl">Product Name (Greek)</Label>
                    <Input
                      id="nameEl"
                      {...form.register('nameEl')}
                      placeholder="Εισάγετε το όνομα προϊόντος στα ελληνικά"
                    />
                  </div>

                  <div>
                    <Label htmlFor="descriptionEl">Description (Greek)</Label>
                    <Textarea
                      id="descriptionEl"
                      {...form.register('descriptionEl')}
                      placeholder="Περιγραφή προϊόντος στα ελληνικά"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specificationsEl">Specifications (Greek)</Label>
                    <Textarea
                      id="specificationsEl"
                      {...form.register('specificationsEl')}
                      placeholder="Τεχνικές προδιαγραφές στα ελληνικά"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="categoryId">Category *</Label>
                  <Select value={form.watch('categoryId')?.toString() || ""} onValueChange={(value) => form.setValue('categoryId', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.categoryId && (
                    <p className="text-sm text-red-600">{form.formState.errors.categoryId.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    {...form.register('price')}
                    placeholder="€0.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="images">Product Images (URLs)</Label>
                <Textarea
                  id="images"
                  value={form.watch('images')?.join('\n') || ''}
                  onChange={(e) => form.setValue('images', e.target.value.split('\n').filter(url => url.trim()))}
                  placeholder="Enter image URLs, one per line"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={form.watch('isFeatured')}
                    onCheckedChange={(checked) => form.setValue('isFeatured', checked)}
                  />
                  <Label htmlFor="isFeatured">Featured Product</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={form.watch('isActive')}
                    onCheckedChange={(checked) => form.setValue('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
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
                   editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>
            {products?.length || 0} products in catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => {
                const category = categories?.find(c => c.id === product.categoryId);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{category?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.isFeatured ? 'Featured' : 'Regular'}
                      </span>
                    </TableCell>
                    <TableCell>{product.price || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(product.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}