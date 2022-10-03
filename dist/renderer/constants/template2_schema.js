"use strict";
exports.__esModule = true;
// Taken from JSON resume schema standard
var schema = {
    basics: {
        name: 'shortText',
        label: 'unavailable',
        image: 'unavailable',
        email: 'shortText',
        phone: 'shortText',
        url: 'shortText',
        summary: 'unavailable',
        location: {
            address: 'longText',
            postalCode: 'unavailable',
            city: 'unavailable',
            countryCode: 'unavailable',
            region: 'unavailable'
        },
        profiles: [
            {
                network: 'shortText',
                username: 'unavailable',
                url: 'shortText'
            },
        ]
    },
    work: [
        {
            name: 'shortText',
            position: 'shortText',
            url: 'unavailable',
            startDate: 'date',
            endDate: 'date',
            summary: 'unavailable',
            highlights: ['longText']
        },
    ],
    volunteer: [
        {
            organization: 'shortText',
            position: 'shortText',
            url: 'unavailable',
            startDate: 'date',
            endDate: 'date',
            summary: 'unavailable',
            highlights: ['longText']
        },
    ],
    education: [
        {
            institution: 'shortText',
            url: 'unavailable',
            area: 'shortText',
            studyType: 'unavailable',
            startDate: 'date',
            endDate: 'date',
            score: 'unavailable',
            courses: ['shortText']
        },
    ],
    awards: 'unavailable',
    certificates: 'unavailable',
    publications: 'unavailable',
    skills: [
        {
            name: 'shortText',
            level: 'unavailable',
            keywords: 'unavailable'
        },
    ],
    languages: 'unavailable',
    interests: 'unavailable',
    references: 'unavailable',
    projects: [
        {
            name: 'shortText',
            description: 'unavailable',
            highlights: ['longText'],
            keywords: ['shortText'],
            startDate: 'date',
            endDate: 'date',
            url: 'unavailable',
            roles: 'unavailable',
            entity: 'unavailable',
            type: 'unavailable'
        },
    ]
};
exports["default"] = schema;
//# sourceMappingURL=template2_schema.js.map