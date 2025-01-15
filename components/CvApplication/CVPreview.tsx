import { FormInputs, Settings } from "@/types/CVTypes";
import { DateDisplay } from "./DateDisplay";

interface CvPreviewProps {
  formData: FormInputs;
  settings: Settings;
}

const CvPreview = ({ formData, settings }: CvPreviewProps) => {
  const {
    name,
    email,
    phone,
    address,
    professionalSummary,
    skills,
    education,
    experience,
    projects,
    certifications,
    languages,
    awards,
  } = formData;
  const { bgColor, fontColor, fontSize, fontFamily } = settings;

  return (
    <div
      className="h-full rounded-lg shadow-lg bg-white"
      style={{
        fontSize: `${fontSize}px`,
        fontFamily,
      }}
    >
      {/* Header Section */}
      <div
        className="p-8 rounded-t-lg"
        style={{
          backgroundColor: bgColor,
          color: fontColor,
        }}
      >
        <h1 className="text-3xl font-bold mb-3 text-center">
          {name || "Your Name"}
        </h1>
        <div className="text-sm space-y-1 text-center opacity-90">
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
          {address && <p>{address}</p>}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 text-gray-800">
        {/* Professional Summary */}
        {professionalSummary && (
          <div className="mb-8">
            <h2
              className="text-xl font-semibold border-b-2 mb-4 pb-2"
              style={{ borderColor: bgColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {professionalSummary}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl font-semibold border-b-2 mb-4 pb-2"
              style={{ borderColor: bgColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${bgColor}20`, color: "inherit" }}
                >
                  {skill.value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl font-semibold border-b-2 mb-4 pb-2"
              style={{ borderColor: bgColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-lg">{exp.company}</strong>
                    <span className="text-sm text-gray-600">
                      {exp.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800 font-medium">
                      {exp.position}
                    </span>
                    <span className="text-sm text-gray-600">
                      <DateDisplay
                        startDate={exp.startDate}
                        endDate={exp.endDate}
                      />
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl font-semibold border-b-2 mb-4 pb-2"
              style={{ borderColor: bgColor }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-lg">{edu.school}</strong>
                    <span className="text-sm text-gray-600">
                      {edu.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800">{edu.degree}</span>
                    <span className="text-sm text-gray-600">
                      <DateDisplay
                        startDate={edu.startDate}
                        endDate={edu.endDate}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-xl font-semibold border-b-2 mb-4 pb-2"
              style={{ borderColor: bgColor }}
            >
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-lg">{project.title}</strong>
                    <span className="text-sm text-gray-600">
                      <DateDisplay
                        startDate={project.startDate}
                        endDate={project.endDate}
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-sm mt-2 inline-block"
                      style={{ color: bgColor }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout for Certifications and Languages */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Certifications */}
          {certifications?.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold border-b-2 mb-4 pb-2"
                style={{ borderColor: bgColor }}
              >
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}</div>
                    <div className="text-sm text-gray-600">
                      {cert.date}
                      {cert.expiryDate && ` - Expires: ${cert.expiryDate}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <div>
              <h2
                className="text-xl font-semibold border-b-2 mb-4 pb-2"
                style={{ borderColor: bgColor }}
              >
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Awards */}
        {awards?.length > 0 && (
          <div>
            <h2
              className="text-xl font-semibold border-b-2 mb-4 pb-2"
              style={{ borderColor: bgColor }}
            >
              Awards & Achievements
            </h2>
            <div className="space-y-4">
              {awards.map((award) => (
                <div key={award.id}>
                  <div className="flex justify-between items-center">
                    <strong>{award.title}</strong>
                    <span className="text-sm text-gray-600">{award.date}</span>
                  </div>
                  <div className="text-sm text-gray-600">{award.issuer}</div>
                  {award.description && (
                    <p className="text-sm text-gray-700 mt-1">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CvPreview;
