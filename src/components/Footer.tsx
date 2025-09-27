import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-serif font-bold text-primary mb-4">
              Garoon Thai
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Experience authentic Thai cuisine that brings the vibrant flavours of Thailand to Tauranga. 
              Two locations serving fresh, traditional dishes with modern flair.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <a href="mailto:info@garoonthai.nz" className="hover:text-primary transition-colors">
                  info@garoonthai.nz
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/our-stores" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Our Stores
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Our Stores</h4>
            <div className="space-y-4 text-sm">
              <div>
                <Link to="/stores/easy-go-thai" className="font-medium text-foreground hover:text-primary transition-colors">
                  Easy Go Thai
                </Link>
                <p className="text-muted-foreground">Mount Maunganui</p>
              </div>
              <div>
                <Link to="/stores/asian-fusion" className="font-medium text-foreground hover:text-primary transition-colors">
                  Asian Fusion
                </Link>
                <p className="text-muted-foreground">Bethlehem</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Easy Go Thai. All rights reserved.</p>
          {/*<div className="flex space-x-6 mt-4 md:mt-0">*/}
          {/*  <Link to="/privacy" className="hover:text-primary transition-colors">*/}
          {/*    Privacy Policy*/}
          {/*  </Link>*/}
          {/*  <Link to="/terms" className="hover:text-primary transition-colors">*/}
          {/*    Terms of Service*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;