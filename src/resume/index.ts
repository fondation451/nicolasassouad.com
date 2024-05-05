import lodash from "lodash";
import resumeEnJson from "./resumeEn.json" assert { type: "json" };
import resumeFrJson from "./resumeFr.json" assert { type: "json" };

export type Skill = { category: string; name: string };

export type Experience = {
  start: string;
  end: string;
  title: string;
  skills: string[];
  company: string;
  location: string;
  link: string;
  body: string;
  facts: (string | { value: string; link: string })[];
};

export type Study = {
  start: string;
  end: string;
  diploma: string;
  school: string;
  location: string;
  description: string;
};

export type SpeakingLanguage = {
  language: string;
  level: string;
};

export type Resume = {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  linkedIn: string;
  github: string;
  description: string;
  skills: Skill[];
  experiences: Experience[];
  studies: Study[];
  speakingLanguages: SpeakingLanguage[];
};

const resumeFr: Resume = resumeFrJson;
const resumeEn: Resume = resumeEnJson;

const latexResumeWordingsFr = {
  skills: "Compétences",
  experiences: "Expériences professionnelles",
  studies: "Etudes",
  speakingLanguages: "Langues",
  interests: "Passions",
};

const latexResumeWordingsEn: typeof latexResumeWordingsFr = {
  skills: "Skills",
  experiences: "Professional experiences",
  studies: "Education",
  speakingLanguages: "Languages",
  interests: "Interests",
};

const formatForLatex = (str: string) => {
  return str.replaceAll("&", "\\&").replaceAll("#", "\\#").replaceAll("_", "\\_");
};

export const getResume = (language: string) => {
  switch (language) {
    case "fr":
      return resumeFr;
    case "en":
    default:
      return resumeEn;
  }
};

export const resumetoLatex = (language: string) => {
  const resume = getResume(language);
  const wordings = language === "fr" ? latexResumeWordingsFr : latexResumeWordingsEn;
  const groupedSkills = Object.entries(lodash.groupBy(resume.skills, (skill) => skill.category)).map(
    ([category, skills]) => ({
      category,
      names: skills.map((skill) => skill.name),
    }),
  );

  return `
\\documentclass[10pt,a4paper,sans]{moderncv}        % possible options include font size ('10pt', '11pt' and '12pt'), paper size ('a4paper', 'letterpaper', 'a5paper', 'legalpaper', 'executivepaper' and 'landscape') and font family ('sans' and 'roman')

% moderncv themes
\\moderncvstyle{classic}                             % style options are 'casual' (default), 'classic', 'banking', 'oldstyle' and 'fancy'
\\moderncvcolor{burgundy}                               % color options 'black', 'blue' (default), 'burgundy', 'green', 'grey', 'orange', 'purple' and 'red'
\\renewcommand*{\\namefont}{\\fontsize{20}{20}\\mdseries\\upshape}
\\renewcommand*{\\addressfont}{\\fontsize{8}{8}\\mdseries\\upshape}
%\\renewcommand{\\familydefault}{\\sfdefault}         % to set the default font; use '\\sfdefault' for the default sans serif font, '\\rmdefault' for the default roman one, or any tex font name
\\nopagenumbers{}                                  % uncomment to suppress automatic page numbering for CVs longer than one page

% character encoding
\\usepackage[utf8]{inputenc}                       % if you are not using xelatex ou lualatex, replace by the encoding you are using
%\\usepackage{CJKutf8}                              % if you need to use CJK to typeset your resume in Chinese, Japanese or Korean

% adjust the page margins
\\usepackage[scale=0.82]{geometry}
\\setlength{\\hintscolumnwidth}{3.3cm}                % if you want to change the width of the column with the dates
%\\setlength{\\makecvtitlenamewidth}{10cm}           % for the 'classic' style, if you want to force the width allocated to your name and avoid line breaks. be careful though, the length is normally calculated to avoid any overlap with your personal info; use this at your own typographical risks...

\\usepackage{enumitem}

% personal data
\\name{${resume.firstName}}{${resume.lastName}}
%\\title{Resume}                               % optional, remove / comment the line if not wanted
%\\address{street}{city}{country}% optional, remove / comment the line if not wanted; the "postcode city" and "country" arguments can be omitted or provided empty
%\\phone[mobile]{phone}                   % optional, remove / comment the line if not wanted; the optional "type" of the phone can be "mobile" (default), "fixed" or "fax"
%\\phone[fixed]{+2~(345)~678~901}
%\\phone[fax]{+3~(456)~789~012}
\\email{${resume.email}}                               % optional, remove / comment the line if not wanted
\\homepage{${resume.website}}                         % optional, remove / comment the line if not wanted
\\social[linkedin]{${resume.linkedIn}}                        % optional, remove / comment the line if not wanted
%\\social[twitter]{assouad}                             % optional, remove / comment the line if not wanted
\\social[github]{${resume.github}}                              % optional, remove / comment the line if not wanted
%\\extrainfo{additional information}                 % optional, remove / comment the line if not wanted
%\\photo[64pt][0.4pt]{picture}                       % optional, remove / comment the line if not wanted; '64pt' is the height the picture must be resized to, 0.4pt is the thickness of the frame around it (put it to 0pt for no frame) and 'picture' is the name of the picture file
%\\quote{Some quote}                                 % optional, remove / comment the line if not wanted


\\begin{document}


\\makecvtitle


\\section{${wordings.skills}}
${groupedSkills
  .map(({ category, names }) => `\\cvitem{${category}}{${names.map((name) => formatForLatex(name)).join(", ")}}`)
  .join("\n")}

\\section{${wordings.experiences}}

${resume.experiences
  .map(
    (experience) => `\\cventry{${experience.start} -- ${experience.end}}{\\href{${experience.link}}{${formatForLatex(
      experience.title,
    )}} (${experience.skills.map((skill) => formatForLatex(skill)).join(", ")})}{\\href{${experience.link}}{${
      experience.company
    }}}{${experience.location}}{}{
  ${experience.body ? `${experience.body}\n` : ""}\\begin{itemize}[label=\\textbullet]
    ${experience.facts
      .map(
        (fact) => `\\item ${typeof fact === "string" ? fact : `${fact.value} (\\emph{${formatForLatex(fact.link)}})`}`,
      )
      .join("\n    ")}
  \\end{itemize}
}`,
  )
  .join("\n")}

\\section{${wordings.studies}}

${resume.studies
  .map(
    (study) => `\\cventry{${study.start} -- ${study.end}}{${study.diploma}}{${study.school}}{${study.location}}{}{
  ${study.description}
}`,
  )
  .join("\n")}

\\section{${wordings.speakingLanguages}}

${resume.speakingLanguages
  .map((speakingLanguage) => `\\cvitemwithcomment{${speakingLanguage.language}}{${speakingLanguage.level}}{}`)
  .join("\n")}

\\end{document}
`;
};
