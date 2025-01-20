"use client";

import Layout from "@/components/Ecommerce/Layout";
import { useToast } from "@/hooks/use-toast";
import { Building2, Globe, Leaf, Users } from "lucide-react";

const About = () => {
  const { toast } = useToast();
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded in 2020, Superb Products has grown from a small online
              store to a trusted destination for quality clothing, jewelry, and
              electronics. Our mission is to provide exceptional products that
              enhance your everyday life.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "1000+", label: "Products" },
              { number: "24/7", label: "Support" },
              { number: "150+", label: "Countries Served" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-6 rounded-lg text-center shadow-sm"
              >
                <div className="text-2xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Customer First",
                  description:
                    "Your satisfaction is our top priority. We're committed to providing the best shopping experience.",
                },
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "Sustainability",
                  description:
                    "We're dedicated to reducing our environmental impact through eco-friendly practices.",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Global Reach",
                  description:
                    "Bringing quality products to customers worldwide with efficient shipping solutions.",
                },
                {
                  icon: <Building2 className="w-8 h-8" />,
                  title: "Quality",
                  description:
                    "Every product in our store meets our strict quality standards before reaching you.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-white p-8 rounded-lg shadow-sm"
                >
                  <div className="text-emerald-600 mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Our Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Founder",
                },
                {
                  name: "Michael Chen",
                  role: "Head of Operations",
                },
                {
                  name: "Emma Williams",
                  role: "Customer Experience",
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-emerald-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6">Have questions? Our team is here to help.</p>
            <button
              onClick={() =>
                toast({
                  title: "Contact Us",
                  description: "This would open a contact form in a real app!",
                })
              }
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
