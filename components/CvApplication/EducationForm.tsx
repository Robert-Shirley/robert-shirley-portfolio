import { FormInputs } from "@/types/CVTypes";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

interface EducationFormProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

const EducationForm = ({ register, control }: EducationFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const addEducation = () => {
    append({
      id: Date.now(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Education</h2>
        <button
          type="button"
          onClick={addEducation}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-600 transition-colors"
        >
          Add Education
        </button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6 p-4 border border-gray-200 rounded-md relative"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>

          <div className="space-y-4">
            <div>
              <label
                htmlFor={`education.${index}.school`}
                className="block text-sm font-medium text-gray-700"
              >
                School
              </label>
              <input
                type="text"
                {...register(`education.${index}.school`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor={`education.${index}.degree`}
                className="block text-sm font-medium text-gray-700"
              >
                Degree
              </label>
              <input
                type="text"
                {...register(`education.${index}.degree`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`education.${index}.startDate`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  {...register(`education.${index}.startDate`)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor={`education.${index}.endDate`}
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  {...register(`education.${index}.endDate`)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`education.${index}.location`}
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                {...register(`education.${index}.location`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
