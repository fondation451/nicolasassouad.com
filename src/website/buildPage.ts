import { readFileSync } from "fs";
import format from "string-template";
import { buildLink, buildPublicLink } from "./buildLink";
import { Language, wordings } from "./wordings";

const mainTemplate = readFileSync("./src/website/template.html").toString();

const buildPageHtml = ({
  path,
  title,
  content,
  language,
}: {
  path: string;
  title: string;
  content: string;
  language: Language;
}) => {
  return format(mainTemplate, {
    template__pageTitle: title,
    template__faviconPath: buildPublicLink("/public/favicon.ico"),
    template__githubIconPath: buildPublicLink("/public/github.svg"),
    template__linkedInIconPath: buildPublicLink("/public/linkedin.svg"),
    template__fullName: wordings.fullName,
    template__resume: wordings.resume,
    template__resumePath: buildPublicLink(wordings.resumePath[language]),
    template__title: wordings.title[language],
    template__about: wordings.about[language],
    template__aboutPath: buildLink("/", language),
    template__experience: wordings.experience[language],
    template__experiencePath: buildLink("/experience", language),
    template__blog: wordings.blog,
    template__blogPath: buildLink("/blog", language),
    template__pageContent: content,
    template__englishPath: buildLink(path, "en"),
    template__english: wordings.english,
    template__frenchPath: buildLink(path, "fr"),
    template__french: wordings.french,
  });
};

export const buildPage = ({
  path,
  title,
  content,
}: {
  path: string;
  title: { en: string; fr: string };
  content: { en: string; fr: string };
}): { path: string; en: string; fr: string } => {
  return {
    path,
    en: buildPageHtml({ path, title: title.en, content: content.en, language: "en" }),
    fr: buildPageHtml({ path, title: title.fr, content: content.fr, language: "fr" }),
  };
};
