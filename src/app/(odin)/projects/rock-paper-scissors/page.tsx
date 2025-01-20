"use client";

import RockPaperScissors from "@/components/RockPaperScissors/RockPaperScissors";

const Index = () => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-16">
      <RockPaperScissors isComponent={false} />
    </div>
  );
};

export default Index;
