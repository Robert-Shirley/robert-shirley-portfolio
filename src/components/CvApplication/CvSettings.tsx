import { useState } from "react";

interface Settings {
  bgColor: string;
  fontColor: string;
  fontSize: number;
  fontFamily: string;
}

type CvSettingsProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const CvSettings = ({ settings, setSettings }: CvSettingsProps) => {
  const [formSettings, setFormSettings] = useState<Settings>(settings);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormSettings({
      ...formSettings,
      [name]: name === "fontSize" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettings(formSettings);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="bgColor"
            className="block text-sm font-medium text-gray-700"
          >
            Header Background Color
          </label>
          <input
            type="color"
            id="bgColor"
            name="bgColor"
            value={formSettings.bgColor}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="fontColor"
            className="block text-sm font-medium text-gray-700"
          >
            Header Font Color
          </label>
          <input
            type="color"
            id="fontColor"
            name="fontColor"
            value={formSettings.fontColor}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="fontSize"
            className="block text-sm font-medium text-gray-700"
          >
            Font Size
          </label>
          <input
            type="number"
            id="fontSize"
            name="fontSize"
            value={formSettings.fontSize}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="fontFamily"
            className="block text-sm font-medium text-gray-700"
          >
            Font Family
          </label>
          <select
            id="fontFamily"
            name="fontFamily"
            value={formSettings.fontFamily}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default CvSettings;
