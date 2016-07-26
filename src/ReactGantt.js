import React, {Component} from 'react';
import moment from 'moment';
import _ from 'underscore';

export default class ReactGantt extends Component {
	constructor() {
		super();
		this.state = {
			hi: 'yo'
		}
	}

	renderRows() {
		var rows = [];
		var relativeDiff = moment(this.props.options.leftBound).unix();
		var leftBound = 0;
		var rightBound = moment(this.props.options.rightBound).unix() - relativeDiff;
		var titleStyle = {
			border: '1px solid black'
		};
		var timelineStyle = {
			border: '1px solid black',
			width: '100%'
		};
		for(var i = 0; i < this.props.rows.length; i++) {
			var rowObject = this.props.rows[i];
			var startDate = moment(rowObject.startDate).unix() - relativeDiff;
			var climaxDate = moment(rowObject.climaxDate).unix() - relativeDiff;
			var endDate = moment(rowObject.endDate).unix() - relativeDiff;
			var leftPadWidth = (startDate / rightBound * 100) + '%';
			var div1Width = ((climaxDate - startDate) / rightBound * 100) + '%';
			var div2Width = ((endDate - climaxDate) / rightBound * 100) + '%';
			var rightPadWidth = ((rightBound - endDate) / rightBound * 100) + '%';
			var bar1 = {
				marginTop: '2px',
				marginBottom: '2px',
				marginLeft: leftPadWidth,
				marginRight: '0px',
				backgroundColor: 'blue',
				width: div1Width,
				float: 'left',
				height: '30px'
			};
			var bar2 = {
				marginTop: '2px',
				marginBottom: '2px',
				marginLeft: '0px',
				marginRight: rightPadWidth,
				backgroundColor: 'red',
				width: div2Width,
				float: 'left',
				height: '30px'
			};
			var row = (
				<tr key={rowObject.title}>
					<td style={titleStyle}>
						{rowObject.title}
					</td>
					<td key={rowObject.title} style={timelineStyle}>
						<div style={bar1}></div>
						<div style={bar2}></div>
					</td>
				</tr>
			);
			rows.push(row);
		}
		console.log(rows);
		return rows;
	}

	render() {
		this.renderRows();
		var tableStyle = {
			border: '1px solid black',
			width: '100%'
		};
		var scaleStyle = {
			width: '100%'
		}
		return (
			<div>
				<table style={tableStyle}>
					<thead>
						<tr>
							<td>Title</td>
							<td style={scaleStyle}>scale</td>
						</tr>
					</thead>
					<tbody>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		);
	}
}
