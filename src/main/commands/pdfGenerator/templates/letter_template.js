const getLetterLatex = ({
  content,
  salutation,
  date,
  closing,
  receiverName,
  senderName,
  receiverAddress1,
  receiverAddress2,
  senderAddress1,
  senderAddress2,
  attached,
}) =>
  String.raw`%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Elmueller Formal Letter
% LaTeX Template
% Version 1.3 (20/11/16)
%
% This template has been downloaded from:
% http://www.LaTeXTemplates.com
%
% Original author:
% Micha Elmueller (http://micha.elmueller.net/) with modifications by 
% Vel (vel@LaTeXTemplates.com)
%
% License:
% CC BY-NC-SA 3.0 (http://creativecommons.org/licenses/by-nc-sa/3.0/)
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%----------------------------------------------------------------------------------------
%	DOCUMENT CONFIGURATIONS
%----------------------------------------------------------------------------------------

\documentclass[
	pagenumber=false, % Removes page numbers from page 2 onwards when false
	parskip=half, % Separates paragraphs with some whitespace, use parskip=full for more space or comment out to return to default
	fromalign=right, % Aligns the from address to the right
	foldmarks=true, % Prints small fold marks on the left of the page
	addrfield=false % Set to false to hide the addressee section - you will then want to adjust the height of the body of the letter on the page by adding the following in this section: \makeatletter \@setplength{refvpos}{\useplength{toaddrvpos}} \makeatletter
	]{scrlttr2}

\usepackage[T1]{fontenc} % For extra glyphs (accents, etc)
\usepackage{stix} % Use the Stix font by default

\usepackage[english]{babel} % Explicitly load the babel package to stop an error occurring on some LaTeX installations

\renewcommand*{\raggedsignature}{\raggedright} % Stop the signature from indenting

%----------------------------------------------------------------------------------------
%	YOUR INFORMATION AND LETTER DATE
%----------------------------------------------------------------------------------------

\setkomavar{fromname}{${
    senderName === '' ? String.raw`\quad` : senderName
  }} % Your name used in the from address

\setkomavar{fromaddress}{${
    senderAddress1 === '' ? String.raw`\quad` : senderAddress1
  }${
    senderAddress2 !== '' ? String.raw` \\${senderAddress2}` : ''
  }} % Your address

\setkomavar{signature}{${
    senderName === '' ? String.raw`\quad` : senderName
  }} % Your name used in the signature

\date{${date === '' ? String.raw`\today` : date}} % Date of the letter

%----------------------------------------------------------------------------------------
 
\begin{document}

%----------------------------------------------------------------------------------------
%	ADDRESSEE
%----------------------------------------------------------------------------------------
 
\begin{letter}{${receiverName === '' ? String.raw`\quad` : receiverName}${
    receiverAddress1 !== '' ? String.raw` \\ ${receiverAddress1}` : ''
  }${
    receiverAddress2 !== '' ? String.raw` \\ ${receiverAddress2}` : ''
  }} % Addressee name and address

%----------------------------------------------------------------------------------------
%	LETTER CONTENT
%----------------------------------------------------------------------------------------

\opening{${salutation === '' ? 'Dear Sir/Mdm' : salutation}}

${content === '' ? String.raw`\quad` : content}

\closing{${closing === '' ? 'Sincerely' : closing}}

\setkomavar*{enclseparator}{Attached} % Change the default "encl:" to "Attached:"
${attached !== '' ? String.raw`\encl{${attached}}` : ''} % Attached documents

%----------------------------------------------------------------------------------------

\end{letter}
 
\end{document}
`;

module.exports = getLetterLatex;
