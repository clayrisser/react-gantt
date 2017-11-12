import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GanttPopup extends Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { title, style } = this.props;
    return (
      <div style={style}>
        {title}
      </div>
    );
  }
}
