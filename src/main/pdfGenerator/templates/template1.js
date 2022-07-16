const getLatex = (params) => {
  const texPreamble = String.raw`
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}
\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% serif
% \usepackage{CormorantGaramond}
% \usepackage{charter}


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

\urlstyle{same}

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
  `

  const texPostamble = String.raw`
\end{document}
  `

  const getHeading = (headingsArray) => {
    const e = headingsArray[0]
    let output = String.raw``
    output += String.raw`
%----------HEADING----------
\begin{center}
    {\Huge \scshape ${e.name}} \\ \vspace{1pt}
    ${e.address} \\ \vspace{1pt}
    \small \raisebox{-0.1\height}
    \faPhone\ ${e.phone} ~ \href{mailto:${e.email}}{\raisebox{-0.2\height}
    \faEnvelope\  \underline{${e.email}}} ~ \href{${e.linkedIn}}{\raisebox{-0.2\height}
    \faLinkedin\ \underline{${e.linkedIn}}} ~ \href{${e.gitHub}}{\raisebox{-0.2\height}
    \faGithub\ \underline{${e.gitHub}}}
    \vspace{-8pt}
\end{center}
        `
    return output
  }

  const getEducations = (educationArray) => {
    const educationHeader = String.raw`
%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart`
    const educationFooter = String.raw`
  \resumeSubHeadingListEnd
  
  `
    let output = String.raw``
    output += educationHeader
    educationArray.forEach((e) => {
      output += String.raw` 
    \resumeSubheading
      {${e.institution}}{${e.date}}
      {${e.course}}{${e.location}}`
    })
    output += educationFooter

    return output
  }

  const getCourseworks = (courseworkArray) => {
    const courseworkHeader = String.raw`
%------RELEVANT COURSEWORK-------
\section{Relevant Coursework}
  %\resumeSubHeadingListStart
      \begin{multicols}{4} \small
        \begin{itemize}[itemsep=-5pt, parsep=3pt]
    `
    const courseworkFooter = String.raw`
        \end{itemize}
      \end{multicols}
      \vspace*{2.0\multicolsep}
    %\resumeSubHeadingListEnd

    `
    let output = String.raw``
    output += courseworkHeader
    courseworkArray[0].itemArray.forEach((e) => {
      output += String.raw`
          \item ${e}`
    })
    output += courseworkFooter
    return output
  }

  const getExperiences = (experienceArray) => {
    const experienceHeader = String.raw`
% ----------- EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart`
    const getExperience = (company, role, date, location, itemArray) => {
      let output = String.raw``
      output += String.raw`
    \resumeSubheading
      {${company}} {${date}} 
      {${role}} {${location}}
    \resumeItemListStart`
      itemArray.forEach((item) => {
        output += String.raw`
      \resumeItem{${item}}`
      })
      output += String.raw`
    \resumeItemListEnd`
      return output
    }
    const experienceFooter = String.raw`
  \resumeSubHeadingListEnd
\vspace{-16pt}

`

    let output = String.raw``
    output += experienceHeader
    experienceArray.forEach((e) => {
      output += getExperience(e.company, e.role, e.date, e.location, e.itemArray)
    })
    output += experienceFooter
    return output
  }

  const getProjects = (projectArray) => {
    const projectHeader = String.raw`
%-----------PROJECTS-----------
\section{Projects}
  \vspace{-5pt}
  \resumeSubHeadingListStart`
    const getProject = (title, skillArray, date, itemArray) => {
      let output = String.raw``
      output += String.raw`
    \resumeProjectHeading
      {\textbf{${title}} $|$ \emph{${skillArray.reduce(
        (prev, curr) => prev + ', ' + curr
      )}}}{${date}}
      \resumeItemListStart`
      itemArray.forEach((item) => {
        output += String.raw`
        \resumeItem{${item}}`
      })
      output += String.raw`
    \resumeItemListEnd`
      return output
    }
    const experienceFooter = String.raw`
  \resumeSubHeadingListEnd
\vspace{-15pt}

`
    let output = String.raw``
    output += projectHeader
    projectArray.forEach((e) => {
      output += getProject(e.title, e.skillArray, e.date, e.itemArray)
    })
    output += experienceFooter
    return output
  }

  const getTechnicalSkills = (technicalArray) => {
    if (technicalArray.length > 1) {
      console.error('Technical Skills section can only have 1 item')
    }
    let output = String.raw``
    output += String.raw`
%-----------PROGRAMMING SKILLS-----------
\section{Technical Skills}
  \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
    \textbf{Languages}{: ${technicalArray[0].languages.reduce(
      (prev, curr) => prev + ', ' + curr
    )}} \\
    \textbf{Developer Tools}{: ${technicalArray[0].tools.reduce(
      (prev, curr) => prev + ', ' + curr
    )}} \\
    \textbf{Technologies/Frameworks}{: ${technicalArray[0].technologies.reduce(
      (prev, curr) => prev + ', ' + curr
    )}} \\
}}
\end{itemize}
\vspace{-16pt}

`
    return output
  }

  const getInvolvements = (involvementArray) => {
    const involvementHeader = String.raw`
%-----------INVOLVEMENT---------------
\section{Leadership / Extracurricular}
  \resumeSubHeadingListStart`

    const getInvolvement = (organisation, date, role, misc, itemArray) => {
      return String.raw`
    \resumeSubheading{${organisation}}{${date}}{${role}}{${misc}}
      \resumeItemListStart
        ${itemArray.reduce((prev, curr) => {
          return (
            prev +
            String.raw`
        \resumeItem{${curr}}`
          )
        }, String.raw``)}
      \resumeItemListEnd`
    }
    const involvementFooter = String.raw`
\resumeSubHeadingListEnd

`
    let output = String.raw``
    output += involvementHeader
    involvementArray.forEach((e) => {
      output += getInvolvement(e.organisation, e.date, e.role, e.misc, e.itemArray)
    })
    output += involvementFooter
    return output
  }

  const generateTex = (params) => {
    let output = String.raw``
    output += texPreamble
    output += getHeading(
      params.paramsArray.filter((elem) => {
        return elem.section === 'heading'
      })
    )
    output += getEducations(
      params.paramsArray.filter((elem) => {
        return elem.section === 'education'
      })
    )
    output += getCourseworks(
      params.paramsArray.filter((elem) => {
        return elem.section === 'coursework'
      })
    )
    output += getExperiences(
      params.paramsArray.filter((elem) => {
        return elem.section === 'experience'
      })
    )
    output += getProjects(
      params.paramsArray.filter((elem) => {
        return elem.section === 'project'
      })
    )
    output += getTechnicalSkills(
      params.paramsArray.filter((elem) => {
        return elem.section === 'technical'
      })
    )
    output += getInvolvements(
      params.paramsArray.filter((elem) => {
        return elem.section === 'involvement'
      })
    )
    output += texPostamble
    return output
  }

  return generateTex(params)
}

module.exports = getLatex
