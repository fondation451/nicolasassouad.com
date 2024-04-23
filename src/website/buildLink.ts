import { Language } from "./wordings";

export const buildLink = (path: string, language: Language): string => {
  switch (language) {
    case "en":
      return path;
    default:
      return `/${language}${path}`;
  }
};

export const buildPublicLink = (path: string): string => {
  return path;
};
