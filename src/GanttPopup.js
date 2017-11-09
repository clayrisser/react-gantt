import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GanttPopup extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    templates: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired
  };

  render() {
    const { row, template, style } = this.props;
    return (
      <div style={{
        display: 'flex',
        width: '300px',
        height: '150px',
        boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
        backgroundColor: '#FFFFFF',
        padding: '10px 20px',
        ...style
      }}>
        <h2>{row.title}</h2>
      </div>
    );
  }
}
