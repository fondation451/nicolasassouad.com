import { groupBy } from "lodash";
import { Resume } from "../resume";
import { buildPublicLink } from "./buildLink";

export const buildExperienceContent = (resume: Resume) => {
  const skillsByCategory = groupBy(resume.skills, (skill) => skill.category);

  return `
<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center">
  ${Object.entries(skillsByCategory)
    .map(([category, skills]) => {
      return `
    <div
      class="component-card"
      style="display: flex; flex-direction: column; gap: 12px; align-items: center; width: 260px;"
    >
      <div class="text-size-xl">${category}</div>
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
      <div class="text-size-m" style="display: flex; flex-wrap: wrap; flex: 1; align-content: flex-start; gap: 8px; min-width: 200px; padding-top: 18px;">
        <div>${experience.start} - ${experience.end}</div>
        <div>(${experience.location})</div>
      </div>
      <div style="min-width: 540px; flex: 100;">
        <div class="component-card">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="text-size-l" style="display: flex; gap: 8px;">
              <div style="font-weight: 700">${experience.title}</div> -
              <a href=${experience.link} target="_blank" style="display: flex; gap: 2px;">
                ${experience.company}
                <img src="${buildPublicLink("/public/external-link.svg")}" alt="Link" style="font-size: 12px; width: 12px; height: 12px;" />
              </a>
            </div>
            <div class="text-size-m" style="display: flex; flex-direction: column;">
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
                                <img src="${buildPublicLink("/public/external-link.svg")}" alt="Link" style="font-size: 12px; width: 12px; height: 12px;" />
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
    </div>
    `;
    })
    .join("\n")}
</div>
  `;
};
