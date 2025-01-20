import { FormInputs } from "@/types/CVTypes";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

interface ExperienceFormProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

const ExperienceForm = ({ register, control }: ExperienceFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const addExperience = () => {
    append({
      id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Experience</h2>
        <button
          type="button"
          onClick={addExperience}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-600 transition-colors"
        >
          Add Experience
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
                htmlFor={`experience.${index}.company`}
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                {...register(`experience.${index}.company`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor={`experience.${index}.position`}
                className="block text-sm font-medium text-gray-700"
              >
                Position
              </label>
              <input
                type="text"
                {...register(`experience.${index}.position`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`experience.${index}.startDate`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  {...register(`experience.${index}.startDate`)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor={`experience.${index}.endDate`}
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  {...register(`experience.${index}.endDate`)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`experience.${index}.description`}
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                {...register(`experience.${index}.description`)}
                rows={4}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor={`experience.${index}.location`}
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                {...register(`experience.${index}.location`)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
