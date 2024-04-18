import { readFileSync } from "fs";

export const buildBlogPostComponent = ({
  title,
  date,
  tags,
  postPath,
}: {
  title: string;
  date: string;
  tags: string[];
  postPath: string;
}) => {
  const post = readFileSync(postPath).toString();

  return `
  <div style="display: flex; flex-direction: column;">
    <div class="component-text-xl">${title}</div>
    <div style="display: flex; gap: 12px;">
      <div class="component-text-m">${date}</div>
        ${tags
          .map(
            (tag) => `
        <div class="component-tag">#${tag}</div>
        `,
          )
          .join("\n")}
      </div>
    </div>
    <div class="component-text-s" style="display: flex; flex-direction: column; text-align: justify;">
      ${post}
    </div>
  `;
};
