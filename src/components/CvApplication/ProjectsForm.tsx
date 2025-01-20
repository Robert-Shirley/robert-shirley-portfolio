import { FormInputs } from "@/types/CVTypes";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

interface ProjectsFormProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

const ProjectsForm = ({ register, control }: ProjectsFormProps) => {
  const { fields, append, remove } = useFieldArray({
    name: "projects",
    control,
  });

  const addProject = () => {
    append({
      id: Date.now(),
      title: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
      link: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-700">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-600 transition-colors"
        >
          Add Project
        </button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border border-gray-200 rounded-md space-y-4 relative"
        >
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            Remove
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              {...register(`projects.${index}.title`)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register(`projects.${index}.description`)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Technologies Used (comma-separated)
            </label>
            <input
              type="text"
              {...register(`projects.${index}.technologies`)}
              placeholder="React, TypeScript, Tailwind CSS"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                {...register(`projects.${index}.startDate`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                {...register(`projects.${index}.endDate`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Link (optional)
            </label>
            <input
              type="url"
              {...register(`projects.${index}.link`)}
              placeholder="https://..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
