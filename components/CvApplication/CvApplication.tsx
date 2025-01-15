import useLocalStorage from "@/hooks/useLocalStorage";
import { FormInputs, Settings } from "@/types/CVTypes";
import { useForm } from "react-hook-form";
import Card from "../shared/Card";
import CertificationsForm from "./CertificationsForm";
import CvPreview from "./CVPreview";
import CvSettings from "./CvSettings";
import DetailsForm from "./DetailsForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProfessionalSummaryForm from "./ProfessionalSummaryForm";
import ProjectsForm from "./ProjectsForm";
import SkillsForm from "./SkillsForm";

const CvApplication = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      professionalSummary: "",
      skills: [],
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      languages: [],
      awards: [],
    },
  });

  const [settings, setSettings] = useLocalStorage("settings", {
    bgColor: "#208cb6",
    fontColor: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Arial",
  } as Settings);

  const onSubmit = (data: FormInputs) => {
    console.log("Form submitted:", data);
  };

  const formValues = watch();

  return (
    <div className="w-full">
      <Card>
        <div className="flex gap-12 w-full">
          {/* Settings Panel - Left Side */}
          <div className="flex-none">
            <CvSettings settings={settings} setSettings={setSettings} />
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
              {/* Form Fields - Middle */}
              <div className="w-1/3">
                <div className="space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                  <DetailsForm register={register} errors={errors} />
                  <ProfessionalSummaryForm
                    register={register}
                    errors={errors}
                  />
                  <SkillsForm register={register} control={control} />
                  <ExperienceForm register={register} control={control} />
                  <EducationForm register={register} control={control} />
                  <ProjectsForm register={register} control={control} />
                  <CertificationsForm register={register} control={control} />

                  <div className="sticky bottom-0 bg-white py-4">
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                    >
                      Save CV
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview - Right Side */}
              <div className="w-2/3">
                <div className="sticky top-4">
                  <CvPreview formData={formValues} settings={settings} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CvApplication;
