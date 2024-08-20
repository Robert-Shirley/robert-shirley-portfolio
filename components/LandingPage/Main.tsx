const MainImage = () => {
  return (
    <div>
      <div className="border-2 border-sky-500 h-36 w-36 rounded-lg"></div>
      <p className="max-w-36 text-center text-xs text-gray-500">
        This is a description of the image. It can be a few sentences or a
        paragraph.
      </p>
    </div>
  );
};

const Main = () => {
  return (
    <div className="min-h-96 h-fit bg-white flex text-gray-700 lg:px-48 py-12 w-full justify-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-black text-3xl">Place Images Here</h1>
        <div className="w-full flex flex-col xl:flex-row items-center xl:justify-evenly mt-8">
          <MainImage />
          <MainImage />
          <MainImage />
          <MainImage />
        </div>
      </div>
    </div>
  );
};

export default Main;
