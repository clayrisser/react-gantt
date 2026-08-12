# react-gantt

[![npm](https://img.shields.io/npm/v/react-gantt.svg?style=flat-square)](https://www.npmjs.com/package/react-gantt)
[![npm](https://img.shields.io/npm/dt/react-gantt.svg?style=flat-square)](https://www.npmjs.com/package/react-gantt)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

> Gantt chart react component

![](assets/react-gantt.png)

## Features

- Multiple steps
- Custom styles
- Dynamic bounds
- TypeScript types included
- Works with React 18 and 19

## Installation

```sh
pnpm add react-gantt
```

## Usage

```tsx
import ReactGantt, { GanttRow } from 'react-gantt';

function Demo() {
  return (
    <ReactGantt
      templates={{
        myTasks: {
          title: 'My Tasks',
          steps: [
            {
              name: 'Task Phase One',
              color: '#0099FF',
            },
            {
              name: 'Task Phase Two',
              color: '#FF9900',
            },
          ],
        },
      }}
      leftBound={new Date(2016, 5, 30)}
      rightBound={new Date(2016, 8, 29)}
    >
      <GanttRow
        title="Task 1"
        templateName="myTasks"
        steps={[new Date(2016, 6, 1), new Date(2016, 8, 4), new Date(2016, 8, 17)]}
      />
      <GanttRow
        title="Task 2"
        templateName="myTasks"
        steps={[new Date(2016, 2, 27), new Date(2016, 7, 9), new Date(2016, 7, 22)]}
      />
    </ReactGantt>
  );
}
```

Each row's `steps` array holds the boundary times of the template's steps, so
it needs exactly one more entry than the template has steps (start of the
first step, each boundary between steps, end of the last step).

## Props

#### ReactGantt

| Prop Name     | Type     | Behavior                                                                                                               |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| children      | GanttRow | Gantt rows initialized by you                                                                                          |
| dateFormat    | String   | Format to display dates (popup and debug output)                                                                       |
| dayFormat     | String   | Format used when timeline is in 'day' window                                                                           |
| debug         | Boolean  | Includes extra detailed outputs to show calculated values                                                              |
| hourFormat    | String   | Format used when timeline is in 'hour' window                                                                          |
| leftBound     | Date     | Date of the chart's beginning (left-most) bound                                                                        |
| minuteFormat  | String   | Format used when timeline is in 'minute' window                                                                        |
| monthFormat   | String   | Format used when timeline is in 'month' window                                                                         |
| rightBound    | Date     | Date of the chart's ending (right-most) bound                                                                          |
| secondFormat  | String   | Format used when timeline is in 'second' window                                                                        |
| style         | Object   | CSS object for chart customization                                                                                     |
| templates     | Object   | Object with keys representing template names and values holding the steps                                              |
| timelineStyle | Object   | Styles used by the timeline, namely the allowed width between ticks (`minWidth`, `tickWidth`, `paddingLeft` in pixels) |
| weekFormat    | String   | Format used when timeline is in 'week' window                                                                          |
| yearFormat    | String   | Format used when timeline is in 'year' window                                                                          |

#### GanttRow

| Prop Name    | Type   | Behavior                                                 |
| ------------ | ------ | -------------------------------------------------------- |
| barStyle     | Object | Style object for gantt bar                               |
| popupStyle   | Object | Style object for popup modal                             |
| markerStyle  | Object | Style object for cursor                                  |
| steps        | Date[] | Step boundary times (one more entry than template steps) |
| templateName | String | Template name to load style and step titles              |
| title        | String | Title to be displayed alongside bar                      |
| description  | String | Description displayed in the popup                       |

## Development

```sh
make prepare   # one-time setup (asdf toolchain + pnpm install)
make build     # build the library to lib/
make test      # run tests with coverage
make lint      # oxlint + oxfmt --check + tsc --noEmit
make format    # format with oxfmt
pnpm start     # run the demo dev server on port 8888
```

## Support

Submit an [issue](https://gitlab.com/bitspur/misc/react-gantt/-/issues)

## Contributing

Review the [guidelines for contributing](CONTRIBUTING.md)

## License

[MIT License](LICENSE)

[Clay Risser](https://clayrisser.com) © 2018-2026

## Credits

- [Clay Risser](https://clayrisser.com) - Author

## Changelog

Review the [changelog](CHANGELOG.md)

## Used By

- [ModernGreek](https://moderngreek.us) - The next generation of fraternity and sorority apparel
- [yerbaBuena](https://github.com/JAER12392/yerbaBuena) - a superpowered approach to electronic medical records
- [TaskCluster](https://github.com/taskcluster/taskcluster-migration-DEPRECATED) - task execution framework that supports Mozilla's continuous integration and release processes
