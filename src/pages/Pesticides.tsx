import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PesticideCard } from "@/components/pesticides/PesticideCard";
import { SearchFilter } from "@/components/pesticides/SearchFilter";
import { pesticides } from "@/data/pesticides";
import { Leaf, Package } from "lucide-react";

export default function Pesticides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPesticides = useMemo(() => {
    return pesticides.filter((pesticide) => {
      const matchesSearch =
        searchQuery === "" ||
        pesticide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pesticide.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pesticide.usedFor.some((crop) =>
          crop.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || pesticide.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

          {/* Pesticide Grid */}
          {filteredPesticides.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPesticides.map((pesticide, index) => (
                <PesticideCard key={pesticide.id} pesticide={pesticide} index={index} />
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
