// Taken from JSON resume schema standard
const schema = {
  basics: {
    name: 'shortText',
    label: 'shortText',
    image: 'shortText',
    email: 'shortText',
    phone: 'shortText',
    url: 'shortText',
    summary: 'longText',
    location: {
      address: 'longText',
      postalCode: 'shortText',
      city: 'shortText',
      countryCode: 'shortText',
      region: 'shortText',
    },
    profiles: [
      {
        network: 'shortText',
        username: 'shortText',
        url: 'shortText',
      },
    ],
  },
  work: [
    {
      name: 'shortText',
      position: 'shortText',
      url: 'shortText',
      startDate: 'date',
      endDate: 'date',
      summary: 'longText',
      highlights: ['longText'],
    },
  ],
  volunteer: [
    {
      organization: 'shortText',
      position: 'shortText',
      url: 'shortText',
      startDate: 'date',
      endDate: 'date',
      summary: 'longText',
      highlights: ['longText'],
    },
  ],
  education: [
    {
      institution: 'shortText',
      url: 'shortText',
      area: 'shortText',
      studyType: 'shortText',
      startDate: 'date',
      endDate: 'date',
      score: 'shortText',
      courses: ['shortText'],
    },
  ],
  awards: [
    {
      title: 'shortText',
      date: 'date',
      awarder: 'shortText',
      summary: 'longText',
    },
  ],
  certificates: [
    {
      name: 'shortText',
      date: 'date',
      issuer: 'shortText',
      url: 'shortText',
    },
  ],
  publications: [
    {
      name: 'shortText',
      publisher: 'shortText',
      releaseDate: 'date',
      url: 'shortText',
      summary: 'shortText',
    },
  ],
  skills: [
    {
      name: 'shortText',
      level: 'shortText',
      keywords: ['shortText'],
    },
  ],
  languages: [
    {
      language: 'shortText',
      fluency: 'shortText',
    },
  ],
  interests: [
    {
      name: 'shortText',
      keywords: ['shortText'],
    },
  ],
  references: [
    {
      name: 'shortText',
      reference: 'longText',
    },
  ],
  projects: [
    {
      name: 'shortText',
      description: 'shortText',
      highlights: ['longText'],
      keywords: ['shortText'],
      startDate: 'date',
      endDate: 'date',
      url: 'shortText',
      roles: ['shortText'],
      entity: 'shortText',
      type: 'shortText',
    },
  ],
};

// const schema = {
//   summary: {
//     text: 'longText',
//   },
//   heading: {
//     name: 'shortText',
//     phone: 'number',
//     address: 'longText',
//     email: 'shortText',
//     linkedIn: 'shortText',
//     gitHub: 'shortText',
//   },
//   education: {
//     institution: 'shortText',
//     date: 'date',
//     course: 'shortText',
//     location: 'shortText',
//   },
//   coursework: {
//     itemArray: 'shortTextArray',
//   },
//   experience: {
//     company: 'shortText',
//     role: 'shortText',
//     date: 'date',
//     location: 'shortText',
//     itemArray: 'shortTextArray',
//   },
//   project: {
//     title: 'shortText',
//     skillArray: 'shortTextArray',
//     date: 'date',
//     itemArray: 'shortTextArray',
//   },
//   technical: {
//     languages: 'shortTextArray',
//     tools: 'shortTextArray',
//     technologies: 'shortTextArray',
//   },
//   involvement: {
//     organisation: 'shortText',
//     date: 'date',
//     role: 'shortText',
//     misc: 'shortText',
//     itemArray: 'shortTextArray',
//   },
// };

export default schema;
