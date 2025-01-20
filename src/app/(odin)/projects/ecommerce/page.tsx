"use client";

import CallToAction from "@/components/Ecommerce/CallToAction";
import EcommerceHero from "@/components/Ecommerce/Hero";
import Layout from "@/components/Ecommerce/Layout";
import Main from "@/components/Ecommerce/Main";
import Quote from "@/components/Ecommerce/Quote";
import CustomerReviews from "@/components/Ecommerce/Reviews";
import ValueProposition from "@/components/Ecommerce/ValueProposition";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <EcommerceHero />
      <Main />
      <ValueProposition />
      <CustomerReviews />
      <Quote />
      <CallToAction />
    </Layout>
  );
};

export default Index;
