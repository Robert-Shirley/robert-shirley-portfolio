import CvApplication from "@/components/CvApplication/CvApplication";
import Card from "@/components/shared/Card";

const Index = () => {
  return (
    <div className="w-full mx-auto">
      <Card>
        <h1 className="text-3xl font-bold text-center my-8">CV Creator</h1>
        <div className="w-full">
          <CvApplication />
        </div>
      </Card>
    </div>
  );
};

export default Index;
