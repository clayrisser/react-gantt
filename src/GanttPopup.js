import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class GanttPopup extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    markerTime: PropTypes.object.isRequired,
    activeStep: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    renderPopupDetails: PropTypes.func,
    titleStyle: PropTypes.object
  };
  static contextTypes = {
    dateFormat: PropTypes.string.isRequired
  };
  static defaultProps = {
    titleStyle: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
      borderBottom: '1px solid #cfcfcf'
    },
    renderPopupDetails: (stepName, markerTime) => {
      return (
        <span>
          { markerTime }
          <br />
          { stepName }
        </span>
      );
    }
  };

  render() {
    const { title, style, markerTime, activeStep, titleStyle, renderPopupDetails } = this.props;
    const { dateFormat } = this.context;
    return (
      <div style={style}>
        <span style={titleStyle}>{title}</span>
        {renderPopupDetails(activeStep.name, moment(markerTime).format(dateFormat)) }
      </div>
    );
  }
}