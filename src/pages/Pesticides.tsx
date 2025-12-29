import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PesticideCard, Pesticide } from "@/components/pesticides/PesticideCard";
import { SearchFilter } from "@/components/pesticides/SearchFilter";
import { supabase } from "@/integrations/supabase/client";
import { Leaf, Package, Loader2 } from "lucide-react";

interface DbPesticide {
  id: string;
  name: string;
  category: string;
  used_for: string[];
  hazards: string;
  precautions: string;
  active_ingredient: string;
  application_method: string;
  safety_interval: string;
  image_url: string | null;
}

export default function Pesticides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [pesticides, setPesticides] = useState<DbPesticide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPesticides = async () => {
      const { data, error } = await supabase
        .from("pesticides")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching pesticides:", error);
      } else {
        setPesticides(data || []);
      }
      setIsLoading(false);
    };

    fetchPesticides();
  }, []);

  // Extract unique crops from all pesticides
  const availableCrops = Array.from(
    new Set(pesticides.flatMap((p) => p.used_for))
  ).sort();

  const filteredPesticides = pesticides.filter((pesticide) => {
    const matchesSearch =
      searchQuery === "" ||
      pesticide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pesticide.active_ingredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pesticide.used_for.some((crop) =>
        crop.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || pesticide.category === selectedCategory;

    const matchesCrop =
      selectedCrop === "All" ||
      pesticide.used_for.some(
        (crop) => crop.toLowerCase() === selectedCrop.toLowerCase()
      );

    return matchesSearch && matchesCategory && matchesCrop;
  });

  // Transform DB pesticide to component format
  const transformPesticide = (p: DbPesticide) => ({
    id: p.id,
    name: p.name,
    category: p.category as any,
    usedFor: p.used_for,
    hazards: p.hazards,
    precautions: p.precautions,
    activeIngredient: p.active_ingredient,
    applicationMethod: p.application_method,
    safetyInterval: p.safety_interval,
    image: p.image_url || undefined,
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-6 w-6" />
              <span className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
                Pesticide Directory
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Our Pesticide Database
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Search through our comprehensive collection of pesticides. Find detailed 
              information about usage, safety, and application methods.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Search & Filter */}
          <div className="-mt-12 mb-8 relative z-10">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
              availableCrops={availableCrops}
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredPesticides.length}</span> pesticides
              {selectedCategory !== "All" && (
                <span> in <span className="font-medium text-foreground">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPesticides.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPesticides.map((pesticide, index) => (
                <PesticideCard 
                  key={pesticide.id} 
                  pesticide={transformPesticide(pesticide)} 
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No pesticides found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
