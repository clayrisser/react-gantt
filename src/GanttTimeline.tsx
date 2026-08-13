import moment from 'moment';
import { Component } from 'react';
import type { CSSProperties, ContextType } from 'react';
import { GanttContext } from './context';

export interface GanttTimelineStyle extends CSSProperties {
  tickWidth?: number | string;
}

export interface GanttTimelineProps {
  style: GanttTimelineStyle;
}

interface Tick {
  width: number;
  unit: string;
  count: number;
}

const units: Record<string, number> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2628000,
  year: 31535965.4396976,
};

export default class GanttTimeline extends Component<GanttTimelineProps> {
  static contextType = GanttContext;
  declare context: ContextType<typeof GanttContext>;

  getTick(unit?: string, timelineDuration?: number): Tick {
    const { style } = this.props;
    const { leftBound, rightBound, timelineWidth } = this.context;
    if (!unit || timelineDuration === undefined) {
      timelineDuration = moment(rightBound).diff(moment(leftBound), 'seconds');
      unit = this.getTimespanUnit(timelineDuration);
    }
    const tickCount = Math.ceil(timelineDuration / units[unit]);
    const maxTicks = Math.ceil(timelineWidth / parseInt(`${style.minWidth}`, 10));
    if (tickCount > maxTicks) {
      const unitKeys = Object.keys(units);
      const nextUnitIndex = unitKeys.indexOf(unit) + 1;
      if (unitKeys.length > nextUnitIndex) {
        return this.getTick(unitKeys[nextUnitIndex], timelineDuration);
      }
    }
    return {
      width: this.durationToWidth(units[unit]),
      unit,
      count: tickCount,
    };
  }

  getTimespanUnit(duration: number): string {
    if (duration / units.year >= 3) return 'year';
    if (duration / units.month >= 3) return 'month';
    if (duration / units.week >= 3) return 'week';
    if (duration / units.day >= 3) return 'day';
    if (duration / units.hour >= 3) return 'hour';
    if (duration / units.minute >= 3) return 'minute';
    return 'second';
  }

  getTimeFormat(unit: string): string | undefined {
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
    return undefined;
  }

  durationToWidth(duration: number): number {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage;
  }

  widthToDuration(width: number): number {
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
    const { tickWidth: rawTickWidth, paddingLeft: rawPaddingLeft, ...style } = this.props.style;
    const tick = this.getTick();
    const tickWidth = parseInt(`${rawTickWidth}`, 10) || 2;
    const paddingLeft = parseInt(`${rawPaddingLeft}`, 10) || 4;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {Array.from({ length: tick.count }, (_, index) => (
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
              paddingLeft: `${paddingLeft}px`,
            }}
          >
            {this.renderTickLabel(tick, index)}
          </div>
        ))}
      </div>
    );
  }

  renderTickLabel(tick: Tick, index: number) {
    const { leftBound } = this.context;
    const tickTime = moment(leftBound).add(this.widthToDuration(tick.width) * index, 'seconds');
    return tickTime.format(this.getTimeFormat(tick.unit));
  }

  render() {
    if (this.context.debug) return this.debugRender();
    return this.defaultRender();
  }
}
