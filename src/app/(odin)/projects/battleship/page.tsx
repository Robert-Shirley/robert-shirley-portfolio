"use client";

import EtchASketch from "@/components/EtchASketch/EtchASketch";
import Card from "@/components/shared/Card";

const Index = () => {
  return (
    <div className="w-fit mx-auto">
      <Card>
        <h1 className="text-3xl font-bold text-center my-8">Etch A Sketch</h1>
        <EtchASketch isComponent={false} />
      </Card>
    </div>
  );
};

export default Index;
