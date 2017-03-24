import React, { Component } from 'react';
import _ from 'underscore';
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
        <GanttBar row={this.props.row} />
		  </td>
    </tr>);
	}
}


  /* renderRows() {
   *   var rows = [];
   *   var labelWidth = '80px';
   *   if (this.props.options && this.props.options.labelWidth) {
   *     labelWidth = this.props.options.labelWidth;
   *   }
   *   var rowStyle = {
   *     cursor: 'pointer'
   *   };
   *   var titleStyle = {
   *     textAlign: 'right',
   *     verticalAlign: 'middle',
   *     paddingRight: '10px',
   *     fontWeight: 'bold'
   *   };
   *   var timelineStyle = {
   *     width: '100%'
   *   };
   *   if (this.props.options.showBorders !== false) {
   *     titleStyle.border = 'solid';
   *     timelineStyle.border = 'solid';
   *   }
   *   var labelStyle = {
   *     width: labelWidth
   *   };
   *   if (this.props.rows.length > 0) {
   *     for(var i = 0; i < this.props.rows.length; i++) {
   *       var rowObject = this.props.rows[i];
   *       var row = (
   *         <tr key={i} style={rowStyle} onClick={rowObject.action} onMouseOver={this.showPopup.bind(this, rowObject)} onMouseOut={this.hidePopup.bind(this)}>
   *           <td style={titleStyle}>
   *             <div style={labelStyle}>{rowObject.title}</div>
   *           </td>
   *           <td style={timelineStyle}>
   *             {this.renderBar(rowObject)}
   *           </td>
   *         </tr>
   *       );
   *       rows.push(row);
   *     }
   *   } else {
   *     var row = (
   *       <tr key={0}>
   *         <td style={titleStyle}>
   *           <div style={labelStyle} />
   *         </td>
   *         <td style={timelineStyle}>
   *           <span>No Data</span>
   *         </td>
   *       </tr>
   *     );
   *     rows.push(row);
   *   }
   *   return rows;
   * }
   */
