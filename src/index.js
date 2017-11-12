import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import GanttTimeline from './GanttTimeline';

export GanttRow from './GanttRow';

export default class ReactGantt extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    secondFormat: PropTypes.string,
    hourFormat: PropTypes.string,
    dayFormat: PropTypes.string,
    weekFormat: PropTypes.string,
    monthFormat: PropTypes.string,
    yearFormat: PropTypes.string,
    debug: PropTypes.bool,
    leftBound: PropTypes.object,
    rightBound: PropTypes.object,
    style: PropTypes.object,
    templates: PropTypes.object,
    timelineStyle: PropTypes.object
  };
  static childContextTypes = {
    templates: PropTypes.object.isRequired,
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
  static defaultProps = {
    dateFormat: 'YY-MM-DD',
    timeFormat: 'YY-MM-DD HH:MM',
    secondFormat: 'HH:MM:SS',
    minuteFormat: 'HH:MM',
    hourFormat: 'HH',
    dayFormat: 'YY-MM-DD',
    weekFormat: 'YY-MM-DD',
    monthFormat: 'YY-MM-DD',
    yearFormat: 'YY-MM-DD',
    debug: false,
    leftBound: moment().toDate(),
    leftBound: moment().toDate(),
    style: {},
    templates: {},
    timelineStyle: {
      minWidth: '60px'
    }
  };

  state = {
    timelineWidth: 0
  };

  componentDidMount() {
    this.resizeEventListener = window.addEventListener('resize', e => this.handleResize(e));
    this.handleResize();
  }

  componentWillUnmount() {
    this.resizeEventListener.removeEventListener();
  }

  getChildContext() {
    return {
      templates: this.props.templates,
      dateFormat: this.props.dateFormat,
      timeFormat: this.props.timeFormat,
      secondFormat: this.props.secondFormat,
      hourFormat: this.props.hourFormat,
      dayFormat: this.props.dayFormat,
      weekFormat: this.props.weekFormat,
      monthFormat: this.props.monthFormat,
      yearFormat: this.props.yearFormat,
      debug: this.props.debug,
      leftBound: this.props.leftBound,
      rightBound: this.props.rightBound,
      timelineWidth: this.state.timelineWidth
    };
  }

  render() {
    const thStyle = { whiteSpace: 'nowrap' };
    return (
      <div style={this.props.style}>
        <table style={{ width: '100%' }} cellSpacing={0}>
          <thead>
            <tr>
              <th style={{
                ...thStyle,
                width: '0px'
              }} />
              <th ref="timeline" style={{
                ...thStyle,
                width: '100%'
              }}>
                <GanttTimeline style={this.props.timelineStyle} rows={this.props.children} />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    )
  }

  handleResize(e) {
    this.setState({ timelineWidth: 0 });
    this.setState({ timelineWidth: this.refs.timeline.offsetWidth });
  }
}
