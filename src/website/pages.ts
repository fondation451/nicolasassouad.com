import { getResume } from "../resume";
import { buildPage } from "./buildPage";
import { buildBlogComponent } from "./components/buildBlogComponent";
import { buildBlogPostComponent } from "./components/buildBlogPostComponent";
import { buildExperienceComponent } from "./components/buildExperienceComponent";

const resumeFr = getResume("fr");
const resumeEn = getResume("en");

const posts = [
  {
    name: "rebase-onto",
    title: { en: "Tutorial: git rebase --onto", fr: "Tutoriel : git rebase --onto" },
    date: "2020/02/17",
    tags: { en: ["tutorial"], fr: ["tutoriel"] },
    path: { en: "./src/blog/rebase-onto/en.html", fr: "./src/blog/rebase-onto/fr.html" },
  },
];

export const pages = [
  buildPage({
    path: "/",
    title: { en: "About - Nicolas Assouad", fr: "À Propos - Nicolas Assouad" },
    content: {
      en: `<div class="component-text-s">${resumeEn.description}</div>`,
      fr: `<div class="component-text-s">${resumeFr.description}</div>`,
    },
  }),
  buildPage({
    path: "/experience",
    title: { en: "Experience - Nicolas Assouad", fr: "Expérience - Nicolas Assouad" },
    content: { en: buildExperienceComponent(resumeEn), fr: buildExperienceComponent(resumeFr) },
  }),
  buildPage({
    path: "/blog",
    title: { en: "Blog - Nicolas Assouad", fr: "Blog - Nicolas Assouad" },
    content: {
      en: buildBlogComponent({
        language: "en",
        posts: posts.map((post) => ({
          name: post.name,
          title: post.title.en,
          date: post.date,
          tags: post.tags.en,
        })),
      }),
      fr: buildBlogComponent({
        language: "fr",
        posts: posts.map((post) => ({
          name: post.name,
          title: post.title.fr,
          date: post.date,
          tags: post.tags.fr,
        })),
      }),
    },
  }),
  ...posts.map((post) =>
    buildPage({
      path: `/blog/${post.name}`,
      title: { en: `${post.title.en} - Nicolas Assouad`, fr: `${post.title.fr} - Nicolas Assouad` },
      content: {
        en: buildBlogPostComponent({
          title: post.title.en,
          date: post.date,
          tags: post.tags.en,
          postPath: post.path.en,
        }),
        fr: buildBlogPostComponent({
          title: post.title.fr,
          date: post.date,
          tags: post.tags.fr,
          postPath: post.path.fr,
        }),
      },
    }),
  ),
];
