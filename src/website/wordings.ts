export const languages = ["en", "fr"] as const;

export type Language = (typeof languages)[number];

export const wordings = {
  fullName: "Nicolas Assouad",
  title: { en: "Software engineer and Entrepreneur", fr: "Software engineer et Entrepreneur" },
  resume: "CV",
  resumePath: { en: "/public/cvEn.pdf", fr: "/public/cvFr.pdf" },
  about: { en: "About", fr: "À Propos" },
  experience: { en: "Experience", fr: "Expérience" },
  blog: "Blog",
  english: "EN",
  french: "FR",
};
