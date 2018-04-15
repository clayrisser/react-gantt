# react-gantt

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-gantt.svg?style=social&label=Stars)](https://github.com/codejamninja/react-gantt)

> Gantt chart react component

Please ★ this repo if you found it useful ★ ★ ★


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


## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
