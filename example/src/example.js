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
				startDate: moment().set({hour: 0, date: 16, month: 8, year: 2016}).toDate(),
				climaxDate: moment().set({hour: 0, date: 20, month: 8, year: 2016}).toDate(),
				endDate: moment().set({hour: 0, date: 28, month: 8, year: 2016}).toDate(),
				group: 'myTasks',
				onClick: () => {console.log('the first one was clicked');}
			},
			{
				title: 'Task 2',
				startDate: moment().set({hour: 0, date: 11, month: 8, year: 2016}).toDate(),
				climaxDate: moment().set({hour: 0, date: 13, month: 8, year: 2016}).toDate(),
				endDate: moment().set({hour: 0, date: 19, month: 8, year: 2016}).toDate(),
				group: 'myTasks',
				onClick: () => {console.log('the second one was clicked');}
			}
		];
		var groups = [
			{
				id: 'myTasks',
				title: 'My Tasks'
			}
		];

		return (
			<div>
				<ReactGantt options={options} groups={groups} rows={rows} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
