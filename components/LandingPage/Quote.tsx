const Quote = () => {
  return (
    <div className="min-h-96 h-fit bg-gray-200 flex text-gray-700 lg:px-48 py-12 w-full px-6">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="lg:w-1/2">
          <p className="text-3xl italic text-gray-700 font-thin tracking-tight">
            This is an inspiring quote, or a testimonial from a customer. Maybe
            it&apos;s just filling up space, or maybe people will actually read
            it. Who knows? All I know is that it looks nice.
          </p>
          <span>
            <p className="text-right text-gray-900 mt-2">
              - Thor, God of Thunder
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Quote;
