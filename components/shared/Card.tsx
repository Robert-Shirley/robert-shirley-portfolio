import classNames from "@/functions/classNames";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={classNames(
        "bg-white shadow-lg rounded-lg p-4 xl:p-16 h-full min-h-fit flex flex-col border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
