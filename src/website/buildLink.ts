import { Language } from "./wordings";

// To test locally
const GITHUB_PAGES_URL = "";
//const GITHUB_PAGES_URL = "https://fondation451.github.io/nicolasassouad";

export const buildLink = (path: string, language: Language): string => {
  switch (language) {
    case "en":
      return `${GITHUB_PAGES_URL}${path}`;
    default:
      return `${GITHUB_PAGES_URL}/${language}${path}`;
  }
};

export const buildPublicLink = (path: string): string => {
  return `${GITHUB_PAGES_URL}${path}`;
};
