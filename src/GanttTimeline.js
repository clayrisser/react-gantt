import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttTimeline extends Component {
  static propTypes = {
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    dateFormat: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    minTickPadding: PropTypes.number.isRequired,
    debug: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired
  };

  units = {
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2628000,
    year: 31535965.4396976
  }

  render() {
    if (this.props.debug) return this.debugRender();
    return this.regularRender();
  }

  debugRender() {
    const { leftBound, rightBound, dateFormat, timelineWidth } = this.props;
    const tick = this.getTick();
    return (
      <div>
        <div>
          Timeline Width: {timelineWidth}
          <br />
          Left Bound: {moment(leftBound).format(dateFormat)}
          <br />
          Right Bound: {moment(rightBound).format(dateFormat)}
          <br />
          Tick Unit: {tick.unit}
          <br />
          Tick Width: {tick.width}
          <br />
          Tick Count: {tick.count}
        </div>
        <div>
          {this.regularRender()}
        </div>
      </div>
    );
  }

  regularRender() {
    const style = _.clone(this.props.style);
    const tick = this.getTick();
    const tickWidth = _.clone(parseInt(style.tickWidth)) || 2;
    const paddingLeft = _.clone(parseInt(style.paddingLeft)) || 4;
    delete style.paddingLeft;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start'
      }}>
        {_.map(_.range(tick.count), (index) => {
           return (
             <div key={`tick${index}`} style={{
               ...style,
               height: '20px',
               borderLeft: `${tickWidth}px solid black`,
               width: `${tick.width - paddingLeft - tickWidth}px`,
               float: 'left',
               margin: '0px',
               padding: '0px',
               textAlign: 'left',
               paddingLeft: `${paddingLeft}px`
             }}>
               {index + 1} {tick.unit}
             </div>
           );
        })}
      </div>
    );
  }

  getTick(unit, timelineDuration) {
    if (!unit) {
      const { leftBound, rightBound } = this.props;
      timelineDuration = moment(rightBound).diff(moment(leftBound), 'seconds');
      unit = this.getTimespanUnit(timelineDuration)
    }
    const { timelineWidth, minTickPadding } = this.props;
    let tickCount = Math.ceil(timelineDuration / this.units[unit]);
    const maxTicks = Math.ceil(timelineWidth / minTickPadding);
    if (tickCount > maxTicks) {
      const unitKeys = _.keys(this.units);
      const nextUnitIndex = unitKeys.indexOf(unit) + 1;
      if (unitKeys.length > nextUnitIndex) {
        unit = unitKeys[nextUnitIndex];
        return this.getTick(unit, timelineDuration);
      }
    }
    return {
      width: this.durationToWidth(this.units[unit]),
      unit,
      count: tickCount
    };
  }

  getTimespanUnit(duration) {
    if (duration / this.units.year >= 3) return 'year';
    if (duration / this.units.month >= 3) return 'month';
    if (duration / this.units.week >= 3) return 'week';
    if (duration / this.units.day >= 3) return 'day';
    if (duration / this.units.hour >= 3) return 'hour';
    if (duration / this.units.minute >= 3) return 'minute';
    return 'second';
  }

  durationToWidth(duration) {
    const { leftBound, rightBound, timelineWidth } = this.props;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage;
  }
}
