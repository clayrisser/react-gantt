import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import GanttRow from './GanttRow';
import GanttTimeline from './GanttTimeline.js';

export default class ReactGantt extends Component {
  static propTypes = {
    dateFormat: PropTypes.string,
    leftBound: PropTypes.object,
    rightBound: PropTypes.object,
    rows: PropTypes.array,
    templates: PropTypes.object,
    minTickPadding: PropTypes.number,
    debug: PropTypes.bool,
    timelineStyle: PropTypes.object,
    barStyle: PropTypes.object,
    rowStyle: PropTypes.object,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    markerStyle: PropTypes.object
  };
  static defaultProps = {
    dateFormat: '',
    leftBound: 0,
    rightBound: 0,
    rows: [],
    templates: {},
    minTickPadding: 80,
    debug: false,
    timelineStyle: {
      tickWidth: '1px',
      paddingLeft: '4px'
    },
    barStyle: {
      margin: '10px',
      height: '40px'
    },
    rowStyle: {
      borderLeft: '2px solid black'
    },
    labelStyle: {
      padding: '10px',
      textAlgin: 'right',
      borderBottom: '2px solid black',
      fontWeight: 'bold'
    },
    markerStyle: {
      opacity: 0.5,
      overlap: 0.1,
      width: '10px'
    },
    style: {}
  };

  state = {
    mouse: {},
    activeRow: null,
    timelineWidth: 0
  };
  mounted = false;

  componentDidMount() {
    window.addEventListener('resize', e => this.handleResize(e));
    this.handleResize();
  }

  render() {
    const style = {
      marker: {
        backgroundColor: 'black',
        width: '4px',
        marginTop: '3px',
        height: '26px',
        position: 'fixed',
        display: 'none'
      },
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
    }
    return (
      <div>
        <div ref="marker" style={style.marker}></div>
        <table style={style.table} cellSpacing={0}>
          <thead>
            <tr>
              <th style={_.assign({}, style.th, style.leftTh)} />
              <th ref="timeline" style={_.assign({}, style.th, style.rightTh)}>
                <GanttTimeline
                  rows={this.props.rows}
                  dateFormat={this.props.dateFormat}
                  leftBound={this.props.leftBound}
                  rightBound={this.props.rightBound}
                  timelineWidth={this.state.timelineWidth}
                  minTickPadding={this.props.minTickPadding}
                  debug={this.props.debug}
                  style={this.props.timelineStyle}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((row) => {
               return (
                 <GanttRow
                   key={row.title}
                   row={row}
                   templates={this.props.templates}
                   dateFormat={this.props.dateFormat}
                   leftBound={this.props.leftBound}
                   rightBound={this.props.rightBound}
                   timelineWidth={this.state.timelineWidth}
                   debug={this.props.debug}
                   style={this.props.rowStyle}
                   barStyle={this.props.barStyle}
                   labelStyle={this.props.labelStyle}
                   markerStyle={this.props.markerStyle}
                 />
               );
            })}
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
