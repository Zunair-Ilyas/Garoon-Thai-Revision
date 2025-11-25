import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Star, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-thai-food.jpg";
import restaurantImage from "@/assets/restaurant-interior.jpg";
import ingredientsImage from "@/assets/thai-ingredients.jpg";
import { dashboardApi } from "@/services/dashboard";
import main_image from '../assets/item-01.jpg'
import main_image_2 from '../assets/pic-01.jpg'

const Home = () => {
    const [email, setEmail] = useState("");
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [subscribing, setSubscribing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribing(true);
        try {
            await dashboardApi.addSubscription(email);
            toast({
                title: "Thanks for subscribing!",
                description: "We'll keep you updated with our latest news and offers.",
            });
            setEmail("");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Please try again later.";
            toast({ title: "Subscription failed", description: message, variant: "destructive" });
        } finally {
            setSubscribing(false);
        }
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contactForm.name || !contactForm.email || !contactForm.message) return;
        setSubmitting(true);
        try {
            await dashboardApi.addMessage({
                name: contactForm.name,
                email: contactForm.email,
                subject: contactForm.subject || null,
                message: contactForm.message,
            });
            toast({
                title: "Thanks for submitting!",
                description: "We'll get back to you within 24 hours.",
            });
            setContactForm({ name: "", email: "", subject: "", message: "" });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Please try again later.";
            toast({ title: "Failed to send message", description: message, variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${main_image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                        Savour the Flavour
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
                        Experience authentic Thai cuisine that brings the vibrant taste of Thailand to Tauranga
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/our-stores" className="btn-primary inline-flex items-center">
                            Explore Our Stores
                            <ArrowRight className="ml-2" size={18} />
                        </Link>
                        <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                            Our Story
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-in-right">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary">
                                Welcome to Garoon Thai
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Thai food is famous around the world; and we promise to try and offer you the best food and service possible.
                                We pride ourselves on top quality ingredients, service, and tasty authentic dishes.
                                Check out our menus for Dine-In, Takeaway, or Delivery and come and join us on our journey,
                                you will not be disappointed...
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                EasyGo Thai restaurant @ the Mount and Asian Fusion @ Bethlehem are part of the Garoon Thai group.
                                The word “garoon” (การุณไทย) has a meaning difficult to translate accurately in English -
                                but the closest translation is “kindness to others".
                            </p>
                            {/*<ul className="space-y-4">*/}
                            {/*  <li className="flex items-start">*/}
                            {/*    <Star className="text-primary mr-3" size={18} />*/}
                            {/*    <span>Authentic Thai cuisine using traditional recipes and fresh ingredients</span>*/}
                            {/*  </li>*/}
                            {/*  <li className="flex items-start">*/}
                            {/*    <Star className="text-primary mr-3" size={18} />*/}
                            {/*    <span>Two locations to serve you better: Mount Maunganui and Bethlehem</span>*/}
                            {/*  </li>*/}
                            {/*  <li className="flex items-start">*/}
                            {/*    <Star className="text-primary mr-3" size={18} />*/}
                            {/*    <span>Perfect for family dinners, date nights, and special occasions</span>*/}
                            {/*  </li>*/}
                            {/*</ul>*/}
                        </div>
                        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl animate-fade-in-up">
                            <img src={main_image_2} alt="Restaurant interior" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter & Contact */}
            {/*<section className="py-20 bg-card">*/}
            {/*    <div className="container mx-auto px-4">*/}
            {/*        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">*/}
            {/*            Newsletter*/}
            {/*            <div className="bg-background rounded-lg p-8 shadow-lg">*/}
            {/*                <h3 className="text-2xl font-serif font-bold mb-4 text-primary">Join Our Newsletter</h3>*/}
            {/*                <p className="text-muted-foreground mb-6">Stay updated with our latest news, menu updates, and special offers.</p>*/}
            {/*                <form onSubmit={handleSubscribe} className="flex gap-3">*/}
            {/*                    <input*/}
            {/*                        type="email"*/}
            {/*                        value={email}*/}
            {/*                        onChange={(e) => setEmail(e.target.value)}*/}
            {/*                        placeholder="Enter your email"*/}
            {/*                        className="flex-1 form-input"*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                    <button className="btn-primary" disabled={subscribing}>*/}
            {/*                        {subscribing ? "Subscribing..." : "Subscribe"}*/}
            {/*                    </button>*/}
            {/*                </form>*/}
            {/*            </div>*/}
            
            {/*            /!* Quick Contact *!/*/}
            {/*            <div className="bg-background rounded-lg p-8 shadow-lg">*/}
            {/*                <h3 className="text-2xl font-serif font-bold mb-4 text-primary">Quick Contact</h3>*/}
            {/*                <form onSubmit={handleContactSubmit} className="space-y-4">*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        value={contactForm.name}*/}
            {/*                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}*/}
            {/*                        placeholder="Your Name"*/}
            {/*                        className="form-input"*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                    <input*/}
            {/*                        type="email"*/}
            {/*                        value={contactForm.email}*/}
            {/*                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}*/}
            {/*                        placeholder="Your Email"*/}
            {/*                        className="form-input"*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        value={contactForm.subject}*/}
            {/*                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}*/}
            {/*                        placeholder="Subject (optional)"*/}
            {/*                        className="form-input"*/}
            {/*                    />*/}
            {/*                    <textarea*/}
            {/*                        value={contactForm.message}*/}
            {/*                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}*/}
            {/*                        placeholder="Your Message"*/}
            {/*                        className="form-textarea"*/}
            {/*                        required*/}
            {/*                    />*/}
            {/*                    <button className="btn-secondary" disabled={submitting}>*/}
            {/*                        {submitting ? "Sending..." : "Send"}*/}
            {/*                    </button>*/}
            {/*                </form>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

    {/* Locations */}
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-serif font-semibold mb-4">Easy Go Thai - Mount Maunganui</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                            <MapPin size={16} className="mr-3 text-primary flex-shrink-0" />
                            <span>277 Mount Maunganui Rd, Mount Maunganui, Tauranga 3116</span>
                        </div>
                        <div className="flex items-center">
                            <Phone size={16} className="mr-3 text-primary flex-shrink-0" />
                            <a href="tel:075748500" className="hover:text-primary transition-colors">
                                (07) 574 8500
                            </a>
                        </div>
                        <div className="flex items-center">
                            <Mail size={16} className="mr-3 text-primary flex-shrink-0" />
                            <a href="mailto:manager@easygothai.nz" className="hover:text-primary transition-colors">
                                manager@easygothai.nz
                            </a>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-serif font-semibold mb-4">Asian Fusion - Bethlehem</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                            <MapPin size={16} className="mr-3 text-primary flex-shrink-0" />
                            <span>225 State Highway 2, Bethlehem, Tauranga 3110</span>
                        </div>
                        <div className="flex items-center">
                            <Phone size={16} className="mr-3 text-primary flex-shrink-0" />
                            <a href="tel:0224026481" className="hover:text-primary transition-colors">
                                022 402 6481
                            </a>
                        </div>
                        <div className="flex items-center">
                            <Mail size={16} className="mr-3 text-primary flex-shrink-0" />
                            <a href="mailto:info@asianfusion.nz" className="hover:text-primary transition-colors">
                                info@asianfusion.nz
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</div>
);
};

export default Home;

