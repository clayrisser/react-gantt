import React, {Component} from 'react';
import moment from 'moment';
import _ from 'underscore';
import Table from 'react-bootstrap/lib/Table';
import {WindowResizeListener} from 'react-window-resize-listener';
import GanttRow from './GanttRow';

export default class ReactGantt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifecycle: {
        barsLoaded: false
      }
    };
  }

  componentWillMount() {
    this.renderedTimeline = null;
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate();
      setTimeout(() => {
        this.forceUpdate();
      }, 1000);
    });
    this.forceUpdate();
  }

  componentWillUpdate() {
    this.renderedTimeline = this.renderTimeline();
  }

  componentDidUpdate() {
    if (this.renderedTimeline && !this.state.lifecycle.barsLoaded) {
      this.setState({lifecycle: _.assign({}, this.state.lifecycle, {
        barsLoaded: true
      })});
    }
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
    let marks = [];
    let options = this.props.options;
    let leftBoundDate = moment(options.leftBound);
    let rightBoundDate = moment(options.rightBound);
    let leftBoundTime = 0;
    let rightBoundTime = rightBoundDate.diff(leftBoundDate, 'seconds');
    let leftBoundPixels = 0;
    let rightBoundPixels = this.refs.timeline.offsetWidth;
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
      marks.push(<td key={i} style={style.marks.td}>
        {label}
      </td>);
    }
    this.timeline = {
      pixels: rightBoundPixels,
      time: rightBoundTime,
      secondsPerPixel: secondsPerPixel
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
      return (<GanttRow key={row.title} group={this.props.groups[row.group]} row={row} options={this.props.options} timeline={this.timeline} />);
    });
    return (<div>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={_.assign({}, style.th, style.leftTh)} />
            <th style={_.assign({}, style.th, style.rightTh)} ref="timeline">
              {this.renderedTimeline}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
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
}

ReactGantt.propTypes = {
  groups: React.PropTypes.object,
  options: React.PropTypes.object,
  rows: React.PropTypes.array
};

ReactGantt.defaultProps = {
  groups: {},
  options: {},
  rows: []
};
