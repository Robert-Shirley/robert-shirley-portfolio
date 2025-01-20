import { FormInputs } from "@/types/CVTypes";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ProfessionalSummaryFormProps {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

const ProfessionalSummaryForm = ({
  register,
  errors,
}: ProfessionalSummaryFormProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-700">
        Professional Summary
      </h2>
      <div>
        <textarea
          {...register("professionalSummary", {
            required: "Professional summary is required",
            minLength: {
              value: 50,
              message: "Professional summary should be at least 50 characters",
            },
            maxLength: {
              value: 500,
              message: "Professional summary should not exceed 500 characters",
            },
          })}
          rows={4}
          placeholder="Write a brief summary of your professional background and key qualifications..."
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
        {errors.professionalSummary && (
          <p className="mt-1 text-sm text-red-500">
            {errors.professionalSummary.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
