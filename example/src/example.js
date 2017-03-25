import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactGantt from 'react-gantt';
import moment from 'moment';

class App extends Component {

	render() {
		var options = {
			leftBound: moment().set({hour: 0, date: 1, month: 6, year: 2016}).toDate(),
			rightBound: moment().set({hour: 0, date: 29, month: 8, year: 2016}).toDate(),
			labelWidth: '120px',
			bootstrapped: true,
			intervalWidth: 150,
			showBorders: true,
			intervalFormat: 'YYYY MM DD'
		};
		var rows = [
			{
				title: 'Task 1',
        transitions: {
          start: moment().set({hour: 0, date: 9, month: 7, year: 2016}).toDate(),
          climax: moment().set({hour: 0, date: 4, month: 8, year: 2016}).toDate(),
				  end: moment().set({hour: 0, date: 17, month: 8, year: 2016}).toDate()
        },
				group: 'myTasks',
				onClick: () => {console.log('the first one was clicked');}
			},
			{
				title: 'Task 2',
        transitions: {
          start: moment().set({hour: 0, date: 27, month: 2, year: 2016}).toDate(),
          climax: moment().set({hour: 0, date: 9, month: 7, year: 2016}).toDate(),
				  end: moment().set({hour: 0, date: 22, month: 7, year: 2016}).toDate()
        },
				group: 'myTasks',
				onClick: () => {console.log('the second one was clicked');}
			},
			{
				title: 'Task 3',
        transitions: {
          start: moment().set({hour: 0, date: 12, month: 6, year: 2016}).toDate(),
          climax: moment().set({hour: 0, date: 2, month: 7, year: 2016}).toDate(),
          wow: moment().set({hour: 0, date: 2, month: 8, year: 2016}).toDate(),
				  end: moment().set({hour: 0, date: 24, month: 8, year: 2016}).toDate()
        },
				group: 'myTasks',
				onClick: () => {console.log('the third one was clicked');}
			}
		];
		var groups = {
      myTasks: {
				title: 'My Tasks',
        transitions: {
          start: {
            name: 'Start',
            color: 'blue',
          },
          climax: {
            name: 'Climax',
            color: 'green'
          },
          wow: {
            name: 'Wow',
            color: 'red'
          },
          end: {
            name: 'End'
          }
        }
			}
		};

		return (
			<div>
				<ReactGantt options={options} groups={groups} rows={rows} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
