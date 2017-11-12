import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttPopup extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    markerTime: PropTypes.object.isRequired,
    activeStep: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };
  static contextTypes = {
    dateFormat: PropTypes.string.isRequired
  }

  render() {
    const { title, style, markerTime, activeStep } = this.props;
    const { dateFormat } = this.context;
    return (
      <div style={style}>
        {title}
        <br />
        {moment(markerTime).format(dateFormat)}
        <br />
        {activeStep.name}
      </div>
    );
  }
}
