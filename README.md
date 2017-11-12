# react-gantt
[![npm](https://img.shields.io/npm/dt/express.svg?style=flat-square)](https://www.npmjs.com/package/react-gantt) [![npm](https://img.shields.io/npm/dt/express.svg?style=flat-square)](https://www.npmjs.com/package/react-gantt)

A gantt chart for react

[Live Demo](https://jamrizzi.github.io/react-gantt/)

## Usage

```sh
npm install --save react-gantt
```

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
