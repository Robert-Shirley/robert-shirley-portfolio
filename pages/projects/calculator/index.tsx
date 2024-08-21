import Calculator from "@/components/Calculator/Calculator";
import Card from "@/components/shared/Card";

const Index = () => {
  return (
    <div className="w-fit mx-auto">
      <Card>
        <h1 className="text-3xl font-bold text-center my-8">Calculator</h1>
        <Calculator isComponent={false} />
      </Card>
    </div>
  );
};

export default Index;
