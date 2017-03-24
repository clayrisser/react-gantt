import React, { Component } from 'react';
import _ from 'underscore';

export default class GanttBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
    return(<div>
      i am the bar
		</div>);
	}
}

/* renderBar(row) {
 *   var difference = moment(this.props.options.leftBound).unix();
 *   var rightBound = moment(this.props.options.rightBound).unix() - difference;
 *   var startDate = moment(row.startDate).unix() - difference;
 *   if (startDate < 0) {
 *     startDate = 0;
 *   } else if (startDate > rightBound) {
 *     startDate = rightBound;
 *   }
 *   var climaxDate = moment(row.climaxDate).unix() - difference;
 *   if (climaxDate < 0) {
 *     climaxDate = 0;
 *   } else if (climaxDate > rightBound) {
 *     climaxDate = rightBound;
 *   }
 *   var endDate = moment(row.endDate).unix() - difference;
 *   if (endDate < 0) {
 *     endDate = 0;
 *   } else if (endDate > rightBound) {
 *     endDate = rightBound;
 *   }
 *   var leftPadWidth = (startDate / rightBound * 100) + '%';
 *   var div1Width = ((climaxDate - startDate) / rightBound * 100) + '%';
 *   var div2Width = ((endDate - climaxDate) / rightBound * 100) + '%';
 *   var rightPadWidth = ((rightBound - endDate) / rightBound * 100) + '%';
 *   var div1BackgroundColor = 'blue';
 *   if (row.beforeClimaxColor) {
 *     div1BackgroundColor = row.beforeClimaxColor;
 *   } else if (this.props.options.beforeClimaxColor) {
 *     div1BackgroundColor = this.props.options.beforeClimaxColor;
 *   }
 *   var div2BackgroundColor = 'red';
 *   if (row.afterClimaxColor) {
 *     div2BackgroundColor = row.afterClimaxColor;
 *   } else if (this.props.options.afterClimaxColor) {
 *     div2BackgroundColor = this.props.options.afterClimaxColor;
 *   }
 *   var bar1 = {
 *     marginTop: '2px',
 *     marginBottom: '2px',
 *     marginLeft: leftPadWidth,
 *     marginRight: '0px',
 *     backgroundColor: div1BackgroundColor,
 *     width: div1Width,
 *     float: 'left',
 *     height: '30px',
 *     borderTopLeftRadius: '10px',
 *     borderBottomLeftRadius: '10px',
 *     boxShadow: '2px 2px 4px #000000'
 *   };
 *   var bar2 = {
 *     marginTop: '2px',
 *     marginBottom: '2px',
 *     marginLeft: '0px',
 *     marginRight: rightPadWidth,
 *     backgroundColor: div2BackgroundColor,
 *     width: div2Width,
 *     float: 'left',
 *     height: '30px',
 *     borderTopRightRadius: '10px',
 *     borderBottomRightRadius: '10px',
 *     boxShadow: '2px 2px 4px #000000'
 *   };
 *   return (
 *     <div>
 *       <div style={bar1} />
 *       <div style={bar2} />
 *     </div>
 *   );
 * }*/
