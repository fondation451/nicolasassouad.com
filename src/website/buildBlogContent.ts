import { buildLink } from "./buildLink";
import { Language } from "./wordings";

export const buildBlogContent = ({
  language,
  posts,
}: {
  language: Language;
  posts: Array<{
    name: string;
    title: string;
    date: string;
    tags: string[];
  }>;
}) => {
  return posts
    .map(
      (post) => `
  <a
      href=${buildLink(`/blog/${post.name}`, language)}
      style="display: flex; gap: 12px; flex-direction: column; min-width: 540px; padding: 20px;"
    >
      <div style="display: flex; flex-direction: column;">
        <div class="text-size-xl">${post.title}</div>
        <div style="display: flex; gap: 12px;">
          <div class="text-size-l">${post.date}</div>
          ${post.tags.map((tag) => `<div class="component-tag">${tag}</div>`).join("\n")}
        </div>
      </div>
    </a>
    `,
    )
    .join("\n");
};
