All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 27/09/2022

### Added

- Tailwind Elements for design
- React PDF for displaying PDFs since embedding causes app to crash

## [0.1.2] - 27/09/2022

### Added

- Github actions workflow to generate versions for macos, linux and windows
- MIT licence
- Export applications to CSV file

### Changed

- Close "new component" modal on submit

## [0.1.3] - 01/10/2022

### Added

- Letter generator with a single template to create simple formal letter
- Option to upload custom letter and CV PDFs instead of document generator

## [0.1.4] - 01/10/2022

### Added 

- Settings page to configure current season. More settings to follow. Perhaps default template.
- Application priority field and events table for events such as application submitted, assessment completed and offer received
- External links in applications open on external browser

### Changed

- Removed delete package-lock.json command in build and release github actions workflows since the existing package-lock.json file works in Debian.
