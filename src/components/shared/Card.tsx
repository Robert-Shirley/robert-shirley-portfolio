// components/shared/Card.tsx
"use client";

import classNames from "@/functions/classNames";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={classNames(
        "bg-white shadow-lg rounded-lg p-4 xl:p-10 flex flex-col border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
