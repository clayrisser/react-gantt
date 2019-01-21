# react-gantt

[![npm](https://img.shields.io/npm/v/react-gantt.svg?style=flat-square)](https://www.npmjs.com/package/react-gantt)
[![npm](https://img.shields.io/npm/dt/react-gantt.svg?style=flat-square)](https://www.npmjs.com/package/react-gantt)
[![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-gantt.svg?style=social&label=Stars)](https://github.com/codejamninja/react-gantt)

> Gantt chart react component

Please ★ this repo if you found it useful ★ ★ ★

[Submit](https://github.com/codejamninja/react-gantt/issues/new) your ReactGantt use cases and
I will feature them in the in the [used by](#used-by) section


## Features

* Multiple steps
* Custom styles
* Dynamic bounds

## Demo

See a [demo](https://codejamninja.github.io/react-gantt)


## Installation

```sh
npm install --save react-gantt
```


## Dependencies

* [NodeJS](https://nodejs.org)
* [React](https://reactjs.org)
* [React DOM](https://reactjs.org/docs/react-dom.html)


## Usage

```js
import ReactGantt, { GanttRow } from 'react-gantt';

class Demo extends Component {
  render() {
    return (
      <ReactGantt
        templates={{
          myTasks: {
            title: 'My Tasks',
            steps: [
              {
                name: 'Task Phase One',
                color: '#0099FF'
              },
              {
                name: 'Task Phase Two',
                color: '#FF9900'
              }
            ]
          }
        }}
        leftBound={moment().set({hour: 0, date: 30, month: 5, year: 2016}).toDate()}
        rightBound={moment().set({hour: 0, date: 29, month: 8, year: 2016}).toDate()}
      >
        <GanttRow
          title="Task 1"
          templateName="myTasks"
          steps={[
            moment().set({hour: 0, date: 1, month: 6, year: 2016}).toDate(),
            moment().set({hour: 0, date: 4, month: 8, year: 2016}).toDate(),
            moment().set({hour: 0, date: 17, month: 8, year: 2016}).toDate()
          ]}
        />
        <GanttRow
          title="Task 1"
          templateName="myTasks"
          steps={[
            moment().set({hour: 0, date: 27, month: 2, year: 2016}).toDate(),
            moment().set({hour: 0, date: 9, month: 7, year: 2016}).toDate(),
            moment().set({hour: 0, date: 22, month: 7, year: 2016}).toDate()
          ]}
        />
      </ReactGantt>
    );
  }
}
```

## Props

#### ReactGantt

| Prop Name     | Type      |  Behavior          |
|---------------|-----------|--------------------|
| children      | GanttRow  | Gantt Rows initialized by you|
| dateFormat    | String    | String format to display dates          |
| dayFormat     | String    | Format used when timeline is in 'day' window          |
| debug         | Boolean   | Includes extra detailed outputs to show calculated values          |
| hourFormat    | String    | Format used when timeline is in 'hourly' window |
| leftBound     | Object    | Date representation of the chart 'beginning' (left-most) date |
| minuteFormat  | String    | Format used when timeline is in 'minute' window |
| monthFormat   | String    | Format used when timeline is in 'monthly' window |
| rightBound    | Object    | Date representation of chart's ending (right-most) date |
| secondFormat  | String    | Format used when timeline is in 'seconds' window |
| style         | Object    | CSS object for chart customization |
| templates   | Object      | Object with keys representing potential states and values for state title and style |
| timeFormat  | String      | Is this used? |
| timelineStyle | Object    | Object for styles to be used in timeline component, namely the allowed width between ticks |
| weekFormat  | String      | Format used when timeline is in 'weekly' window |
| yearFormat  | String      | Format used when timeline is in 'yearly' window |

#### GanttTimeline

| Prop Name     | Type      |  Behavior          |
|---------------|-----------|--------------------|
| style         | Object    | Customize the calculated appearance of the timeline. In pixels: tickWidth, paddingLeft, minWidth |
| rows          | Array     | The parent's GanttRows (is this deprecated?) |
| scalingFactor | Number    | Allows customization of the calculated # of ticks |

#### GanttRow

| Prop Name     | Type      |  Behavior          |
|---------------|-----------|--------------------|
| barStyle      | Object    | Style object for gantt bar |
| popupStyle    | Object    | Style object for popup modal |
| markerStyle   | Object    | Style object for cursor |
| steps         | Array     | Array of steps that bar passes through (needs to exceed the templates steps by 1? Why?)                   |
| templateName  | String    | Template name to load style and step titles |
| title         | String    | Title to be displayed alongside bar         |

#### GanttBar
| Prop Name     | Type      |  Behavior          |
|---------------|-----------|--------------------|
| style         | Object    | CSS object for bar styles |
| steps         | Array     | Array of steps that bar passes through (needs to exceed the templates steps by 1? Why?)                   |
| templateName  | String    | Template name to load style and step titles |

#### GanttPopup
| Prop Name     | Type      |  Behavior          |
|---------------|-----------|--------------------|
| style         | Object    | CSS Object for popup style |
| markerTime    | Object    | Time object represnting cursor position on parent GanttBar |
| activeStep    | Object    | Object representing current step cursor is hovering on parent GanttBar |
| title         | String    | Title (same as parent Gantt bar) |
| titleStyle    | Object    | Style for title displayed on pop up |
## Support

Submit an [issue](https://github.com/codejamninja/react-gantt/issues/new)


## Screenshots

![react-gantt](https://user-images.githubusercontent.com/6234038/38774126-a5e7a830-4060-11e8-9e24-400248048105.jpg)


## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/react-gantt/blob/master/CONTRIBUTING.md)


## License

[MIT License](https://github.com/codejamninja/react-gantt/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2018


## Changelog

Review the [changelog](https://github.com/codejamninja/react-gantt/blob/master/CHANGELOG.md)


## Credits

* [Jam Risser](https://codejam.ninja) - Author


## Used By

* [ModernGreek](https://moderngreek.us) - The next generation of fraternity and sorority apparel
* [yerbaBuena](https://github.com/JAER12392/yerbaBuena) - a superpowered approach to electronic medical records
* [TaskCluster](https://github.com/taskcluster/taskcluster-migration-DEPRECATED) - task execution framework that supports Mozilla's continuous integration and release processes


## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
