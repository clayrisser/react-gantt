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
        border: '2px solid black'
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
		return(<tr style={style.tr}>
      <td style={_.assign({}, style.td, style.leftTd)}>
        {this.props.row.title}
      </td>
      <td style={_.assign({}, style.td, style.rightTd)}>
        <GanttBar row={this.props.row} group={this.props.group} options={this.props.options} timeline={this.props.timeline} />
		  </td>
    </tr>);
	}
}

GanttRow.propTypes = {
  groups: React.PropTypes.object,
  options: React.PropTypes.object,
  rows: React.PropTypes.array,
  timeline: React.PropTypes.object
};

GanttRow.defaultProps = {
  groups: {},
  options: {},
  rows: [],
  timeline: {}
};
