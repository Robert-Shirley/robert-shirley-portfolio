import { Star } from "lucide-react";
import React from "react";

type ReviewCardProps = {
  name: string;
  image: string;
  rating: number;
  date: string;
  review: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  image,
  rating,
  date,
  review,
}) => {
  const stars = [...Array(5)].map((_, index) => (
    <Star
      key={index}
      size={16}
      className={
        index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
      }
    />
  ));

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <div className="flex gap-1 mt-1">{stars}</div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2">{review}</p>
      <span className="text-gray-400 text-xs mt-auto">{date}</span>
    </div>
  );
};

const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: "Sarah Mitchell",
      image: "/api/placeholder/48/48",
      rating: Math.floor(Math.random() * 5) + 3,
      date: "December 15, 2024",
      review:
        "Amazing quality and fast shipping! The customer service team was incredibly helpful when I had questions about my order.",
    },
    {
      name: "James Wilson",
      image: "/api/placeholder/48/48",
      rating: Math.floor(Math.random() * 5) + 2,
      date: "January 2, 2025",
      review:
        "I've ordered multiple times and have never been disappointed. The attention to detail and product quality is outstanding.",
    },
    {
      name: "Emily Parker",
      image: "/api/placeholder/48/48",
      rating: Math.floor(Math.random() * 5) + 4,
      date: "January 8, 2025",
      review:
        "Found exactly what I was looking for at a great price. The free shipping was super fast too. Will definitely shop here again!",
    },
    {
      name: "Michael Chen",
      image: "/api/placeholder/48/48",
      rating: Math.floor(Math.random() * 5) + 1,
      date: "January 12, 2025",
      review:
        "The product exceeded my expectations. Great shopping experience from start to finish. Highly recommend this store!",
    },
  ];

  return (
    <div className="w-full bg-slate-600 py-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-center text-gray-100 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
