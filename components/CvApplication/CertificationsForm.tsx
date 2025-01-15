import { FormInputs } from "@/types/CVTypes";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

interface CertificationsFormProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

const CertificationsForm = ({ register, control }: CertificationsFormProps) => {
  const { fields, append, remove } = useFieldArray({
    name: "certifications",
    control,
  });

  const addCertification = () => {
    append({
      id: Date.now(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-700">Certifications</h2>
        <button
          type="button"
          onClick={addCertification}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-600 transition-colors"
        >
          Add Certification
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
              Certification Name
            </label>
            <input
              type="text"
              {...register(`certifications.${index}.name`)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issuing Organization
            </label>
            <input
              type="text"
              {...register(`certifications.${index}.issuer`)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="date"
                {...register(`certifications.${index}.date`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date (optional)
              </label>
              <input
                type="date"
                {...register(`certifications.${index}.expiryDate`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Credential ID (optional)
            </label>
            <input
              type="text"
              {...register(`certifications.${index}.credentialId`)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;
