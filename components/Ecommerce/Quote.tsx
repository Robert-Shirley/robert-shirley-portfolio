const Quote = () => {
  return (
    <div className="min-h-96 h-fit bg-gray-200 flex text-gray-700 lg:px-48 py-12 w-full px-6">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="lg:w-1/2">
          <p className="xl:text-3xl text-xl italic text-gray-700 font-thin tracking-tight">
            We believe that style isn&apos;t just about what you wear –
            it&apos;s about how you live. From timeless fashion to stunning
            jewelry and cutting-edge electronics, we curate excellence in every
            category.
          </p>
          <span>
            <p className="text-right text-gray-900 mt-2">- John Smith (CEO)</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Quote;
