import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Leaf, 
  LogOut, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  Users,
  MessageSquare,
  BarChart3,
  Menu,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Pesticide {
  id: string;
  name: string;
  category: string;
  used_for: string[];
  active_ingredient: string;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Insecticide: 'bg-amber-100 text-amber-800 border-amber-200',
    Herbicide: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Fungicide: 'bg-purple-100 text-purple-800 border-purple-200',
    Rodenticide: 'bg-red-100 text-red-800 border-red-200',
    Bactericide: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<Pesticide | null>(null);
  const [pesticides, setPesticides] = useState<Pesticide[]>([]);
  const [stats, setStats] = useState({
    totalPesticides: 0,
    categories: 0,
    messages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pesticides
        const { data: pesticidesData, error: pesticidesError } = await supabase
          .from("pesticides")
          .select("id, name, category, used_for, active_ingredient")
          .order("name");

        if (pesticidesError) throw pesticidesError;
        setPesticides(pesticidesData || []);

        // Calculate stats
        const categories = new Set(pesticidesData?.map(p => p.category) || []);
        
        // Fetch message count
        const { count: messageCount } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true });

        setStats({
          totalPesticides: pesticidesData?.length || 0,
          categories: categories.size,
          messages: messageCount || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, toast]);

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const handleDelete = async () => {
    if (!deleteDialog) return;

    try {
      const { error } = await supabase
        .from("pesticides")
        .delete()
        .eq("id", deleteDialog.id);

      if (error) throw error;

      setPesticides(prev => prev.filter(p => p.id !== deleteDialog.id));
      setStats(prev => ({
        ...prev,
        totalPesticides: prev.totalPesticides - 1,
      }));

      toast({
        title: "Pesticide deleted",
        description: `${deleteDialog.name} has been removed from the database.`,
      });
    } catch (error) {
      console.error("Error deleting pesticide:", error);
      toast({
        title: "Error",
        description: "Failed to delete pesticide. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialog(null);
    }
  };

  const filteredPesticides = pesticides.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const statsData = [
    { label: "Total Pesticides", value: stats.totalPesticides.toString(), icon: Package, color: "text-primary" },
    { label: "Categories", value: stats.categories.toString(), icon: BarChart3, color: "text-accent" },
    { label: "Messages", value: stats.messages.toString(), icon: MessageSquare, color: "text-leaf" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">PestInfo</span>
            </Link>
            <button
              className="lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <Package className="h-5 w-5" />
              Pesticides
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              Messages
              {stats.messages > 0 && (
                <span className="ml-auto bg-sidebar-primary text-sidebar-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {stats.messages}
                </span>
              )}
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </a>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border/50 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-foreground"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border/50 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Pesticide Management */}
          <div className="bg-card rounded-xl border border-border/50">
            <div className="p-5 border-b border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-foreground">Manage Pesticides</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Pesticide
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pesticides..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Used For</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPesticides.map((pesticide) => (
                    <tr key={pesticide.id} className="border-b border-border/50 last:border-0">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{pesticide.name}</p>
                          <p className="text-sm text-muted-foreground sm:hidden">
                            {pesticide.category}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <Badge variant="outline" className={getCategoryColor(pesticide.category)}>
                          {pesticide.category}
                        </Badge>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <p className="text-sm text-muted-foreground">
                          {pesticide.used_for.slice(0, 2).join(", ")}
                          {pesticide.used_for.length > 2 && "..."}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteDialog(pesticide)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPesticides.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No pesticides found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Delete Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Pesticide</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteDialog?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
