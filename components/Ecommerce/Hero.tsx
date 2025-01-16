import Link from "next/link";

const EcommerceHero = () => {
  return (
    <div className="min-h-96 h-fit bg-slate-100 flex text-gray-800 lg:px-48 py-12 w-full">
      <div className="flex w-full flex-col xl:flex-row">
        <div className="xl:w-1/2 xl:p-24 p-8 flex flex-col gap-4 justify-center">
          <h1 className="text-4xl">We have all the items you need.</h1>
          <p className="text-gray-800 text-sm">
            We have a wide selection of items for you to choose from. We have
            clothing, electronics, and jewelry. We have it all!
          </p>
          <Link
            href="/projects/ecommerce/clothing"
            className="text-white bg-emerald-500 py-2 px-8 rounded-lg mt-4 w-fit"
          >
            Shop Now
          </Link>
        </div>
        <div className="xl:w-1/2 xl:p-24 p-8 flex flex-col gap-4 justify-center items-center">
          <div className="h-fit w-fit p-1 bg-white rounded-lg mt-1 border border-gray-500 shadow-xl">
            <Link href="/projects/ecommerce">
              <div className="text-gray-600 italic px-2 xl:text-7xl text-3xl cursor-pointer">
                Superb Products
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceHero;
