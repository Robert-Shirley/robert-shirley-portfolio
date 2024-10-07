import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import Card from "../shared/Card";
import CvSettings from "./CvSettings";
import DetailsForm from "./DetailsForm";

interface Education {
  id: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

interface Settings {
  bgColor: string;
  fontColor: string;
  fontSize: number;
  fontFamily: string;
}

const CvApplication = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [education, setEducation] = useState<Education[]>([]);

  const [experience, setExperience] = useState<Experience[]>([]);

  const [settings, setSettings] = useLocalStorage("settings", {
    bgColor: "#208cb6", // skyblue
    fontColor: "#FFFFFF", // white
    fontSize: 12,
    fontFamily: "Arial",
  } as Settings);

  return (
    <div className="w-full">
      <Card>
        <div className="flex gap-12 w-full">
          <CvSettings settings={settings} setSettings={setSettings} />

          <div>
            <DetailsForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
            />
          </div>
          {/* 
    Display CV component
    
    */}
        </div>
      </Card>
    </div>
  );
};

export default CvApplication;
