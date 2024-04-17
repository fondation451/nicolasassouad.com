import { writeFileSync } from "fs";
import { resumetoLatex } from "../resume";

const buildResumes = () => {
  const resumeFr = resumetoLatex("fr");
  const resumeEn = resumetoLatex("en");

  writeFileSync("cv_fr.tex", resumeFr);
  writeFileSync("cv_en.tex", resumeEn);
};

buildResumes();
