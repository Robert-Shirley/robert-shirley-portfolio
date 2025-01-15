import { FormInputs } from "@/types/CVTypes";
import { useState } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

interface SkillsFormProps {
  register: UseFormRegister<FormInputs>;
  control: Control<FormInputs>;
}

const SkillsForm = ({ control }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState("");
  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      append({
        id: Date.now(),
        value: newSkill.trim(),
      });
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-700">Skills</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill..."
          className="block flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-600 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <span
            key={field.id}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {field.value}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
