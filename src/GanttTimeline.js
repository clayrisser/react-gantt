import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttTimeline extends Component {
  static propTypes = {
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    dateFormat: PropTypes.string.isRequired
  };

  render() {
    const { leftBound, rightBound, dateFormat } = this.props;
    return (
      <div>
        Left Bound: {moment(leftBound).format(dateFormat)}
        <br />
        Right Bound: {moment(rightBound).format(dateFormat)}
      </div>
    );
  }
}
