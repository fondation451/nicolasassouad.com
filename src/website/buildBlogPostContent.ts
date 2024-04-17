import { readFileSync } from "fs";

export const buildBlogPostContent = ({
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
    <div class="text-size-xxl">${title}</div>
    <div style="display: flex; gap: 12px;">
      <div class="text-size-l">${date}</div>
        ${tags
          .map(
            (tag) => `
        <div class="component-tag">${tag}</div>
        `,
          )
          .join("\n")}
      </div>
    </div>
    <div class="text-size-m" style="display: flex; flex-direction: column; text-align: justify;">
      ${post}
    </div>
  `;
};
