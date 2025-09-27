import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, ExternalLink, Clock, Car, Utensils } from "lucide-react";
// import restaurantImage from "@/assets/restaurant-interior.jpg";
import asianFusionImage from '../assets/Asian_Fusion_shopfront.jpg'
import easyGoThaiImage from '../assets/EasyGoThai_Shopfront.jpg'

const OurStores = () => {
  const stores = [
    {
      id: "easy-go-thai",
      name: "Easy Go Thai",
      subtitle: "Mount Maunganui",
      description: "Easy Go Thai restaurant is located in the main area of Mount Maunganui and open 7 days a week from lunchtime to late. We are BYO and fully licensed and offer exceptional service and great Thai food for dine-in, takeaways , and delivery.",
      address: "277 Mount Maunganui Rd, Mount Maunganui, Tauranga 3116",
      phone: "(07) 574 8500",
      email: "manager@easygothai.nz",
      website: "easygothai.nz",
      services: ["Dine-in", "Takeaway", "Delivery"],
      specialties: ["Traditional Pad Thai", "Fresh Seafood Curries", "Beachside Atmosphere"],
      image: easyGoThaiImage
    },
    {
      id: "asian-fusion",
      name: "Asian Fusion", 
      subtitle: "Bethlehem",
      description: "Asian Fusion is located next to Pizza Hut at the Bethlehem roundabout (opposite Countdown)\n" +
          "\n" +
          "We offer great Thai food for home dining (either pick up or delivery) in the evenings 5 days per week (Weds - Sun)",
      address: "225 State Highway 2, Bethlehem, Tauranga 3110",
      phone: "022 402 6481", 
      email: "info@asianfusion.nz",
      website: "asianfusion.nz",
      services: ["Dine-in", "Takeaway", "Catering"],
      specialties: ["Fusion Creations", "Traditional Thai", "Modern Presentation"],
      image: asianFusionImage
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">
              Our Stores
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Two distinctive locations, each offering unique experiences while maintaining 
              our commitment to authentic Thai cuisine and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Utensils className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Dine-In Experience</h3>
              <p className="text-sm text-muted-foreground">
                Enjoy our warm atmosphere and full-service dining
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Takeaway & Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Fresh Thai cuisine ready for pickup or delivered to you
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Flexible Service</h3>
              <p className="text-sm text-muted-foreground">
                Quick lunches to leisurely dinners, we adapt to your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {stores.map((store, index) => (
              <div 
                key={store.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={`animate-slide-in-right ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="bg-card rounded-lg p-8 shadow-lg hover-lift">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm font-medium text-primary uppercase tracking-wide">
                        {store.subtitle}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-serif font-bold mb-4">{store.name}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {store.description}
                    </p>

                    {/*/!* Specialties *!/*/}
                    {/*<div className="mb-6">*/}
                    {/*  <h4 className="font-semibold mb-3">Specialties</h4>*/}
                    {/*  <div className="flex flex-wrap gap-2">*/}
                    {/*    {store.specialties.map((specialty) => (*/}
                    {/*      <span */}
                    {/*        key={specialty}*/}
                    {/*        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"*/}
                    {/*      >*/}
                    {/*        {specialty}*/}
                    {/*      </span>*/}
                    {/*    ))}*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    {/* Services */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Services Available</h4>
                      <div className="flex flex-wrap gap-2">
                        {store.services.map((service) => (
                          <span 
                            key={service}
                            className="px-3 py-1 bg-accent/20 text-foreground text-sm rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <MapPin size={16} className="mr-3 text-primary flex-shrink-0" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone size={16} className="mr-3 text-primary flex-shrink-0" />
                        <a href={`tel:${store.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                          {store.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail size={16} className="mr-3 text-primary flex-shrink-0" />
                        <a href={`mailto:${store.email}`} className="hover:text-primary transition-colors">
                          {store.email}
                        </a>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        to={`/stores/${store.id}`}
                        className="btn-primary flex-1 text-center"
                      >
                        View Store Details
                      </Link>
                      {store.website && (
                        <a 
                          href={`https://${store.website}`}
                          target="Easy Go Thai Website"
                          rel="noopener noreferrer"
                          className="btn-outline flex-1 text-center inline-flex items-center justify-center"
                        >
                          Visit Website
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`animate-scale-in ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <img 
                    src={store.image}
                    alt={`${store.name} restaurant interior`}
                    className="rounded-lg shadow-lg hover-lift w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Visit Us Today
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the warmth of Garoon Thai hospitality and taste authentic Thai cuisine 
            prepared with love and tradition at either of our convenient locations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
            <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStores;