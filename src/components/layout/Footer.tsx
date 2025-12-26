import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">PestInfo</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Your trusted source for comprehensive pesticide information. 
              Helping farmers, researchers, and students make informed decisions.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Pesticides", "AI Assistant", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Safety Guidelines", "Application Methods", "Crop Protection", "Research Papers", "FAQs"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Agricultural Research Center, Main Campus
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">info@pestinfo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 PestInfo. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
