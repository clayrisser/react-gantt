import React, {Component} from 'react';
import moment from 'moment';
import _ from 'underscore';
import Table from 'react-bootstrap/lib/Table';
import {WindowResizeListener} from 'react-window-resize-listener';
import GanttRow from './GanttRow';

export default class ReactGantt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.renderedTimeline = (<div></div>);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate();
    });
    this.forceUpdate();
  }

  componentWillUpdate() {
    this.renderedTimeline = this.renderTimeline();
  }

  getMarkersCount(timespan, minIntervalWidth, timelineWidth) {
    let markersCount = Math.round(timelineWidth / minIntervalWidth);
    if (timespan.value < markersCount) markersCount = timespan.value;
    return markersCount;
  }

  renderTimeline() {
    let style = {
      marks: {
        table: {
          width: '100%',
          height: '20px'
        },
        tr: {
          padding: '0px',
          margin: '0px'
        },
        td: {
          borderLeft: '2px solid black'
        }
      }
    };
    let options = this.props.options;
    let leftBound = moment(options.leftBound);
    let rightBound = moment(options.rightBound);
    let timespan = this.getTimespan(leftBound, rightBound);
    let minIntervalWidth = 160;
    let timelineWidth = this.refs.timeline.offsetWidth;
    let markersCount = this.getMarkersCount(timespan, minIntervalWidth, timelineWidth);
    let marks = [];
    let label = '';
    let adjustedDate = this.roundDate(leftBound, timespan.type);
    let leftoverTime = adjustedDate.diff(leftBound, 'seconds');
    let timelineTime = rightBound.diff(leftBound, 'seconds');
    let secondsPerPixel = timelineTime / timelineWidth;
    let leftoverWidth = leftoverTime / secondsPerPixel;
    marks.push(<td key={-1} style={{width: leftoverWidth + 'px'}}></td>);
    for(let i = 0; i < markersCount; i++) {
      let date = _.clone(adjustedDate);
      switch (timespan.type) {
        case 'years':
          date.add(i * timespan.value, 'years');
          label = date.format('YYYY MM DD');
          break;
        case 'months':
          date.add(i * timespan.value, 'months');
          label = date.format('YYYY MM DD');
          break;
        case 'days':
          date.add(i * timespan.value, 'days');
          label = date.format('YYYY MM DD');
          break;
        case 'hours':
          date.add(i * timespan.value, 'hours');
          label = date.format('H:mm');
        case 'minutes':
          date.add(i * timespan.value, 'minutes');
          label = date.format('H:mm:ss');
      }
      marks.push(<td key={i} style={style.marks.td}>
        {label}
      </td>);
    }
    return(<div>
      <table style={style.marks.table}>
        <tbody>
          <tr style={style.marks.tr}>
            {marks}
          </tr>
        </tbody>
      </table>
    </div>);
  }

  render() {
    let style = {
      table: {
        boder: '2px solid black',
        width: '100%'
      },
      th: {
        whiteSpace: 'nowrap'
      },
      leftTh: {
        width: '0px'
      },
      rightTh: {
        width: '100%'
      }
    };
    let rows = this.props.rows.map((row) => {
      return (<GanttRow key={row.title} row={row} />);
    });
    return (<div>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={_.assign({}, style.th, style.leftTh)} />
            <th style={_.assign({}, style.th, style.rightTh)} ref="timeline">{this.renderedTimeline}</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>);
  }

  getTimespan(leftBound, rightBound) {
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
}

ReactGantt.propTypes = {
  groups: React.PropTypes.array,
  options: React.PropTypes.object,
  rows: React.PropTypes.array
};

ReactGantt.defaultProps = {
  groups: [],
  options: {},
  rows: []
};
