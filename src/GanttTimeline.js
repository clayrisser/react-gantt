import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

export default class GanttTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.timeline = null;
    this.timelinePixelsReady = false;
    this.onTimelinePixelsReadyFired = false;
    this.timelineReady = false;
    this.onTimelineReadyFired = false;
    this.onSetTimelineFired = false;
  }

  componentDidUpdate() {
    if (this.timelinePixelsReady && !this.onTimelinePixelsReadyFired) {
      this.props.onTimelinePixelsReady()
      this.onTimelinePixelsReadyFired = true;
      this.timelinePixelsReady = false;
    }
    if (this.timelineReady && !this.onTimelineReadyFired) {
      this.props.onTimelineReady();
      this.onTimelineReadyFired = true;
      this.timelineReady = false;
    }
    if (this.setTimelineReady && !this.onSetTimelineFired) {
      this.props.setTimeline(this.timeline);
      this.onSetTimelineFired = true;
      this.setTimelineReady = false;
      this.timelineReady = true;
    }
  }

  renderMarks() {
    let style = {
      td: {
        borderLeft: '2px solid black'
      }
    };
    let marks = [];
    let options = this.props.options;
    let leftBoundDate = moment(options.leftBound);
    let rightBoundDate = moment(options.rightBound);
    let leftBoundTime = 0;
    let rightBoundTime = rightBoundDate.diff(leftBoundDate, 'seconds');
    let leftBoundPixels = 0;
    let rightBoundPixels = this.props.timelinePixels;
    let secondsPerPixel = rightBoundTime / rightBoundPixels;
    let timespan = this.getTimespan(leftBoundDate, rightBoundDate, options.intervalWidth, rightBoundPixels);
    let adjustedDate = this.roundDate(leftBoundDate, timespan.type);
    let leftoverTime = adjustedDate.diff(leftBoundDate, 'seconds');
    let leftoverPixels = leftoverTime / secondsPerPixel;
    marks.push(<td key={-1} style={{width: leftoverPixels + 'px'}}></td>);
    for(let i = 0; i < timespan.markersCount; i++) {
      let label = '';
      let date = moment(adjustedDate);
      switch (timespan.type) {
        case 'years':
          date.add(i * timespan.interval, 'years');
          label = date.format('YYYY MM DD');
          break;
        case 'months':
          date.add(i * timespan.interval, 'months');
          label = date.format('YYYY MM DD');
          break;
        case 'days':
          date.add(i * timespan.interval, 'days');
          label = date.format('YYYY MM DD');
          break;
        case 'hours':
          date.add(i * timespan.interval, 'hours');
          label = date.format('H:mm');
          break;
        case 'minutes':
          date.add(i * timespan.interval, 'minutes');
          label = date.format('H:mm:ss');
          break;
      }
      marks.push(<td key={i} style={style.td}>
        {label}
      </td>);
    }
    this.timeline = {
      pixels: rightBoundPixels,
      time: rightBoundTime,
      secondsPerPixel: secondsPerPixel
    };
    return marks;
  }

  render() {
    if (!this.props.timelinePixels)  {
      this.timelinePixelsReady = true;
      return(<div></div>);
    }
    let style = {
      table: {
        width: '100%',
        height: '20px'
      },
      tr: {
        padding: '0px',
        margin: '0px'
      }
    };
    this.setTimelineReady = true;
    return(<div>
      <table style={style.table}>
        <tbody>
          <tr style={style.tr}>
            {this.renderMarks()}
          </tr>
        </tbody>
      </table>
    </div>);
  }

  getTimespan(leftBound, rightBound, intervalWidth, timelinePixels) {
    let timespan = {
      value: rightBound.diff(leftBound, 'years'),
      type: 'years'
    }
    if (timespan.value < 2) { // years
      timespan = {
        value: rightBound.diff(leftBound, 'months'),
        type: 'months'
      }
      if (timespan.value < 6) { // months
        timespan = {
          value: rightBound.diff(leftBound, 'days'),
          type: 'days'
        }
        if (timespan.value < 2) { // days
          timespan = {
            value: rightBound.diff(leftBound, 'hours'),
            type: 'hours'
          }
        }
        if (timespan.value < 1) { // hours
          timespan = {
            value: rightBound.diff(leftBound, 'minutes'),
            type: 'minutes'
          }
        }
      }
    }
    timespan.markersCount = Math.round(timelinePixels / intervalWidth);
    if (timespan.value < timespan.markersCount) timespan.markersCount = timespan.value;
    timespan.interval = Math.round(timespan.value / timespan.markersCount);
    if (timespan.interval === 0) timespan.interval = 1;
    return timespan;
  }

  roundDate(date, type) {
    switch(type) {
      case 'year':
        return moment().year(date.year() + (date.month() > 0 ? 1 : 0)).month('01').date('01');
      case 'month':
        return moment().year(date.year()).month(date.month() + (date.date() > 0 ? 1 : 0)).date('01');
      case 'days':
        return moment().year(date.year()).month(date.month()).date(date.date() + (date.hour() > 0 ? 1 : 0));
    }
  }

  onResize() {
    this.onTimelinePixelsReadyFired = false;
    this.onTimelineReadyFired = false;
    this.onSetTimelineFired = false;
  }
}

GanttTimeline.propTypes = {
  onTimelinePixelsReady: React.PropTypes.func,
  onTimelineReady: React.PropTypes.func,
  options: React.PropTypes.object,
  setTimeline: React.PropTypes.func,
  timelinePixels: React.PropTypes.number
};

GanttTimeline.defaultProps = {
  onTimelinePixelsReady: function(){},
  onTimelineReady: function(){},
  options: {},
  setTimeline: function(){},
  timelinePixels: 0
}
