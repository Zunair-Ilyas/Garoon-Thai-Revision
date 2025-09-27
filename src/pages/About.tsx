import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Award, Utensils } from "lucide-react";
// import restaurantImage from "@/assets/restaurant-interior.jpg";
// import ingredientsImage from "@/assets/thai-ingredients.jpg";
import vision from '../assets/vision.jpg'
import our_story from '../assets/our_story.jpg'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authentic Flavours",
      description: "Every dish is prepared using traditional Thai recipes passed down through generations, ensuring authentic taste in every bite."
    },
    {
      icon: Users,
      title: "Family Atmosphere",
      description: "We believe food brings people together. Our warm, welcoming environment makes every guest feel like family."
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      description: "We source the finest fresh ingredients, importing authentic Thai spices and herbs to maintain traditional flavours."
    },
    {
      icon: Utensils,
      title: "Culinary Excellence",
      description: "Our experienced chefs combine traditional techniques with modern presentation to create memorable dining experiences."
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
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From the heart of Thailand to the beautiful shores of Tauranga, 
              Garoon Thai brings authentic flavours and warm hospitality to New Zealand.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary">
                About Us
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Since 2018 Mai (service) and Gong (kitchen) have been the main-stay of EasyGo Thai restaurant in Mount Maunganui.
                In February 2023 they bought EasyGo Thai and started working on refreshing and improving every aspect of the restaurant.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As a team they are unbeatable; Mai with her years of experience as customer service superstar both in NZ and Thailand,
                and Gong with 18 years of consistent high standards as chef / head chef in several well-known B.O.P. Asian restaurants.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Both are passionate about what they do, are skilled at their jobs, and are certainly not scared to face the hard work and
                long hours demanded to be successful in the hospitality industry –  both describe themselves as “perfectionists”.
                Their second location (Asian Fusion) will open in Dec 2023 ..We invite you to come and join the journey, and
                encourage you to give feedback on your experience.
              </p>
            </div>
            <div className="animate-scale-in">
              <img 
                src={our_story}
                alt="Interior view of Garoon Thai restaurant showcasing the warm, welcoming atmosphere"
                className="rounded-lg shadow-lg hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us in creating exceptional dining experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-background rounded-lg p-6 shadow-lg hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <value.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold">{value.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-scale-in">
              <img 
                src={vision}
                alt="Traditional Thai ingredients and spices used in authentic Garoon Thai recipes"
                className="rounded-lg shadow-lg hover-lift"
              />
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We want to create a good future for ourselves and our family and friends,
                by applying our skills and effort in an environment we enjoy
              </p>
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary">
                Vision
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We want to create a dining environment that matches and shows our love of great Thai cuisine,
                and do it in a manner that embodies our core values of kindness to others.
                Please drop us a message and tell us what you think....
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Experience Our Story
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Visit one of our locations and become part of the Garoon Thai family. 
            Taste the tradition, feel the warmth, and savour the flavour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/our-stores" className="btn-secondary">
              Find Our Locations
            </a>
            <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;