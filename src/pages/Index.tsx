import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { 
  Search, 
  Shield, 
  Leaf, 
  Bot, 
  ArrowRight, 
  CheckCircle2,
  Sprout,
  BookOpen,
  Users
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Comprehensive Database",
    description: "Access detailed information on hundreds of pesticides including usage, hazards, and safety guidelines."
  },
  {
    icon: Bot,
    title: "AI-Powered Assistant",
    description: "Get intelligent recommendations based on your crop type, pest problems, or disease symptoms."
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Complete safety precautions, handling instructions, and environmental impact information."
  },
  {
    icon: Sprout,
    title: "Crop-Specific Guidance",
    description: "Find the right pesticide for your specific crop with our advanced filtering system."
  }
];

const stats = [
  { value: "500+", label: "Pesticides Listed" },
  { value: "50+", label: "Crop Types Covered" },
  { value: "10K+", label: "Farmers Helped" },
  { value: "24/7", label: "AI Support" }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient bg-hero-pattern text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/10" />
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-medium">Trusted Agricultural Resource</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Complete Guide to{" "}
                <span className="relative">
                  Pesticide Safety
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 3 150 3 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Empowering farmers, researchers, and students with accurate pesticide information, 
                AI-powered recommendations, and comprehensive safety guidelines.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pesticides">
                  <Button variant="accent" size="xl">
                    Explore Pesticides
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/ai">
                  <Button variant="glass" size="xl" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20">
                    <Bot className="h-5 w-5" />
                    Try AI Assistant
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-6 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-card border border-border/50 p-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              A comprehensive platform designed to make pesticide information accessible and actionable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-card rounded-2xl border border-border/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-hero-gradient p-8 md:p-16"
          >
            <div className="absolute inset-0 bg-hero-pattern opacity-50" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Make Informed Decisions?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Start exploring our comprehensive pesticide database today. Get AI-powered recommendations 
                tailored to your specific needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pesticides">
                  <Button variant="accent" size="lg">
                    Browse All Pesticides
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="glass" size="lg" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="relative">
                <div className="h-48 w-48 rounded-full bg-primary-foreground/10 animate-pulse-soft" />
                <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-primary-foreground/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Trusted by Agricultural Professionals
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our platform is built with input from agricultural experts, ensuring accurate and 
                reliable information for all users.
              </p>
              <ul className="space-y-4">
                {[
                  "Verified information from agricultural research",
                  "Regular updates with latest pesticide data",
                  "Compliance with safety standards",
                  "AI trained on expert knowledge"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Sprout, label: "Farmers" },
                { icon: BookOpen, label: "Students" },
                { icon: Users, label: "Researchers" },
                { icon: Shield, label: "Safety Officers" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-2xl border border-border/50 text-center hover:shadow-card transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
