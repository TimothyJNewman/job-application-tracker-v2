const getCVLatex = (resumeObject) => {
  const texPreamble = String.raw`%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}
\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}

\\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
 }
}

\newcommand{\classesList}[4]{
    \item\small{
        {#1 #2 #3 #4 \vspace{-2pt}}
 }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textbf{\small #2} \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2}\\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\begin{document}
  `;

  const texPostamble = String.raw`
\end{document}
  `;

  const getHeading = (basics) => {
    let output = String.raw``;
    const getLinkedIn = (profiles) => {
      if (profiles.find(({ network }) => network === 'linkedIn')) {
        return ({ network, username, url } = profiles.find(
          ({ network, username, url }) => network === 'linkedIn'
        ));
      } else {
        return null;
      }
    };
    const getGithub = (profiles) => {
      if (profiles.find(({ network }) => network === 'gitHub')) {
        return ({ network, username, url } = profiles.find(
          ({ network, username, url }) => network === 'gitHub'
        ));
      } else {
        return null;
      }
    };
    output += String.raw`
%----------HEADING----------
\begin{center}
    {\Huge \scshape ${basics.name}} \\ \vspace{1pt}
    ${
      basics.location.address &&
      String.raw`${basics.location.address}\\ \vspace{1pt}`
    }
    \small \raisebox{-0.1\height}
    ${basics.phone !== '' ? String.raw`\faPhone\ ${basics.phone}` : ''}
    ${
      basics.email !== ''
        ? String.raw`~ \href{mailto:${basics.email}}{\raisebox{-0.2\height} \faEnvelope\ \\underline{${basics.email}}}`
        : ''
    }
    ${
      getLinkedIn(basics.profiles)
        ? String.raw` ~ \href{${
            getLinkedIn(basics.profiles).url
          }}{\raisebox{-0.2\height}\faLinkedin\ \\underline{${
            getLinkedIn(basics.profiles).url
          }}}`
        : ''
    } 
    ${
      getGithub(basics.profiles)
        ? String.raw`~ \href{${
            getGithub(basics.profiles).url
          }{\raisebox{-0.2\height}\faGithub\ \\underline{${
            getGithub(basics.profiles).url
          }}}`
        : ''
    }
\vspace{-8pt}
\end{center}
`;
    return output;
  };

  const getWorkExperiences = (work) => {
    const experienceHeader = String.raw`
  % ----------- EXPERIENCE-----------
\section{Experience}
\resumeSubHeadingListStart`;
    const getWorkExperience = ({
      name,
      position,
      startDate,
      endDate,
      location = '',
      highlights,
    }) => {
      let output = String.raw``;
      output += String.raw`
\resumeSubheading
{${name}} {${startDate}-${endDate}}
{${position}} {${location}}
\resumeItemListStart`;
      highlights.forEach((highlight) => {
        output += String.raw`
\resumeItem{${highlight}} `;
      });
      output += String.raw`
\resumeItemListEnd`;
      return output;
    };
    const experienceFooter = String.raw`
\resumeSubHeadingListEnd
\vspace{-16pt}

`;

    let output = String.raw``;
    output += experienceHeader;
    work.forEach((elem) => {
      output += getWorkExperience(elem);
    });
    output += experienceFooter;
    return output;
  };

  const getInvolvements = (volunteer) => {
    const involvementHeader = String.raw`
  % ----------- INVOLVEMENT---------------
\section{Leadership / Extracurricular}
\resumeSubHeadingListStart`;

    const getInvolvement = ({
      organization,
      position,
      startDate,
      endDate,
      location = '',
      highlights,
    }) => {
      return String.raw`
\resumeSubheading{${organization}} {${startDate}-${endDate}} {${position}} {${location}}
\resumeItemListStart
        ${highlights.reduce((prev, curr) => {
          return (
            prev +
            String.raw`
        \resumeItem{${curr}}`
          );
        }, String.raw``)}
\resumeItemListEnd`;
    };
    const involvementFooter = String.raw`
\resumeSubHeadingListEnd

  `;
    let output = String.raw``;
    output += involvementHeader;
    volunteer.forEach((elem) => {
      output += getInvolvement(elem);
    });
    output += involvementFooter;
    return output;
  };

  const getEducations = (education) => {
    const educationHeader = String.raw`
  % ----------- EDUCATION-----------
\section{Education}
\resumeSubHeadingListStart`;
    const educationFooter = String.raw`
\resumeSubHeadingListEnd

  `;
    let output = String.raw``;
    output += educationHeader;
    education.forEach(
      ({ institution, area, startDate, endDate, location = '' }) => {
        output += String.raw`
\resumeSubheading
{${institution}} {${startDate}-${endDate}}
{${area}} {${location}} `;
      }
    );
    output += educationFooter;

    return output;
  };

  // comment out for now
  //   const getCourseworks = (courseworkArray) => {
  //     const courseworkHeader = String.raw`
  //   % ------RELEVANT COURSEWORK-------
  // \section{Relevant Coursework}
  //   %\resumeSubHeadingListStart
  // \begin{multicols} {4} \small
  // \begin{itemize} [itemsep = -5pt, parsep = 3pt]
  //   `;
  //     const courseworkFooter = String.raw`
  // \end{itemize}
  // \end{multicols}
  // \vspace * {2.0\multicolsep}
  //   %\resumeSubHeadingListEnd

  //     `;
  //     let output = String.raw``;
  //     output += courseworkHeader;
  //     courseworkArray[0].itemArray.forEach((elem) => {
  //       output += String.raw`
  // \item ${elem} `;
  //    });
  //     output += courseworkFooter;
  //     return output;
  //  };

  const getTechnicalSkills = (skills) => {
    let output = String.raw``;
    output += String.raw`
  % ----------- PROGRAMMING SKILLS-----------
\section{Technical Skills}
\begin{itemize} [leftmargin = 0.15in, label = {}]
\small{
\item{
  \textbf{Skills} {: ${skills.map(({ name }) => name).join(', ')}
 } \\
}
}
\end{itemize}
\vspace{-16pt}

`;
    return output;
  };

  const getProjects = (projects) => {
    const projectHeader = String.raw`
  % ----------- PROJECTS-----------
\section{Projects}
\vspace{-5pt}
\resumeSubHeadingListStart`;
    const getProject = ({ name, keywords, startDate, endDate, highlights }) => {
      let output = String.raw``;
      output += String.raw`
\resumeProjectHeading
{
\textbf{${name}} $ | $ \emph{${keywords.reduce(
        (prev, curr) => prev + ', ' + curr
      )}
}
} {${startDate}-${endDate}}
\resumeItemListStart`;
      highlights.forEach((highlight) => {
        output += String.raw`
\resumeItem{${highlight}} `;
      });
      output += String.raw`
\resumeItemListEnd`;
      return output;
    };
    const projectFooter = String.raw`
\resumeSubHeadingListEnd
\vspace{-15pt}

`;
    let output = String.raw``;
    output += projectHeader;
    projects.forEach((elem) => {
      output += getProject(elem);
    });
    output += projectFooter;
    return output;
  };

  const generateTex = (resumeObject) => {
    let output = String.raw``;
    output += texPreamble;
    if (resumeObject.basics) {
      output += getHeading(resumeObject.basics);
    }
    if (resumeObject.work) {
      output += getWorkExperiences(resumeObject.work);
    }
    if (resumeObject.volunteer) {
      output += getInvolvements(resumeObject.volunteer);
    }
    if (resumeObject.education) {
      output += getEducations(resumeObject.education);
    }
    if (resumeObject.skills) {
      output += getTechnicalSkills(resumeObject.skills);
    }
    if (resumeObject.projects) {
      output += getProjects(resumeObject.projects);
    }
    output += texPostamble;
    return output;
  };

  return generateTex(resumeObject);
};

module.exports = getCVLatex;
