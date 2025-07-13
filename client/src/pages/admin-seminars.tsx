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
import { Plus, Edit, Trash2, ArrowLeft, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Seminar } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const seminarFormSchema = z.object({
  title: z.string().min(1, "Seminar title is required"),
  titleEl: z.string().optional(),
  description: z.string().optional(),
  descriptionEl: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  location: z.string().optional(),
  locationEl: z.string().optional(),
  speaker: z.string().optional(),
  speakerEl: z.string().optional(),
  image: z.string().optional(),
  fee: z.string().optional(),
  maxParticipants: z.number().optional(),
  type: z.enum(["seminar", "training"]).default("seminar"),
  isActive: z.boolean().default(true),
});

type SeminarFormData = z.infer<typeof seminarFormSchema>;

export default function AdminSeminars() {
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: seminars, isLoading: seminarsLoading } = useQuery<Seminar[]>({
    queryKey: ['/api/seminars'],
  });

  const form = useForm<SeminarFormData>({
    resolver: zodResolver(seminarFormSchema),
    defaultValues: {
      title: "",
      titleEl: "",
      description: "",
      descriptionEl: "",
      date: "",
      location: "",
      locationEl: "",
      speaker: "",
      speakerEl: "",
      image: "",
      fee: "",
      maxParticipants: undefined,
      type: "seminar",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: SeminarFormData) => apiRequest('/api/admin/seminars', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        date: new Date(data.date).toISOString(),
        maxParticipants: data.maxParticipants || null,
      }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seminars'] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Success", description: "Seminar created successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to create seminar", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SeminarFormData }) => 
      apiRequest(`/api/admin/seminars/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          date: new Date(data.date).toISOString(),
          maxParticipants: data.maxParticipants || null,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seminars'] });
      setIsDialogOpen(false);
      setEditingSeminar(null);
      form.reset();
      toast({ title: "Success", description: "Seminar updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to update seminar", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/admin/seminars/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/seminars'] });
      toast({ title: "Success", description: "Seminar deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message || "Failed to delete seminar", variant: "destructive" });
    },
  });

  const handleCreate = () => {
    setEditingSeminar(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (seminar: Seminar) => {
    setEditingSeminar(seminar);
    form.reset({
      title: seminar.title,
      titleEl: seminar.titleEl || "",
      description: seminar.description || "",
      descriptionEl: seminar.descriptionEl || "",
      date: new Date(seminar.date).toISOString().split('T')[0],
      location: seminar.location || "",
      locationEl: seminar.locationEl || "",
      speaker: seminar.speaker || "",
      speakerEl: seminar.speakerEl || "",
      image: seminar.image || "",
      fee: seminar.fee || "",
      maxParticipants: seminar.maxParticipants || undefined,
      type: (seminar.type as "seminar" | "training") || "seminar",
      isActive: seminar.isActive !== false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: SeminarFormData) => {
    if (editingSeminar) {
      updateMutation.mutate({ id: editingSeminar.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this seminar?')) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (seminarsLoading) {
    return <div className="container mx-auto px-4 py-8">Loading seminars...</div>;
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
            <h1 className="text-3xl font-bold text-gray-900">Seminar Management</h1>
            <p className="text-gray-600">Manage seminars and training in English and Greek</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} style={{ backgroundColor: '#ffeb3b', color: '#000' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Seminar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: '#ffeb3b' }} />
                {editingSeminar ? 'Edit Seminar' : 'Create New Seminar'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* English Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">English Content</h3>
                  
                  <div>
                    <Label htmlFor="title">Seminar Title *</Label>
                    <Input
                      id="title"
                      {...form.register('title')}
                      placeholder="Enter seminar title in English"
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      {...form.register('description')}
                      placeholder="Seminar description in English"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...form.register('location')}
                      placeholder="Seminar location in English"
                    />
                  </div>

                  <div>
                    <Label htmlFor="speaker">Speaker</Label>
                    <Input
                      id="speaker"
                      {...form.register('speaker')}
                      placeholder="Speaker name and credentials"
                    />
                  </div>
                </div>

                {/* Greek Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Greek Content (Ελληνικά)</h3>
                  
                  <div>
                    <Label htmlFor="titleEl">Seminar Title (Greek)</Label>
                    <Input
                      id="titleEl"
                      {...form.register('titleEl')}
                      placeholder="Εισάγετε τον τίτλο σεμιναρίου στα ελληνικά"
                    />
                  </div>

                  <div>
                    <Label htmlFor="descriptionEl">Description (Greek)</Label>
                    <Textarea
                      id="descriptionEl"
                      {...form.register('descriptionEl')}
                      placeholder="Περιγραφή σεμιναρίου στα ελληνικά"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="locationEl">Location (Greek)</Label>
                    <Input
                      id="locationEl"
                      {...form.register('locationEl')}
                      placeholder="Τοποθεσία σεμιναρίου στα ελληνικά"
                    />
                  </div>

                  <div>
                    <Label htmlFor="speakerEl">Speaker (Greek)</Label>
                    <Input
                      id="speakerEl"
                      {...form.register('speakerEl')}
                      placeholder="Όνομα ομιλητή στα ελληνικά"
                    />
                  </div>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    {...form.register('date')}
                  />
                  {form.formState.errors.date && (
                    <p className="text-sm text-red-600">{form.formState.errors.date.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="fee">Fee</Label>
                  <Input
                    id="fee"
                    {...form.register('fee')}
                    placeholder="€185"
                  />
                </div>

                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    {...form.register('maxParticipants', { valueAsNumber: true })}
                    placeholder="20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={form.watch('type')} onValueChange={(value: "seminar" | "training") => form.setValue('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seminar">Educational Seminar</SelectItem>
                      <SelectItem value="training">Professional Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    {...form.register('image')}
                    placeholder="Enter image URL"
                  />
                </div>
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
                   editingSeminar ? 'Update Seminar' : 'Create Seminar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Seminars Table */}
      <Card>
        <CardHeader>
          <CardTitle>Seminars List</CardTitle>
          <CardDescription>
            {seminars?.length || 0} seminars and training courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Max Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seminars?.map((seminar) => (
                <TableRow key={seminar.id}>
                  <TableCell className="font-medium">{seminar.title}</TableCell>
                  <TableCell>{formatDate(seminar.date)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      seminar.type === 'training' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {seminar.type === 'training' ? 'Training' : 'Seminar'}
                    </span>
                  </TableCell>
                  <TableCell>{seminar.location || '-'}</TableCell>
                  <TableCell>{seminar.fee || 'Free'}</TableCell>
                  <TableCell>{seminar.maxParticipants || 'Unlimited'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      seminar.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {seminar.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(seminar)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(seminar.id)}
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