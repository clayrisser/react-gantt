# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-08-12

### Added

- TypeScript source with published type declarations
- ESM build alongside CommonJS (`exports` map)
- vitest test suite with coverage
- Makefile-based development workflow (`make prepare`, `make build`, `make test`, `make lint`)

### Changed

- react is now a peer dependency (`^18 || ^19`) instead of a direct dependency
- legacy context API replaced with `React.createContext` (required for React 19)
- string refs replaced with `createRef`
- build tooling migrated from babel 6 + parcel 1 to tsup + vite
- linting/formatting migrated from eslint + prettier to oxlint + oxfmt
- CI migrated from Travis to GitLab CI

### Removed

- `timeFormat` prop (was never used)
- `lodash`, `autobind-decorator`, and `prop-types` dependencies

### Fixed

- window `resize` and `mousemove` listeners were never removed (leaked on every
  unmount and on every bar hover)
- timelines shorter than 3 minutes rendered NaN-width ticks (missing `second`
  unit)
- default minute/second formats displayed the month number (`HH:MM`) instead of
  minutes (`HH:mm`)

## [2.1.6] - 2018-06-25

### Added

- prepublish script

### Changed

- package-lock.json

### Fixed

- unmount bug (issue #15)

## [2.1.4] - 2018-05-05

### Changed

- updated popup style (issue #12)

## [2.1.3] - 2018-05-02

### Fixed

- cleanup bug (issue #11)

## [2.1.2] - 2018-05-02

### Changed

- updated dependancies

## [0.0.1] - 2018-04-15

### Added

- initial release
