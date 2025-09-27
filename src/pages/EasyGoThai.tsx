import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import restaurantImage from "@/assets/restaurant-interior.jpg";

const EasyGoThai = () => {
  const address = "277 Mount Maunganui Rd, Mount Maunganui, Tauranga 3116";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const websiteUrl = "https://easygothai.nz";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero / Summary */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-primary rounded-full mr-3" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">Mount Maunganui</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">Easy Go Thai</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Authentic Thai cuisine at the beach. For menus, ordering, and reservations, visit the official site.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center"><MapPin size={18} className="mr-3 text-primary" /><span>{address}</span></div>
                <div className="flex items-center"><Phone size={18} className="mr-3 text-primary" /><a href="tel:075748500" className="hover:text-primary transition-colors">(07) 574 8500</a></div>
                <div className="flex items-center"><Mail size={18} className="mr-3 text-primary" /><a href="mailto:manager@easygothai.nz" className="hover:text-primary transition-colors">manager@easygothai.nz</a></div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center">
                  Go to Easy Go Thai <ExternalLink size={18} className="ml-2" />
                </a>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center">
                  Get Directions <ExternalLink size={18} className="ml-2" />
                </a>
              </div>
            </div>

            <div className="animate-scale-in">
              <img src={restaurantImage} alt="Easy Go Thai interior" className="rounded-lg shadow-lg w-full h-[380px] md:h-[460px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EasyGoThai;