import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { 
  Leaf, 
  Target, 
  Eye, 
  Users, 
  Award,
  BookOpen,
  Shield,
  Globe
} from "lucide-react";

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Agricultural Scientist",
    description: "20+ years in pesticide research and crop protection."
  },
  {
    name: "Prof. James Chen",
    role: "Toxicology Expert",
    description: "Specialist in pesticide safety and environmental impact."
  },
  {
    name: "Maria Rodriguez",
    role: "Farm Liaison",
    description: "Connecting research with practical farming needs."
  }
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "We prioritize accurate safety information to protect farmers, consumers, and the environment."
  },
  {
    icon: BookOpen,
    title: "Education",
    description: "Making complex scientific information accessible to everyone in the agricultural sector."
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Promoting responsible pesticide use for sustainable agriculture."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a knowledge-sharing community of farmers, researchers, and students."
  }
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-6">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-medium">About PestInfo</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Empowering Agriculture Through Knowledge
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              We're on a mission to make pesticide information accessible, accurate, 
              and actionable for everyone in the agricultural sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border/50 p-8"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide comprehensive, reliable, and easy-to-understand pesticide 
                information that helps farmers make informed decisions, protect their 
                health, and ensure food safety for consumers worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border border-border/50 p-8"
            >
              <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where every farmer has access to accurate pesticide information, 
                where AI-powered tools democratize agricultural knowledge, and where 
                sustainable farming practices protect both people and planet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              These principles guide everything we do at PestInfo.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/50 p-6 text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Expert Team</h2>
            <p className="text-muted-foreground">
              Our team brings together decades of experience in agriculture, 
              toxicology, and technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/50 p-6 text-center"
              >
                <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 mb-6">
                <Award className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">Recognition</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Trusted by Agricultural Institutions
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {["Agricultural Research Council", "National Farmers Federation", "University Extension Services", "Ministry of Agriculture"].map((org, index) => (
                  <div key={index} className="px-6 py-3 bg-card rounded-lg border border-border/50">
                    <span className="text-muted-foreground font-medium">{org}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
