import { Search, Filter, X, Wheat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/pesticides";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCrop: string;
  setSelectedCrop: (crop: string) => void;
  availableCrops: string[];
}

export function SearchFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCrop,
  setSelectedCrop,
  availableCrops,
}: SearchFilterProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
      <div className="flex flex-col gap-4">
        {/* Search and Crop Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search pesticides by name, crop, or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-background border-border/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Crop Filter Dropdown */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <Wheat className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="h-12 bg-background border-border/50">
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="All">All Crops</SelectItem>
                {availableCrops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 text-muted-foreground mr-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">Category:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
