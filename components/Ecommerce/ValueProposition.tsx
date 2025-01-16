import { Clock, ShieldCheck, Truck } from "lucide-react";
import React from "react";

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 max-w-sm">
      <div className="mb-4 text-emerald-600">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-center text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const ValueProposition: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Quality Guaranteed",
      description:
        "Every product in our collection is thoroughly vetted for quality and authenticity. Shop with complete confidence.",
    },
    {
      icon: <Truck size={32} />,
      title: "Fast & Free Shipping",
      description:
        "Enjoy complimentary shipping on all orders with our reliable delivery network. Your items arrive quickly and safely.",
    },
    {
      icon: <Clock size={32} />,
      title: "24/7 Support",
      description:
        "Our dedicated customer service team is here around the clock to assist you with any questions or concerns.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <ValueCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
