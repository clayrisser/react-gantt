import React, { Component } from 'react';
import _ from 'lodash';
import GanttBar from './GanttBar';
import PropTypes from 'prop-types';

export default class GanttRow extends Component {
  static propTypes = {
    dateFormat: PropTypes.string.isRequired,
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    templates: PropTypes.object.isRequired,
    debug: PropTypes.bool.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    barStyle: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    labelStyle: PropTypes.object.isRequired,
    markerStyle: PropTypes.object.isRequired
  };

  state = {
    active: false,
    mouseX: 0
  }

  render() {
    const { markerStyle } = this.props;
    const barStyle = _.clone(this.props.barStyle);
    const margin = _.clone(barStyle.margin);
    const style = {
      tr: {
        cursor: 'inherit'
      },
      td: {
        whiteSpace: 'nowrap'
      },
      leftTd: {
        width: '0px'
      },
      rightTd: {
        width: '100%'
      }
    };
    const markerOverlap = parseInt(barStyle.height) * ((markerStyle.overlap || .1) * 2);
    const markerMargin = parseInt(barStyle.height) + parseInt(margin);
    if (!markerStyle.width) markerStyle.width = 10;
    if (!markerStyle.opacity) markerStyle.opacity = 1;
    delete barStyle.margin;
    return(
      <tr style={style.tr}>
        <td style={_.assign({}, this.props.labelStyle, style.td, style.leftTd)}>
          {this.props.row.title}
        </td>
        <td
          ref="barContainer"
          style={_.assign({}, this.props.style, style.td, style.rightTd)}

        >
          <GanttBar
            row={this.props.row}
            templates={this.props.templates}
            dateFormat={this.props.dateFormat}
            leftBound={this.props.leftBound}
            rightBound={this.props.rightBound}
            timelineWidth={this.props.timelineWidth}
            debug={this.props.debug}
            style={this.props.barStyle}
          />
          <div ref="marker" style={{
            backgroundColor: 'black',
            ...markerStyle,
            width: `${parseInt(markerStyle.width)}px`,
            height: `${parseInt(barStyle.height) + markerOverlap}px`,
            marginTop: `-${markerMargin + (markerOverlap / 2)}px`,
            marginBottom: `-${markerMargin + (markerOverlap / 2)}px`,
            marginLeft: `${this.state.mouseX - (parseInt(markerStyle.width) / 2)}px`,
            opacity: this.state.active ? markerStyle.opacity : 0
          }} />
          <div
            style={{
              height: barStyle.height,
              marginTop: margin,
              marginBottom: margin,
              padding: '0px',
              width: '100%',
              zIndex: 1,
              position: 'relative'
            }}
            onMouseEnter={this.handleMouseEnter.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
          />
        </td>
      </tr>
    );
  }

  handleMouseEnter() {
    this.setState({ active: true });
    this.mouseEventListener = window.addEventListener('mousemove', e => this.handleMouseMove(e));
  }

  handleMouseLeave() {
    this.setState({ active: false });
    if (this.mouseEventListener) {
      this.mouseEventListener.removeEventListener();
    }
  }

  handleMouseMove(e) {
    if (this.state.active) {
      this.setState({ mouseX: e.offsetX });
    }
  }
}
