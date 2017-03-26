import React, { Component } from 'react';
import _ from 'lodash';
import GanttBar from './GanttBar';

export default class GanttRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let style = {
      tr: {
        border: '2px solid black',
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
        width: '100%',
        cursor: 'inherit'
      }
    };
    if (this.props.row.onClick) {
      style.rightTd.cursor = 'pointer';
      style.tr.cursor = 'pointer';
    }
    return(<tr style={style.tr} onClick={this.handleRowClicked.bind(this)}>
      <td style={_.assign({}, style.td, style.leftTd)} onMouseEnter={this.handleRowExit.bind(this)}>
        {this.props.row.title}
      </td>
      <td id={this.props.id} style={_.assign({}, style.td, style.rightTd)} onMouseEnter={this.handleRowEnter.bind(this)}>
        <GanttBar row={this.props.row} group={this.props.group} options={this.props.options} timeline={this.props.timeline} />
      </td>
    </tr>);
  }

  handleRowEnter(e) {
    this.props.onRowEnter(e.target);
  }

  handleRowExit(e) {
    this.props.onRowExit(e.target);
  }

  handleRowClicked() {
    this.props.row.onClick();
  }
}

GanttRow.propTypes = {
  groups: React.PropTypes.object,
  onRowEnter: React.PropTypes.func,
  onRowExit: React.PropTypes.func,
  options: React.PropTypes.object,
  rows: React.PropTypes.array,
  timeline: React.PropTypes.object
};

GanttRow.defaultProps = {
  groups: {},
  onRowEnter: function(){},
  onRowExit: function(){},
  options: {},
  rows: [],
  timeline: {}
};
