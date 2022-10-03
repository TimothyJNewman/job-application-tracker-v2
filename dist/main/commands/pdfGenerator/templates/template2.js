var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var getCVLatex = function (resumeObject) {
    var texPreamble = String.raw(__makeTemplateObject(["%-------------------------\n% Resume in Latex\n% Author : Jake Gutierrez\n% Based off of: https://github.com/sb2nov/resume\n% License : MIT\n%------------------------\n\ndocumentclass[letterpaper,11pt]{article}\n\n\\usepackage{latexsym}\n\\usepackage[empty]{fullpage}\n\\usepackage{titlesec}\n\\usepackage{marvosym}\n\\usepackage[usenames,dvipsnames]{color}\n\\usepackage{verbatim}\n\\usepackage{enumitem}\n\\usepackage[hidelinks]{hyperref}\n\\usepackage{fancyhdr}\n\\usepackage[english]{babel}\n\\usepackage{tabularx}\n\\usepackage{fontawesome5}\n\\usepackage{multicol}\nsetlength{multicolsep}{-3.0pt}\nsetlength{columnsep}{-1pt}\ninput{glyphtounicode}\n\n\n%----------FONT OPTIONS----------\n% sans-serif\n% \\usepackage[sfdefault]{FiraSans}\n% \\usepackage[sfdefault]{roboto}\n% \\usepackage[sfdefault]{noto-sans}\n% \\usepackage[default]{sourcesanspro}\n\n% serif\n% \\usepackage{CormorantGaramond}\n% \\usepackage{charter}\n\n\npagestyle{fancy}\n\fancyhf{} % clear all header and footer fields\n\fancyfoot{}\n\renewcommand{headrulewidth}{0pt}\n\renewcommand{\footrulewidth}{0pt}\n\n% Adjust margins\naddtolength{oddsidemargin}{-0.6in}\naddtolength{evensidemargin}{-0.5in}\naddtolength{\textwidth}{1.19in}\naddtolength{\topmargin}{-.7in}\naddtolength{\textheight}{1.4in}\n\n\\urlstyle{same}\n\n\raggedbottom\n\raggedright\nsetlength{\tabcolsep}{0in}\n\n% Sections formatting\n\titleformat{section}{\n  \vspace{-4pt}scshape\raggedrightlarge\bfseries\n}{}{0em}{}[color{black}\titlerule \vspace{-5pt}]\n\n% Ensure that generate pdf is machine readable/ATS parsable\npdfgentounicode=1\n\n%-------------------------\n% Custom commands\n\newcommand{\resumeItem}[1]{\n  itemsmall{\n    {#1 \vspace{-2pt}}\n }\n}\n\n\newcommand{classesList}[4]{\n    itemsmall{\n        {#1 #2 #3 #4 \vspace{-2pt}}\n }\n}\n\n\newcommand{\resumeSubheading}[4]{\n  \vspace{-2pt}item\n    \begin{tabular*}{1.0\textwidth}[t]{l@{extracolsep{\fill}}r}\n      \textbf{#1} & \textbf{small #2} \\\n      \textit{small#3} & \textit{small #4} \\\n    end{tabular*}\vspace{-7pt}\n}\n\n\newcommand{\resumeSubSubheading}[2]{\n    item\n    \begin{tabular*}{0.97\textwidth}{l@{extracolsep{\fill}}r}\n      \textit{small#1} & \textit{small #2} \\\n    end{tabular*}\vspace{-7pt}\n}\n\n\newcommand{\resumeProjectHeading}[2]{\n    item\n    \begin{tabular*}{1.001\textwidth}{l@{extracolsep{\fill}}r}\n      small#1 & \textbf{small #2}\\\n    end{tabular*}\vspace{-7pt}\n}\n\n\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}\n\n\renewcommandlabelitemi{$\vcenter{hbox{\tiny$\bullet$}}$}\n\renewcommandlabelitemii{$\vcenter{hbox{\tiny$\bullet$}}$}\n\n\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}\n\newcommand{\resumeSubHeadingListEnd}{end{itemize}}\n\newcommand{\resumeItemListStart}{\begin{itemize}}\n\newcommand{\resumeItemListEnd}{end{itemize}\vspace{-5pt}}\n\n%-------------------------------------------\n%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n\begin{document}\n  "], ["%-------------------------\n% Resume in Latex\n% Author : Jake Gutierrez\n% Based off of: https://github.com/sb2nov/resume\n% License : MIT\n%------------------------\n\n\\documentclass[letterpaper,11pt]{article}\n\n\\\\usepackage{latexsym}\n\\\\usepackage[empty]{fullpage}\n\\\\usepackage{titlesec}\n\\\\usepackage{marvosym}\n\\\\usepackage[usenames,dvipsnames]{color}\n\\\\usepackage{verbatim}\n\\\\usepackage{enumitem}\n\\\\usepackage[hidelinks]{hyperref}\n\\\\usepackage{fancyhdr}\n\\\\usepackage[english]{babel}\n\\\\usepackage{tabularx}\n\\\\usepackage{fontawesome5}\n\\\\usepackage{multicol}\n\\setlength{\\multicolsep}{-3.0pt}\n\\setlength{\\columnsep}{-1pt}\n\\input{glyphtounicode}\n\n\n%----------FONT OPTIONS----------\n% sans-serif\n% \\\\usepackage[sfdefault]{FiraSans}\n% \\\\usepackage[sfdefault]{roboto}\n% \\\\usepackage[sfdefault]{noto-sans}\n% \\\\usepackage[default]{sourcesanspro}\n\n% serif\n% \\\\usepackage{CormorantGaramond}\n% \\\\usepackage{charter}\n\n\n\\pagestyle{fancy}\n\\fancyhf{} % clear all header and footer fields\n\\fancyfoot{}\n\\renewcommand{\\headrulewidth}{0pt}\n\\renewcommand{\\footrulewidth}{0pt}\n\n% Adjust margins\n\\addtolength{\\oddsidemargin}{-0.6in}\n\\addtolength{\\evensidemargin}{-0.5in}\n\\addtolength{\\textwidth}{1.19in}\n\\addtolength{\\topmargin}{-.7in}\n\\addtolength{\\textheight}{1.4in}\n\n\\\\urlstyle{same}\n\n\\raggedbottom\n\\raggedright\n\\setlength{\\tabcolsep}{0in}\n\n% Sections formatting\n\\titleformat{\\section}{\n  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries\n}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]\n\n% Ensure that generate pdf is machine readable/ATS parsable\n\\pdfgentounicode=1\n\n%-------------------------\n% Custom commands\n\\newcommand{\\resumeItem}[1]{\n  \\item\\small{\n    {#1 \\vspace{-2pt}}\n }\n}\n\n\\newcommand{\\classesList}[4]{\n    \\item\\small{\n        {#1 #2 #3 #4 \\vspace{-2pt}}\n }\n}\n\n\\newcommand{\\resumeSubheading}[4]{\n  \\vspace{-2pt}\\item\n    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\n      \\textbf{#1} & \\textbf{\\small #2} \\\\\n      \\textit{\\small#3} & \\textit{\\small #4} \\\\\n    \\end{tabular*}\\vspace{-7pt}\n}\n\n\\newcommand{\\resumeSubSubheading}[2]{\n    \\item\n    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}\n      \\textit{\\small#1} & \\textit{\\small #2} \\\\\n    \\end{tabular*}\\vspace{-7pt}\n}\n\n\\newcommand{\\resumeProjectHeading}[2]{\n    \\item\n    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}\n      \\small#1 & \\textbf{\\small #2}\\\\\n    \\end{tabular*}\\vspace{-7pt}\n}\n\n\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}\n\n\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}\n\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}\n\n\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}\n\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}\n\\newcommand{\\resumeItemListStart}{\\begin{itemize}}\n\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}\n\n%-------------------------------------------\n%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n\\begin{document}\n  "]));
    var texPostamble = String.raw(__makeTemplateObject(["\nend{document}\n  "], ["\n\\end{document}\n  "]));
    var getHeading = function (basics) {
        var output = String.raw(__makeTemplateObject([""], [""]));
        var getLinkedIn = function (profiles) {
            var _a;
            if (profiles.find(function (_a) {
                var network = _a.network;
                return network === 'linkedIn';
            })) {
                return (_a = profiles.find(function (_a) {
                    var network = _a.network, username = _a.username, url = _a.url;
                    return network === 'linkedIn';
                }), network = _a.network, username = _a.username, url = _a.url, _a);
            }
            else {
                return null;
            }
        };
        var getGithub = function (profiles) {
            var _a;
            if (profiles.find(function (_a) {
                var network = _a.network;
                return network === 'gitHub';
            })) {
                return (_a = profiles.find(function (_a) {
                    var network = _a.network, username = _a.username, url = _a.url;
                    return network === 'gitHub';
                }), network = _a.network, username = _a.username, url = _a.url, _a);
            }
            else {
                return null;
            }
        };
        output += String.raw(__makeTemplateObject(["\n%----------HEADING----------\n\begin{center}\n    {Huge scshape ", "} \\ \vspace{1pt}\n    ", "\n    small \raisebox{-0.1height}\n    ", "\n    ", "\n    ", " \n    ", "\n\vspace{-8pt}\nend{center}\n"], ["\n%----------HEADING----------\n\\begin{center}\n    {\\Huge \\scshape ", "} \\\\ \\vspace{1pt}\n    ", "\n    \\small \\raisebox{-0.1\\height}\n    ", "\n    ", "\n    ", " \n    ", "\n\\vspace{-8pt}\n\\end{center}\n"]), basics.name, basics.location.address && String.raw(__makeTemplateObject(["", "\\ \vspace{1pt}"], ["", "\\\\ \\vspace{1pt}"]), basics.location.address), basics.phone !== '' ? String.raw(__makeTemplateObject(["\faPhone ", ""], ["\\faPhone\\ ", ""]), basics.phone) : '', basics.email !== ''
            ? String.raw(__makeTemplateObject(["~ href{mailto:", "}{\raisebox{-0.2height} \faEnvelope \\underline{", "}}"], ["~ \\href{mailto:", "}{\\raisebox{-0.2\\height} \\faEnvelope\\ \\\\underline{", "}}"]), basics.email, basics.email) : '', getLinkedIn(basics.profiles)
            ? String.raw(__makeTemplateObject([" ~ href{", "}{\raisebox{-0.2height}\faLinkedin \\underline{", "}}"], [" ~ \\href{", "}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\\\underline{", "}}"]), getLinkedIn(basics.profiles).url, getLinkedIn(basics.profiles).url) : '', getGithub(basics.profiles)
            ? String.raw(__makeTemplateObject(["~ href{", "{\raisebox{-0.2height}\faGithub \\underline{", "}}"], ["~ \\href{", "{\\raisebox{-0.2\\height}\\faGithub\\ \\\\underline{", "}}"]), getGithub(basics.profiles).url, getGithub(basics.profiles).url) : '');
        return output;
    };
    var getWorkExperiences = function (work) {
        var experienceHeader = String.raw(__makeTemplateObject(["\n  % ----------- EXPERIENCE-----------\nsection{Experience}\n\resumeSubHeadingListStart"], ["\n  % ----------- EXPERIENCE-----------\n\\section{Experience}\n\\resumeSubHeadingListStart"]));
        var getWorkExperience = function (_a) {
            var name = _a.name, position = _a.position, startDate = _a.startDate, endDate = _a.endDate, _b = _a.location, location = _b === void 0 ? '' : _b, highlights = _a.highlights;
            var output = String.raw(__makeTemplateObject([""], [""]));
            output += String.raw(__makeTemplateObject(["\n\resumeSubheading\n{", "} {", "-", "}\n{", "} {", "}\n\resumeItemListStart"], ["\n\\resumeSubheading\n{", "} {", "-", "}\n{", "} {", "}\n\\resumeItemListStart"]), name, startDate, endDate, position, location);
            highlights.forEach(function (highlight) {
                output += String.raw(__makeTemplateObject(["\n\resumeItem{", "} "], ["\n\\resumeItem{", "} "]), highlight);
            });
            output += String.raw(__makeTemplateObject(["\n\resumeItemListEnd"], ["\n\\resumeItemListEnd"]));
            return output;
        };
        var experienceFooter = String.raw(__makeTemplateObject(["\n\resumeSubHeadingListEnd\n\vspace{-16pt}\n\n"], ["\n\\resumeSubHeadingListEnd\n\\vspace{-16pt}\n\n"]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += experienceHeader;
        work.forEach(function (elem) {
            output += getWorkExperience(elem);
        });
        output += experienceFooter;
        return output;
    };
    var getInvolvements = function (volunteer) {
        var involvementHeader = String.raw(__makeTemplateObject(["\n  % ----------- INVOLVEMENT---------------\nsection{Leadership / Extracurricular}\n\resumeSubHeadingListStart"], ["\n  % ----------- INVOLVEMENT---------------\n\\section{Leadership / Extracurricular}\n\\resumeSubHeadingListStart"]));
        var getInvolvement = function (_a) {
            var organization = _a.organization, position = _a.position, startDate = _a.startDate, endDate = _a.endDate, _b = _a.location, location = _b === void 0 ? '' : _b, highlights = _a.highlights;
            return String.raw(__makeTemplateObject(["\n\resumeSubheading{", "} {", "-", "} {", "} {", "}\n\resumeItemListStart\n        ", "\n\resumeItemListEnd"], ["\n\\resumeSubheading{", "} {", "-", "} {", "} {", "}\n\\resumeItemListStart\n        ", "\n\\resumeItemListEnd"]), organization, startDate, endDate, position, location, highlights.reduce(function (prev, curr) {
                return (prev + String.raw(__makeTemplateObject(["\n        \resumeItem{", "}"], ["\n        \\resumeItem{", "}"]), curr));
            }, String.raw(__makeTemplateObject([""], [""]))));
        };
        var involvementFooter = String.raw(__makeTemplateObject(["\n\resumeSubHeadingListEnd\n\n  "], ["\n\\resumeSubHeadingListEnd\n\n  "]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += involvementHeader;
        volunteer.forEach(function (elem) {
            output += getInvolvement(elem);
        });
        output += involvementFooter;
        return output;
    };
    var getEducations = function (education) {
        var educationHeader = String.raw(__makeTemplateObject(["\n  % ----------- EDUCATION-----------\nsection{Education}\n\resumeSubHeadingListStart"], ["\n  % ----------- EDUCATION-----------\n\\section{Education}\n\\resumeSubHeadingListStart"]));
        var educationFooter = String.raw(__makeTemplateObject(["\n\resumeSubHeadingListEnd\n\n  "], ["\n\\resumeSubHeadingListEnd\n\n  "]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += educationHeader;
        education.forEach(function (_a) {
            var institution = _a.institution, area = _a.area, startDate = _a.startDate, endDate = _a.endDate, _b = _a.location, location = _b === void 0 ? '' : _b;
            output += String.raw(__makeTemplateObject(["\n\resumeSubheading\n{", "} {", "-", "}\n{", "} {", "} "], ["\n\\resumeSubheading\n{", "} {", "-", "}\n{", "} {", "} "]), institution, startDate, endDate, area, location);
        });
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
    var getTechnicalSkills = function (skills) {
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += String.raw(__makeTemplateObject(["\n  % ----------- PROGRAMMING SKILLS-----------\nsection{Technical Skills}\n\begin{itemize} [leftmargin = 0.15in, label = {}]\nsmall{\nitem{\n  \textbf{Skills} {: ", "\n } \\\n}\n}\nend{itemize}\n\vspace{-16pt}\n\n"], ["\n  % ----------- PROGRAMMING SKILLS-----------\n\\section{Technical Skills}\n\\begin{itemize} [leftmargin = 0.15in, label = {}]\n\\small{\n\\item{\n  \\textbf{Skills} {: ", "\n } \\\\\n}\n}\n\\end{itemize}\n\\vspace{-16pt}\n\n"]), skills.map(function (_a) {
            var name = _a.name;
            return name;
        }).join(', '));
        return output;
    };
    var getProjects = function (projects) {
        var projectHeader = String.raw(__makeTemplateObject(["\n  % ----------- PROJECTS-----------\nsection{Projects}\n\vspace{-5pt}\n\resumeSubHeadingListStart"], ["\n  % ----------- PROJECTS-----------\n\\section{Projects}\n\\vspace{-5pt}\n\\resumeSubHeadingListStart"]));
        var getProject = function (_a) {
            var name = _a.name, keywords = _a.keywords, startDate = _a.startDate, endDate = _a.endDate, highlights = _a.highlights;
            var output = String.raw(__makeTemplateObject([""], [""]));
            output += String.raw(__makeTemplateObject(["\n\resumeProjectHeading\n{\n\textbf{", "} $ | $ emph{", "\n}\n} {", "-", "}\n\resumeItemListStart"], ["\n\\resumeProjectHeading\n{\n\\textbf{", "} $ | $ \\emph{", "\n}\n} {", "-", "}\n\\resumeItemListStart"]), name, keywords.reduce(function (prev, curr) { return prev + ', ' + curr; }), startDate, endDate);
            highlights.forEach(function (highlight) {
                output += String.raw(__makeTemplateObject(["\n\resumeItem{", "} "], ["\n\\resumeItem{", "} "]), highlight);
            });
            output += String.raw(__makeTemplateObject(["\n\resumeItemListEnd"], ["\n\\resumeItemListEnd"]));
            return output;
        };
        var projectFooter = String.raw(__makeTemplateObject(["\n\resumeSubHeadingListEnd\n\vspace{-15pt}\n\n"], ["\n\\resumeSubHeadingListEnd\n\\vspace{-15pt}\n\n"]));
        var output = String.raw(__makeTemplateObject([""], [""]));
        output += projectHeader;
        projects.forEach(function (elem) {
            output += getProject(elem);
        });
        output += projectFooter;
        return output;
    };
    var generateTex = function (resumeObject) {
        var output = String.raw(__makeTemplateObject([""], [""]));
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
//# sourceMappingURL=template2.js.map