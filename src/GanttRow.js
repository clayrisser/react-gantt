import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GanttBar from './GanttBar';

export default class GanttRow extends Component {
  static propTypes = {
    barStyle: PropTypes.object,
    steps: PropTypes.array.isRequired,
    style: PropTypes.object,
    templateName: PropTypes.string,
    title: PropTypes.string
  };
  static contextTypes = {
    templates: PropTypes.object.isRequired,
    dateFormat: PropTypes.string.isRequired,
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    debug: PropTypes.bool.isRequired
  };
  static defaultProps = {
    barStyle: {},
    style: {},
    templateName: 'default',
    title: ''
  };

  render() {
    const tdStyle = { whiteSpace: 'nowrap' };
    return (
      <tr style={{ cursor: 'inherit' }}>
        <td style={{
          ...tdStyle,
          width: '0px'
        }}>
          {this.props.title}
        </td>
        <td style={{
          ...tdStyle,
          width: '100%'
        }}>
          <GanttBar
            title={this.props.title}
            templateName={this.props.templateName}
            steps={this.props.steps}
            style={this.props.barStyle}
          />
        </td>
      </tr>
    );
  }
}
