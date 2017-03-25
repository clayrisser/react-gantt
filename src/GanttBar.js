import React, { Component } from 'react';
import _ from 'underscore';
import moment from 'moment';

export default class GanttBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
    let style = {
      bar: {
       marginTop: '0px',
        marginBottom: '0px',
        float: 'left',
        height: '30px'
      }
    }
    let calibration = 0.988;
    let options = this.props.options;
    let row = this.props.row;
    let group = this.props.group;
    let timeline = this.props.timeline;
    let secondsPerPixel = timeline.secondsPerPixel;
    let leftBoundDate = moment(options.leftBound);
    let rightBoundDate = moment(options.rightBound);
    let transitionDates = {};
    _.each(row.transitions, (date, key) => {
      transitionDates[key] = moment(row.transitions[key]);
    });
    let timelineTime = timeline.time;
    let transitionTimes = {};
    _.each(row.transitions, (date, key) => {
      transitionTimes[key] = transitionDates[key].diff(leftBoundDate, 'seconds')
    });
    let timelinePixels = timeline.pixels;
    let transitionPixels = {};
    _.each(row.transitions, (date, key) => {
      transitionPixels[key] = Math.floor((transitionTimes[key] / secondsPerPixel) * calibration);
    });
    let bars = [];
    if (_.keys(row.transitions).length > 0) {
      let i = 0;
      _.each(transitionPixels, (pixels, key) => {
        if (i === 0) {
          bars.push({
              pixels: pixels,
              startDate: transitionDates[key],
              style: {
                marginLeft: transitionPixels[key] + 'px',
                backgroundColor: group.transitions[key].color,
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px'
              }
          });
        } else if (i === _.keys(transitionPixels).length - 1) {
          bars[bars.length - 1].endDate = transitionDates.end;
          bars[bars.length - 1].style.width = (transitionPixels.end - bars[bars.length - 1].pixels) + 'px';
          bars[bars.length - 1].style.borderTopRightRadius = '10px';
          bars[bars.length - 1].style.borderBottomRightRadius = '10px';
        } else {
          let previousBar = bars[i - 1];
          previousBar.endDate = transitionDates[key];
          previousBar.style.width = (pixels - previousBar.pixels) + 'px';
          bars.push({
            pixels: pixels,
            startDate: transitionDates[key],
            style: {
              backgroundColor: group.transitions[key].color
            }
          });
        }
        i++;
      });
    } else {
      bars[0].endDate = transitionDates.end;
      bars[0].style.width = (transitionPixels.end - transitionPixels.end) + 'px';
      bars[0].style.borderTopRightRadius = '10px';
      bars[0].style.borderBottomRightRadius = '10px';
    }
    for(let i = 0; i < bars.length; i++) {
      let bar = bars[i];
      if (bar.startDate.isBefore(leftBoundDate)) {
        bar.style.width = bars[i + 1] ? bars[i + 1].pixels + 'px' : transitionPixels.end + 'px';
        bar.style.marginLeft = '0px';
        bar.style.borderTopLeftRadius = '0px';
        bar.style.borderBottomLeftRadius = '0px';
      }
      if (bar.endDate.isAfter(rightBoundDate)) {
        for(let j = i + 1; j < bars.length; j++) {
          let bar = bars[j];
          bar.style.display = 'none';
        }
        bar.style.width = (timelinePixels - bar.pixels - 4) + 'px';
        bar.style.borderTopRightRadius = '0px';
        bar.style.borderBottomRightRadius = '0px';
      }
    }
    console.log(bars);
    let count = 0;
    let renderedBars = _.map(bars, (bar) => {
      count++;
      return (<div key={count} style={_.assign({}, style.bar, bar.style)} />);
    });
    return(<div>
      {renderedBars}
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
