import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import GanttRow from './GanttRow';
import GanttTimeline from './GanttTimeline.js';

export default class ReactGantt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifecycle: {
        barsLoaded: false
      },
      mouse: {},
      rowEntered: null
    };
  }

  componentWillMount() {
    this.errors = this.validateProps();
    this.timelinePixels = null;
    this.timeline = null;
    this.markerCursor = 'inherit';
  }

  componentDidMount() {
    window.addEventListener('resize', e => this.handleResize(e));
    window.addEventListener('mousemove', e => this.handleMouseMove(e));
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.timelinePixels = this.refs.timeline.offsetWidth;
    if (this.timeline && !this.state.lifecycle.barsLoaded) {
      this.setState({lifecycle: _.assign({}, this.state.lifecycle, {
        barsLoaded: true
      })});
    }
  }

  renderErrors() {
    let style = {
      h6: {
        color: '#FF0000'
      }
    };
    let renderedErrors = this.errors.map(err => {
      return(<h6 style={style.h6}>{err.message}</h6>);
    });
    return (<div>
      {renderedErrors}
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
      },
      marker: {
        backgroundColor: 'white',
        width: '4px',
        marginTop: '3px',
        height: '26px',
        marginLeft: '-3px',
        position: 'fixed',
        cursor: this.markerCursor,
        display: !this.state.rowEntered ? 'none' : 'inherit'
      },
      popup: {

      }
    };
    if (this.errors.length > 0) return this.renderErrors();
    let rows = _.map(this.props.rows, (row, i) => {
      return (<GanttRow
        key={i}
        group={this.props.groups[row.group]}
        onRowEnter={this.handleRowEnter.bind(this)}
        onRowExit={this.handleRowExit.bind(this)}
        row={row} options={this.props.options}
        timeline={this.timeline} />
      );
    });
    return (<div onMouseLeave={this.handleRowExit.bind(this)}>
      <div ref="marker" style={style.marker}></div>
      <div ref="popup" style={style.popup}></div>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={_.assign({}, style.th, style.leftTh)} />
            <th style={_.assign({}, style.th, style.rightTh)} ref="timeline">
              <GanttTimeline
                ref="ganttTimeline"
                options={this.props.options}
                setTimeline={this.setTimeline.bind(this)}
                timelinePixels={this.timelinePixels}
                onTimelinePixelsReady={this.onTimelinePixelsReady.bind(this)}
                onTimelineReady={this.onTimelineReady.bind(this)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>);
  }

  handleMouseMove(e) {
    let marker = this.refs.marker;
    let rowEntered = this.state.rowEntered;
    let mouse = e;
    this.setState({mouse: mouse})
    if (rowEntered) {
      marker.style.left = mouse.x + 'px';
      marker.style.top = this.getOffsetTop(rowEntered) + 'px';
    }
  }

  getOffsetTop(element) {
    let offsetTop = 0;
    do {
      offsetTop += element.offsetTop || 0;
      element = element.offsetParent;
    } while(element);
    return offsetTop;
  }

  handleRowEnter(rowEntered) {
    let mouse = this.state.mouse;
    if (rowEntered.style.cursor) this.markerCursor = rowEntered.style.cursor;
    this.setState({rowEntered: rowEntered});
  }

  handleRowExit() {
    this.setState({rowEntered: null});
  }

  handleResize(e) {
    this.timeline = null;
    this.forceUpdate();
    this.refs.ganttTimeline.onResize();
    this.forceUpdate();
  }

  onTimelinePixelsReady() {
    this.forceUpdate();
  }

  setTimeline(timeline) {
    this.timeline = timeline;
    this.forceUpdate();
  }

  onTimelineReady() {
    this.forceUpdate();
  }

  validateProps() {
    let errors = [];
    _.each(this.props.rows, (row) => {
      let keys = _.keys(row.transitions);
      if (keys[0] !== 'start') {
        let err = new Error('\'transitions\' property in ' + row.title + ' must begin with \'start\' property');
        errors.push(err);
        console.error(err.message);
      }
      if (keys[keys.length - 1] !== 'end') {
        let err = new Error('\'transitions\' property in ' + row.title + ' must finish with \'end\' property');
        errors.push(err);
        console.error(err.message);
      }
    });
    return errors;
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
