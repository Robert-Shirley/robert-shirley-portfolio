"use client";

import Card from "@/components/shared/Card";
import TicTacToe from "@/components/TicTacToe/TicTacToe";

const Index = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-16">
      <Card>
        <h1 className="text-3xl font-bold text-center my-8">Tic Tac Toe</h1>
        <TicTacToe />
      </Card>
    </div>
  );
};

export default Index;
