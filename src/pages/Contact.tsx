import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dashboardApi } from "@/services/dashboard";

const Contact = () => {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [subscribeEmail, setSubscribeEmail] = useState("");
    const { toast } = useToast();
    const [submitting, setSubmitting] = useState(false);
    const [subscribing, setSubscribing] = useState(false);

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

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subscribeEmail) return;
        setSubscribing(true);
        try {
            await dashboardApi.addSubscription(subscribeEmail);
            toast({
                title: "Thanks for subscribing!",
                description: "We'll keep you updated with our latest news and offers.",
            });
            setSubscribeEmail("");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Please try again later.";
            toast({ title: "Subscription failed", description: message, variant: "destructive" });
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">
                            Contact Us
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We'd love to hear from you. Get in touch with questions, reservations,
                            or to learn more about our authentic Thai cuisine.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        {/*  <div className="animate-fade-in-up">*/}
                        {/*  <h2 className="text-3xl font-serif font-bold mb-6 text-primary">*/}
                        {/*    Send Us a Message*/}
                        {/*  </h2>*/}
                        {/*  <form onSubmit={handleContactSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-lg">*/}
                        {/*    <div>*/}
                        {/*      <input*/}
                        {/*        type="text"*/}
                        {/*        value={contactForm.name}*/}
                        {/*        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}*/}
                        {/*        placeholder="Your Name"*/}
                        {/*        className="form-input"*/}
                        {/*        required*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*      <input*/}
                        {/*        type="email"*/}
                        {/*        value={contactForm.email}*/}
                        {/*        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}*/}
                        {/*        placeholder="Your Email"*/}
                        {/*        className="form-input"*/}
                        {/*        required*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*      <input*/}
                        {/*        type="text"*/}
                        {/*        value={contactForm.subject}*/}
                        {/*        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}*/}
                        {/*        placeholder="Subject"*/}
                        {/*        className="form-input"*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*      <textarea*/}
                        {/*        value={contactForm.message}*/}
                        {/*        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}*/}
                        {/*        placeholder="Your Message"*/}
                        {/*        className="form-textarea"*/}
                        {/*        required*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*    <button type="submit" className="btn-primary w-full" disabled={submitting}>*/}
                        {/*      {submitting ? "Sending..." : "Send Message"}*/}
                        {/*    </button>*/}
                        {/*  </form>*/}
                        {/*</div> */}

                        {/* Contact Information */}
                        <div className="animate-slide-in-right">
                            <h2 className="text-3xl font-serif font-bold mb-6 text-primary">
                                Get in Touch
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Whether you have questions about our menu, want to make a reservation,
                                or are interested in catering services, our team is here to help.
                            </p>

                            {/* General Contact */}
                            <div className="bg-card rounded-lg p-6 shadow-lg mb-8">
                                <h3 className="text-xl font-serif font-semibold mb-4">General Inquiries</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Mail size={18} className="mr-3 text-primary flex-shrink-0" />
                                        <a href="mailto:info@garoonthai.nz" className="text-foreground hover:text-primary transition-colors">
                                            info@garoonthai.nz
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Store Locations */}
                            <div className="space-y-6">
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
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Quick answers to common questions about our restaurants and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-background rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3 text-primary">Do you take reservations?</h3>
                            <p className="text-muted-foreground">
                                Easy Go Thai offers dine-in and accepts reservations. Asian Fusion is takeaway only and does not offer dine-in or reservations.
                            </p>
                        </div>

                        <div className="bg-background rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3 text-primary">Are there vegetarian options?</h3>
                            <p className="text-muted-foreground">
                                Absolutely! Both locations offer a variety of vegetarian and vegan-friendly dishes.
                                Please let our staff know about any dietary requirements.
                            </p>
                        </div>

                        <div className="bg-background rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3 text-primary">Do you offer delivery?</h3>
                            <p className="text-muted-foreground">
                                Easy Go Thai offers delivery services. You can order online through their website
                                or call directly for delivery options.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        Join Our Newsletter
                    </h2>
                    <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                        Subscribe to receive updates about new dishes, special events, and exclusive offers from Garoon Thai
                    </p>

                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-3">
                        <input
                            type="email"
                            value={subscribeEmail}
                            onChange={(e) => setSubscribeEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
                            required
                        />
                        <button type="submit" className="btn-secondary" disabled={subscribing}>
                            {subscribing ? "Subscribing..." : "Subscribe"}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
