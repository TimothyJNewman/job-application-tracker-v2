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
  String.raw`
\documentclass{letter}
\usepackage{hyperref}
\signature{${senderName}}
\address{${
  senderAddress1 === '' ? String.raw`\quad` : senderAddress1
}${
  senderAddress2 !== '' ? String.raw` \\${senderAddress2}` : ''
}} % Your address

\date{${date === '' ? String.raw`\today` : date}} % Date of the letter
\telephone{98889}

\begin{document}
\begin{letter}{${receiverName === '' ? String.raw`\quad` : receiverName}${
  receiverAddress1 !== '' ? String.raw` \\ ${receiverAddress1}` : ''
}${
  receiverAddress2 !== '' ? String.raw` \\ ${receiverAddress2}` : ''
}} % Addressee name and address
\opening{${salutation === '' ? 'Dear Sir/Mdm' : salutation}}

${content === '' ? String.raw`\quad` : content}

\closing{${closing === '' ? 'Sincerely' : closing}}

% \ps

% P.S. You can find the full text of GFDL license at
% \url{http://www.gnu.org/copyleft/fdl.html}.

${attached !== '' ? String.raw`\encl{${attached}}` : ''} % Attached documents

\end{letter}
\end{document}`

module.exports = {getLetterLatex};