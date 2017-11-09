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
    timelineWidth: PropTypes.number.isRequired
  };

  render() {
    const style = {
      tr: {
        cursor: 'inherit'
      },
      td: {
        border: '2px solid black',
        whiteSpace: 'nowrap'
      },
      leftTd: {
        width: '0px'
      },
      rightTd: {
        width: '100%'
      }
    };
    return(
      <tr style={style.tr}>
        <td style={_.assign({}, style.td, style.leftTd)}>
          {this.props.row.title}
        </td>
        <td style={_.assign({}, style.td, style.rightTd)}>
          <GanttBar
            row={this.props.row}
            templates={this.props.templates}
            dateFormat={this.props.dateFormat}
            leftBound={this.props.leftBound}
            rightBound={this.props.rightBound}
            timelineWidth={this.props.timelineWidth}
            debug={this.props.debug}
          />
        </td>
      </tr>
    );
  }
}
