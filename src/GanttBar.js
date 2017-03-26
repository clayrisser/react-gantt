import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

export default class GanttBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
    if (!this.props.timeline) return(<div></div>);
    let style = {
      bar: {
       marginTop: '0px',
        marginBottom: '0px',
        float: 'left',
        height: '30px'
      }
    }
    let calibration = 0.987;
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
      if (bar.startDate.isBefore(leftBoundDate) && bar.endDate.isAfter(rightBoundDate)) {
        for(let j = i + 1; j < bars.length; j++) {
          let bar = bars[j];
          bar.style.display = 'none';
        }
        bar.style.width = timelinePixels + 'px';
        bar.style.marginLeft = '0px';
        bar.style.borderTopLeftRadius = '0px';
        bar.style.borderBottomLeftRadius = '0px';
        bar.style.borderTopRightRadius = '0px';
        bar.style.borderBottomRightRadius = '0px';
        break;
      }
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

GanttBar.propTypes = {
  group: React.PropTypes.object,
  options: React.PropTypes.object,
  row: React.PropTypes.object,
  timeline: React.PropTypes.object
};

GanttBar.defaultProps = {
  group: {},
  options: {},
  row: {},
  timeline: {}
};
