import React, {Component} from 'react'
import moment from 'moment';
import {render} from 'react-dom'
import ReactGantt from '../../src';

class Demo extends Component {
	render() {
		const leftBound = moment().set({hour: 0, date: 30, month: 5, year: 2016}).toDate();
		const rightBound = moment().set({hour: 0, date: 29, month: 8, year: 2016}).toDate();
		const dateFormat = 'YYYY-MM-DD HH:MM';
		const rows = [
			{
				title: 'Task 1',
				template: 'myTasks',
        steps: [
          moment().set({hour: 0, date: 1, month: 6, year: 2016}).toDate(),
          moment().set({hour: 0, date: 4, month: 8, year: 2016}).toDate(),
				  moment().set({hour: 0, date: 17, month: 8, year: 2016}).toDate()
        ]
			},
			{
				title: 'Task 2',
			  template: 'myTasks',
        steps: [
          moment().set({hour: 0, date: 27, month: 2, year: 2016}).toDate(),
          moment().set({hour: 0, date: 9, month: 7, year: 2016}).toDate(),
				  moment().set({hour: 0, date: 22, month: 7, year: 2016}).toDate()
        ],
				onClick: () => { console.log('the second one was clicked'); }
			},
			{
				title: 'Task 3',
				template: 'myTasks',
        steps: [
          moment().set({hour: 0, date: 12, month: 6, year: 2016}).toDate(),
          moment().set({hour: 0, date: 2, month: 7, year: 2016}).toDate(),
          moment().set({hour: 0, date: 2, month: 8, year: 2016}).toDate(),
				  moment().set({hour: 0, date: 24, month: 9, year: 2016}).toDate()
        ],
				onClick: () => { console.log('the third one was clicked'); }
			}
		];
		const templates = {
      myTasks: {
				title: 'My Tasks',
        steps: [
          {
            name: 'Task Phase One',
            color: 'blue'
          },
          {
            name: 'Task Phase Two',
            color: 'green'
          }
        ]
			}
		};
		return (
			<div>
				<ReactGantt
          templates={templates}
          rows={rows}
          leftBound={leftBound}
          rightBound={rightBound}
          dateFormat={dateFormat}
        />
			</div>
		);
	}
}

render(<Demo/>, document.querySelector('#demo'))
