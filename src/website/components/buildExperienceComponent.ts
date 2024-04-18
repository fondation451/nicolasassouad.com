import { groupBy } from "lodash";
import { Resume } from "../../resume";
import { buildPublicLink } from "../buildLink";

export const buildExperienceComponent = (resume: Resume) => {
  const skillsByCategory = groupBy(resume.skills, (skill) => skill.category);

  return `
<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center">
  ${Object.entries(skillsByCategory)
    .map(([category, skills]) => {
      return `
    <div class="component-card component-experience-skill">
      <div class="component-text-l">${category}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
        ${skills
          .map((skill) => {
            return `<div class="component-tag">${skill.name}</div>`;
          })
          .join("\n")}
      </div>
    </div>
    `;
    })
    .join("\n")}
  ${resume.experiences
    .map((experience) => {
      return `
    <div style="display: flex; flex-wrap: wrap; gap: 12px; width: 100%">
      <div class="component-text-s" style="display: flex; flex-wrap: wrap; flex: 1; align-content: flex-start; gap: 8px; min-width: 200px; padding-top: 18px;">
        <div>${experience.start} - ${experience.end}</div>
        <div>(${experience.location})</div>
      </div>
        <div class="component-card component-experience-experience">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <a class="component-text-m" href=${experience.link} target="_blank">
              <span style="font-weight: 700">${experience.title}</span> - ${experience.company}
              <img src="${buildPublicLink("/public/external-link.svg")}" alt="Link" class="component-icon-s" />
            </a>
          <div class="component-text-s" style="display: flex; flex-direction: column;">
            <div>${experience.body}</div>
            <ul>
              ${experience.facts
                .map((fact) => {
                  return `
                <li>
                    ${
                      typeof fact === "string"
                        ? fact
                        : `
                            <a href=${fact.link} target="_blank" style="display: flex; gap: 2px;">
                              ${fact.value}
                              <img src="${buildPublicLink("/public/external-link.svg")}" alt="Link" class="component-icon-s" />
                            </a>
                          `
                    }
                  </li>
                `;
                })
                .join("\n")}
            </ul>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${experience.skills
              .map((skill) => {
                return `<div class="component-tag">${skill}</div>`;
              })
              .join("\n")}
          </div>
        </div>
      </div>
    </div>
    `;
    })
    .join("\n")}
</div>
  `;
};
