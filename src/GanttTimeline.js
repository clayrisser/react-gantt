import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttTimeline extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    scalingFactor: PropTypes.number
  };

  static defaultProps = {
    scalingFactor: 1.0
  }
  
  static contextTypes = {
    dateFormat: PropTypes.string.isRequired,
    timeFormat: PropTypes.string,
    secondFormat: PropTypes.string,
    hourFormat: PropTypes.string,
    dayFormat: PropTypes.string,
    weekFormat: PropTypes.string,
    monthFormat: PropTypes.string,
    yearFormat: PropTypes.string,
    debug: PropTypes.bool.isRequired,
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    timelineWidth: PropTypes.number.isRequired
  };

  getTick(unit, timelineDuration) {
    const { style, scalingFactor } = this.props;
    const { leftBound, rightBound, timelineWidth } = this.context;
    if (!unit) {
      timelineDuration = moment(rightBound).diff(moment(leftBound), 'seconds');
      unit = this.getTimespanUnit(timelineDuration);
    }
    const tickCount = Math.ceil(timelineDuration / this.units[unit]) * scalingFactor;
    const maxTicks = Math.ceil(timelineWidth / parseInt(style.minWidth, 10));
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

  getTimeFormat(unit) {
    switch (unit) {
      case 'second':
        return this.context.secondFormat;
      case 'minute':
        return this.context.minuteFormat;
      case 'hour':
        return this.context.hourFormat;
      case 'day':
        return this.context.dayFormat;
      case 'week':
        return this.context.weekFormat;
      case 'month':
        return this.context.monthFormat;
      case 'year':
        return this.context.yearFormat;
    }
    return null;
  }

  units = {
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2628000,
    year: 31535965.4396976
  };

  durationToWidth(duration) {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const { scalingFactor } = this.props;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage / scalingFactor;
  }

  widthToDuration(width) {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const pixelPerSecond = timelineDuration / timelineWidth;
    return pixelPerSecond * width;
  }

  debugRender() {
    const { leftBound, rightBound, dateFormat, timelineWidth } = this.context;
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
        <div>{this.defaultRender()}</div>
      </div>
    );
  }

  defaultRender() {
    const style = _.clone(this.props.style);
    const tick = this.getTick();
    const tickWidth = _.clone(parseInt(style.tickWidth, 10)) || 2;
    const paddingLeft = _.clone(parseInt(style.paddingLeft, 10)) || 4;
    delete style.paddingLeft;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        {_.map(_.range(tick.count), index => {
          return (
            <div
              key={`tick${index}`}
              style={{
                ...style,
                height: '20px',
                borderLeft: `${tickWidth}px solid black`,
                width: `${tick.width - paddingLeft - tickWidth}px`,
                float: 'left',
                margin: '0px',
                padding: '0px',
                textAlign: 'left',
                paddingLeft: `${paddingLeft}px`
              }}
            >
              {this.renderTickLabel(tick, index)}
            </div>
          );
        })}
      </div>
    );
  }

  renderTickLabel(tick, index) {
    const { leftBound } = this.context;
    const tickTime = moment(leftBound).add(
      this.widthToDuration(tick.width) * index,
      'seconds'
    );
    const format = this.getTimeFormat(tick.unit);
    return tickTime.format(format);
  }

  render() {
    if (this.context.debug) return this.debugRender();
    return this.defaultRender();
  }
}
