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
    debug: PropTypes.bool.isRequired,
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    activeRow: PropTypes.number
  };
  static defaultProps = {
    dateFormat: 'YYYY-MM-DD',
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
    mouse: {},
    activeRow: null,
    timelineWidth: 0
  };

  componentDidMount() {
    window.addEventListener('resize', e => this.handleResize(e));
    this.handleResize();
  }

  getChildContext() {
    return {
      templates: this.props.templates,
      dateFormat: this.props.dateFormat,
      debug: this.props.debug,
      leftBound: this.props.leftBound,
      rightBound: this.props.rightBound,
      timelineWidth: this.state.timelineWidth,
      activeRow: this.state.activeRow
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
