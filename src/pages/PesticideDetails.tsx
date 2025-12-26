import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pesticides, getCategoryColor } from "@/data/pesticides";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Shield, 
  Leaf, 
  Clock, 
  Droplets,
  ChevronRight,
  Info
} from "lucide-react";

export default function PesticideDetails() {
  const { id } = useParams();
  const pesticide = pesticides.find((p) => p.id === Number(id));

  if (!pesticide) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Pesticide not found</h1>
          <Link to="/pesticides">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/pesticides" className="text-muted-foreground hover:text-foreground transition-colors">
              Pesticides
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{pesticide.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div>
              <Link to="/pesticides" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Directory
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {pesticide.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {pesticide.activeIngredient}
              </p>
              <Badge 
                variant="outline" 
                className={`${getCategoryColor(pesticide.category)} text-sm font-medium border px-4 py-1`}
              >
                {pesticide.category}
              </Badge>
            </div>

            <div className="flex gap-3">
              <Link to="/ai">
                <Button variant="outline">
                  <Info className="h-4 w-4 mr-2" />
                  Ask AI About This
                </Button>
              </Link>
              <Button variant="default">
                <Leaf className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Crops Used For */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-leaf/10 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-leaf" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Crops & Uses</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pesticide.usedFor.map((crop) => (
                    <span
                      key={crop}
                      className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-secondary-foreground"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hazards */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Hazards & Risks</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {pesticide.hazards}
                </p>
              </div>

              {/* Safety Precautions */}
              <div className="bg-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Safety Precautions</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {pesticide.precautions}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Quick Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Droplets className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Application Method</p>
                      <p className="font-medium text-foreground">{pesticide.applicationMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Safety Interval</p>
                      <p className="font-medium text-foreground">{pesticide.safetyInterval}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 text-sm">Safety Notice</p>
                        <p className="text-amber-700 text-sm mt-1">
                          Always read and follow the product label before use.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
