import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pesticide, getCategoryColor } from "@/data/pesticides";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, AlertTriangle, Shield } from "lucide-react";

interface PesticideCardProps {
  pesticide: Pesticide;
  index: number;
}

export function PesticideCard({ pesticide, index }: PesticideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/pesticides/${pesticide.id}`}>
        <Card className="group h-full hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden">
          {/* Card Image */}
          {pesticide.image && (
            <div className="relative h-40 overflow-hidden">
              <img
                src={pesticide.image}
                alt={`${pesticide.name} - ${pesticide.category}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <Badge 
                variant="outline" 
                className={`absolute top-3 right-3 ${getCategoryColor(pesticide.category)} text-xs font-medium border backdrop-blur-sm`}
              >
                {pesticide.category}
              </Badge>
            </div>
          )}
          
          <CardHeader className={`pb-3 ${!pesticide.image ? 'pt-6' : 'pt-4'}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {pesticide.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {pesticide.activeIngredient}
                </p>
              </div>
              {!pesticide.image && (
                <Badge 
                  variant="outline" 
                  className={`${getCategoryColor(pesticide.category)} text-xs font-medium border`}
                >
                  {pesticide.category}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Crops */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-medium">
                Used for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pesticide.usedFor.slice(0, 3).map((crop) => (
                  <span
                    key={crop}
                    className="px-2 py-1 bg-secondary rounded-md text-xs text-secondary-foreground"
                  >
                    {crop}
                  </span>
                ))}
                {pesticide.usedFor.length > 3 && (
                  <span className="px-2 py-1 text-xs text-muted-foreground">
                    +{pesticide.usedFor.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-4 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-amber-600">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span className="text-xs">Hazards noted</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Shield className="h-3.5 w-3.5" />
                <span className="text-xs">Safety guide</span>
              </div>
            </div>

            {/* View More */}
            <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              View Details
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
