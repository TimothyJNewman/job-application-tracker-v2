var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var getCVLatex = function (params) {
    var texPreamble = String.raw(__makeTemplateObject(["\n%-------------------------\n% Resume in Latex\n% Author : Jake Gutierrez\n% Based off of: https://github.com/sb2nov/resume\n% License : MIT\n%------------------------\n\ndocumentclass[letterpaper,11pt]{article}\n\n\\usepackage{latexsym}\n\\usepackage[empty]{fullpage}\n\\usepackage{titlesec}\n\\usepackage{marvosym}\n\\usepackage[usenames,dvipsnames]{color}\n\\usepackage{verbatim}\n\\usepackage{enumitem}\n\\usepackage[hidelinks]{hyperref}\n\\usepackage{fancyhdr}\n\\usepackage[english]{babel}\n\\usepackage{tabularx}\n\\usepackage{fontawesome5}\n\\usepackage{multicol}\nsetlength{multicolsep}{-3.0pt}\nsetlength{columnsep}{-1pt}\ninput{glyphtounicode}\n\n\n%----------FONT OPTIONS----------\n% sans-serif\n% \\usepackage[sfdefault]{FiraSans}\n% \\usepackage[sfdefault]{roboto}\n% \\usepackage[sfdefault]{noto-sans}\n% \\usepackage[default]{sourcesanspro}\n\n% serif\n% \\usepackage{CormorantGaramond}\n% \\usepackage{charter}\n\n\npagestyle{fancy}\n\fancyhf{} % clear all header and footer fields\n\fancyfoot{}\n\renewcommand{headrulewidth}{0pt}\n\renewcommand{\footrulewidth}{0pt}\n\n% Adjust margins\naddtolength{oddsidemargin}{-0.6in}\naddtolength{evensidemargin}{-0.5in}\naddtolength{\textwidth}{1.19in}\naddtolength{\topmargin}{-.7in}\naddtolength{\textheight}{1.4in}\n\n\\urlstyle{same}\n\n\raggedbottom\n\raggedright\nsetlength{\tabcolsep}{0in}\n\n% Sections formatting\n\titleformat{section}{\n  \vspace{-4pt}scshape\raggedrightlarge\bfseries\n}{}{0em}{}[color{black}\titlerule \vspace{-5pt}]\n\n% Ensure that generate pdf is machine readable/ATS parsable\npdfgentounicode=1\n\n%-------------------------\n% Custom commands\n\newcommand{\resumeItem}[1]{\n  itemsmall{\n    {#1 \vspace{-2pt}}\n  }\n}\n\n\newcommand{classesList}[4]{\n    itemsmall{\n        {#1 #2 #3 #4 \vspace{-2pt}}\n  }\n}\n\n\newcommand{\resumeSubheading}[4]{\n  \vspace{-2pt}item\n    \begin{tabular*}{1.0\textwidth}[t]{l@{extracolsep{\fill}}r}\n      \textbf{#1} & \textbf{small #2} \\\n      \textit{small#3} & \textit{small #4} \\\n    end{tabular*}\vspace{-7pt}\n}\n\n\newcommand{\resumeSubSubheading}[2]{\n    item\n    \begin{tabular*}{0.97\textwidth}{l@{extracolsep{\fill}}r}\n      \textit{small#1} & \textit{small #2} \\\n    end{tabular*}\vspace{-7pt}\n}\n\n\newcommand{\resumeProjectHeading}[2]{\n    item\n    \begin{tabular*}{1.001\textwidth}{l@{extracolsep{\fill}}r}\n      small#1 & \textbf{small #2}\\\n    end{tabular*}\vspace{-7pt}\n}\n\n\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}\n\n\renewcommandlabelitemi{$\vcenter{hbox{\tiny$\bullet$}}$}\n\renewcommandlabelitemii{$\vcenter{hbox{\tiny$\bullet$}}$}\n\n\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}\n\newcommand{\resumeSubHeadingListEnd}{end{itemize}}\n\newcommand{\resumeItemListStart}{\begin{itemize}}\n\newcommand{\resumeItemListEnd}{end{itemize}\vspace{-5pt}}\n\n%-------------------------------------------\n%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n\begin{document}\n  "], ["\n%-------------------------\n% Resume in Latex\n% Author : Jake Gutierrez\n% Based off of: https://github.com/sb2nov/resume\n% License : MIT\n%------------------------\n\n\\documentclass[letterpaper,11pt]{article}\n\n\\\\usepackage{latexsym}\n\\\\usepackage[empty]{fullpage}\n\\\\usepackage{titlesec}\n\\\\usepackage{marvosym}\n\\\\usepackage[usenames,dvipsnames]{color}\n\\\\usepackage{verbatim}\n\\\\usepackage{enumitem}\n\\\\usepackage[hidelinks]{hyperref}\n\\\\usepackage{fancyhdr}\n\\\\usepackage[english]{babel}\n\\\\usepackage{tabularx}\n\\\\usepackage{fontawesome5}\n\\\\usepackage{multicol}\n\\setlength{\\multicolsep}{-3.0pt}\n\\setlength{\\columnsep}{-1pt}\n\\input{glyphtounicode}\n\n\n%----------FONT OPTIONS----------\n% sans-serif\n% \\\\usepackage[sfdefault]{FiraSans}\n% \\\\usepackage[sfdefault]{roboto}\n% \\\\usepackage[sfdefault]{noto-sans}\n% \\\\usepackage[default]{sourcesanspro}\n\n% serif\n% \\\\usepackage{CormorantGaramond}\n% \\\\usepackage{charter}\n\n\n\\pagestyle{fancy}\n\\fancyhf{} % clear all header and footer fields\n\\fancyfoot{}\n\\renewcommand{\\headrulewidth}{0pt}\n\\renewcommand{\\footrulewidth}{0pt}\n\n% Adjust margins\n\\addtolength{\\oddsidemargin}{-0.6in}\n\\addtolength{\\evensidemargin}{-0.5in}\n\\addtolength{\\textwidth}{1.19in}\n\\addtolength{\\topmargin}{-.7in}\n\\addtolength{\\textheight}{1.4in}\n\n\\\\urlstyle{same}\n\n\\raggedbottom\n\\raggedright\n\\setlength{\\tabcolsep}{0in}\n\n% Sections formatting\n\\titleformat{\\section}{\n  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries\n}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]\n\n% Ensure that generate pdf is machine readable/ATS parsable\n\\pdfgentounicode=1\n\n%-------------------------\n% Custom commands\n\\newcommand{\\resumeItem}[1]{\n  \\item\\small{\n    {#1 \\vspace{-2pt}}\n  }\n}\n\n\\newcommand{\\classesList}[4]{\n    \\item\\small{\n        {#1 #2 #3 #4 \\vspace{-2pt}}\n  }\n}\n\n\\newcommand{\\resumeSubheading}[4]{\n  \\vspace{-2pt}\\item\n    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\n      \\textbf{#1} & \\textbf{\\small #2} \\\\\n      \\textit{\\small#3} & \\textit{\\small #4} \\\\\n    \\end{tabular*}\\vspace{-7pt}\n}\n\n\\newcommand{\\resumeSubSubheading}[2]{\n    \\item\n    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}\n      \\textit{\\small#1} & \\textit{\\small #2} \\\\\n    \\end{tabular*}\\vspace{-7pt}\n}\n\n\\newcommand{\\resumeProjectHeading}[2]{\n    \\item\n    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}\n      \\small#1 & \\textbf{\\small #2}\\\\\n    \\end{tabular*}\\vspace{-7pt}\n}\n\n\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}\n\n\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}\n\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}\n\n\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}\n\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}\n\\newcommand{\\resumeItemListStart}{\\begin{itemize}}\n\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}\n\n%-------------------------------------------\n%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n\\begin{document}\n  "]));
    var texPostamble = String.raw(__makeTemplateObject(["\nend{document}\n  "], ["\n\\end{document}\n  "]));
    var getHeading = function (headingsArray) {
        var elem = headingsArray[0];
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += String.raw(__makeTemplateObject(["\n%----------HEADING----------\n\begin{center}\n    {Huge scshape ", "} \\ \vspace{1pt}\n    ", " \\ \vspace{1pt}\n    small \raisebox{-0.1height}\n    ", "\n    ", "\n    ", " \n    ", "\n    \vspace{-8pt}\nend{center}\n        "], ["\n%----------HEADING----------\n\\begin{center}\n    {\\Huge \\scshape ", "} \\\\ \\vspace{1pt}\n    ", " \\\\ \\vspace{1pt}\n    \\small \\raisebox{-0.1\\height}\n    ", "\n    ", "\n    ", " \n    ", "\n    \\vspace{-8pt}\n\\end{center}\n        "]), elem.name, elem.address, elem.phone !== '' ? String.raw(__makeTemplateObject(["\faPhone ", ""], ["\\faPhone\\ ", ""]), elem.phone) : '', elem.email !== ''
            ? String.raw(__makeTemplateObject(["~ href{mailto:", "}{\raisebox{-0.2height} \faEnvelope \\underline{", "}}"], ["~ \\href{mailto:", "}{\\raisebox{-0.2\\height} \\faEnvelope\\ \\\\underline{", "}}"]), elem.email, elem.email) : '', elem.linkedIn !== ''
            ? String.raw(__makeTemplateObject([" ~ href{", "}{\raisebox{-0.2height}\faLinkedin \\underline{", "}}"], [" ~ \\href{", "}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\\\underline{", "}}"]), elem.linkedIn, elem.linkedIn) : '', elem.gitHub !== ''
            ? String.raw(__makeTemplateObject(["~ href{", "}{\raisebox{-0.2height}\faGithub \\underline{", "}}"], ["~ \\href{", "}{\\raisebox{-0.2\\height}\\faGithub\\ \\\\underline{", "}}"]), elem.gitHub, elem.gitHub) : '');
        return output;
    };
    var getEducations = function (educationArray) {
        var educationHeader = String.raw(__makeTemplateObject(["\n%-----------EDUCATION-----------\nsection{Education}\n  \resumeSubHeadingListStart"], ["\n%-----------EDUCATION-----------\n\\section{Education}\n  \\resumeSubHeadingListStart"]));
        var educationFooter = String.raw(__makeTemplateObject(["\n  \resumeSubHeadingListEnd\n  \n  "], ["\n  \\resumeSubHeadingListEnd\n  \n  "]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += educationHeader;
        educationArray.forEach(function (elem) {
            output += String.raw(__makeTemplateObject([" \n    \resumeSubheading\n      {", "}{", "}\n      {", "}{", "}"], [" \n    \\resumeSubheading\n      {", "}{", "}\n      {", "}{", "}"]), elem.institution, elem.date, elem.course, elem.location);
        });
        output += educationFooter;
        return output;
    };
    var getCourseworks = function (courseworkArray) {
        var courseworkHeader = String.raw(__makeTemplateObject(["\n%------RELEVANT COURSEWORK-------\nsection{Relevant Coursework}\n  %\resumeSubHeadingListStart\n      \begin{multicols}{4} small\n        \begin{itemize}[itemsep=-5pt, parsep=3pt]\n    "], ["\n%------RELEVANT COURSEWORK-------\n\\section{Relevant Coursework}\n  %\\resumeSubHeadingListStart\n      \\begin{multicols}{4} \\small\n        \\begin{itemize}[itemsep=-5pt, parsep=3pt]\n    "]));
        var courseworkFooter = String.raw(__makeTemplateObject(["\n        end{itemize}\n      end{multicols}\n      \vspace*{2.0multicolsep}\n    %\resumeSubHeadingListEnd\n\n    "], ["\n        \\end{itemize}\n      \\end{multicols}\n      \\vspace*{2.0\\multicolsep}\n    %\\resumeSubHeadingListEnd\n\n    "]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += courseworkHeader;
        courseworkArray[0].itemArray.forEach(function (elem) {
            output += String.raw(__makeTemplateObject(["\n          item ", ""], ["\n          \\item ", ""]), elem);
        });
        output += courseworkFooter;
        return output;
    };
    var getExperiences = function (experienceArray) {
        var experienceHeader = String.raw(__makeTemplateObject(["\n% ----------- EXPERIENCE-----------\nsection{Experience}\n  \resumeSubHeadingListStart"], ["\n% ----------- EXPERIENCE-----------\n\\section{Experience}\n  \\resumeSubHeadingListStart"]));
        var getExperience = function (company, role, date, location, itemArray) {
            var output = String.raw(__makeTemplateObject([""], [""]));
            output += String.raw(__makeTemplateObject(["\n    \resumeSubheading\n      {", "} {", "} \n      {", "} {", "}\n    \resumeItemListStart"], ["\n    \\resumeSubheading\n      {", "} {", "} \n      {", "} {", "}\n    \\resumeItemListStart"]), company, date, role, location);
            itemArray.forEach(function (item) {
                output += String.raw(__makeTemplateObject(["\n      \resumeItem{", "}"], ["\n      \\resumeItem{", "}"]), item);
            });
            output += String.raw(__makeTemplateObject(["\n    \resumeItemListEnd"], ["\n    \\resumeItemListEnd"]));
            return output;
        };
        var experienceFooter = String.raw(__makeTemplateObject(["\n  \resumeSubHeadingListEnd\n\vspace{-16pt}\n\n"], ["\n  \\resumeSubHeadingListEnd\n\\vspace{-16pt}\n\n"]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += experienceHeader;
        experienceArray.forEach(function (elem) {
            output += getExperience(elem.company, elem.role, elem.date, elem.location, elem.itemArray);
        });
        output += experienceFooter;
        return output;
    };
    var getProjects = function (projectArray) {
        var projectHeader = String.raw(__makeTemplateObject(["\n%-----------PROJECTS-----------\nsection{Projects}\n  \vspace{-5pt}\n  \resumeSubHeadingListStart"], ["\n%-----------PROJECTS-----------\n\\section{Projects}\n  \\vspace{-5pt}\n  \\resumeSubHeadingListStart"]));
        var getProject = function (title, skillArray, date, itemArray) {
            var output = String.raw(__makeTemplateObject([""], [""]));
            output += String.raw(__makeTemplateObject(["\n    \resumeProjectHeading\n      {\textbf{", "} $|$ emph{", "}}{", "}\n      \resumeItemListStart"], ["\n    \\resumeProjectHeading\n      {\\textbf{", "} $|$ \\emph{", "}}{", "}\n      \\resumeItemListStart"]), title, skillArray.reduce(function (prev, curr) { return prev + ', ' + curr; }), date);
            itemArray.forEach(function (item) {
                output += String.raw(__makeTemplateObject(["\n        \resumeItem{", "}"], ["\n        \\resumeItem{", "}"]), item);
            });
            output += String.raw(__makeTemplateObject(["\n    \resumeItemListEnd"], ["\n    \\resumeItemListEnd"]));
            return output;
        };
        var experienceFooter = String.raw(__makeTemplateObject(["\n  \resumeSubHeadingListEnd\n\vspace{-15pt}\n\n"], ["\n  \\resumeSubHeadingListEnd\n\\vspace{-15pt}\n\n"]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += projectHeader;
        projectArray.forEach(function (elem) {
            output += getProject(elem.title, elem.skillArray, elem.date, elem.itemArray);
        });
        output += experienceFooter;
        return output;
    };
    var getTechnicalSkills = function (technicalArray) {
        if (technicalArray.length > 1) {
            console.error('Technical Skills section can only have 1 item');
        }
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += String.raw(__makeTemplateObject(["\n%-----------PROGRAMMING SKILLS-----------\nsection{Technical Skills}\n  \begin{itemize}[leftmargin=0.15in, label={}]\n    small{item{\n    \textbf{Languages}{: ", "} \\\n    \textbf{Developer Tools}{: ", "} \\\n    \textbf{Technologies/Frameworks}{: ", "} \\\n}}\nend{itemize}\n\vspace{-16pt}\n\n"], ["\n%-----------PROGRAMMING SKILLS-----------\n\\section{Technical Skills}\n  \\begin{itemize}[leftmargin=0.15in, label={}]\n    \\small{\\item{\n    \\textbf{Languages}{: ", "} \\\\\n    \\textbf{Developer Tools}{: ", "} \\\\\n    \\textbf{Technologies/Frameworks}{: ", "} \\\\\n}}\n\\end{itemize}\n\\vspace{-16pt}\n\n"]), technicalArray[0].languages.reduce(function (prev, curr) { return prev + ', ' + curr; }), technicalArray[0].tools.reduce(function (prev, curr) { return prev + ', ' + curr; }), technicalArray[0].technologies.reduce(function (prev, curr) { return prev + ', ' + curr; }));
        return output;
    };
    var getInvolvements = function (involvementArray) {
        var involvementHeader = String.raw(__makeTemplateObject(["\n%-----------INVOLVEMENT---------------\nsection{Leadership / Extracurricular}\n  \resumeSubHeadingListStart"], ["\n%-----------INVOLVEMENT---------------\n\\section{Leadership / Extracurricular}\n  \\resumeSubHeadingListStart"]));
        var getInvolvement = function (organisation, date, role, misc, itemArray) {
            return String.raw(__makeTemplateObject(["\n    \resumeSubheading{", "}{", "}{", "}{", "}\n      \resumeItemListStart\n        ", "\n      \resumeItemListEnd"], ["\n    \\resumeSubheading{", "}{", "}{", "}{", "}\n      \\resumeItemListStart\n        ", "\n      \\resumeItemListEnd"]), organisation, date, role, misc, itemArray.reduce(function (prev, curr) {
                return (prev + String.raw(__makeTemplateObject(["\n        \resumeItem{", "}"], ["\n        \\resumeItem{", "}"]), curr));
            }, String.raw(__makeTemplateObject([""], [""]))));
        };
        var involvementFooter = String.raw(__makeTemplateObject(["\n\resumeSubHeadingListEnd\n\n"], ["\n\\resumeSubHeadingListEnd\n\n"]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += involvementHeader;
        involvementArray.forEach(function (elem) {
            output += getInvolvement(elem.organisation, elem.date, elem.role, elem.misc, elem.itemArray);
        });
        output += involvementFooter;
        return output;
    };
    var generateTex = function (params) {
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += texPreamble;
        var headingArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'heading';
        });
        if (headingArr.length !== 0) {
            output += getHeading(headingArr);
        }
        var educationArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'education';
        });
        if (educationArr.length !== 0) {
            output += getEducations(educationArr);
        }
        var courseworkArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'coursework';
        });
        if (courseworkArr.length !== 0) {
            output += getCourseworks(courseworkArr);
        }
        var experienceArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'experience';
        });
        if (experienceArr.length !== 0) {
            output += getExperiences(experienceArr);
        }
        var projectsArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'project';
        });
        if (projectsArr.length !== 0) {
            output += getProjects(projectsArr);
        }
        var technicalSkillsArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'technical';
        });
        if (technicalSkillsArr.length !== 0) {
            output += getTechnicalSkills(technicalSkillsArr);
        }
        var involvementArr = params.paramsArray.filter(function (elem) {
            return elem.section === 'involvement';
        });
        if (involvementArr.length !== 0) {
            output += getInvolvements(involvementArr);
        }
        output += texPostamble;
        return output;
    };
    return generateTex(params);
};
module.exports = getCVLatex;
//# sourceMappingURL=template1.js.map