var React = require('react');
var ReactDOM = require('react-dom');
var ReactGantt = require('react-gantt');
var moment = require('moment');

var App = React.createClass({
	render () {
		var rows = [
			{
				title: 'blah blah shirt',
				startDate: moment().set({date: 15, month: 8, year: 2016}).toDate(),
				climaxDate: moment().set({date: 20, month: 8, year: 2016}).toDate(),
				endDate: moment().set({date: 28, month: 8, year: 2016}).toDate(),
				group: 'popsicle'
			},
			{
				title: 'shoes',
				startDate: moment().set({date: 8, month: 8, year: 2016}).toDate(),
				climaxDate: moment().set({date: 13, month: 8, year: 2016}).toDate(),
				endDate: moment().set({date: 19, month: 8, year: 2016}).toDate(),
				group: 'popsicle'
			}
		];
		var options = {
			leftBound: moment().set({date: 1, month: 8, year: 2016}).toDate(),
			rightBound: moment().set({date: 30, month: 8, year: 2016}).toDate()
		};
		var groups = [
			{
				id: 'popsicle',
				title: 'Popsicle',
				color: 'blue'
			}
		];
		return (
			<div>
				<ReactGantt options={options} groups={groups} rows={rows} />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
