import CallToAction from "@/components/Ecommerce/CallToAction";
import EcommerceHero from "@/components/Ecommerce/Hero";
import Layout from "@/components/Ecommerce/Layout";
import Main from "@/components/Ecommerce/Main";
import Quote from "@/components/Ecommerce/Quote";
import CustomerReviews from "@/components/Ecommerce/Reviews";
import ValueProposition from "@/components/Ecommerce/ValueProposition";

const Index = () => {
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
