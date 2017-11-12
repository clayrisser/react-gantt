import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GanttBar from './GanttBar';
import GanttPopup from './GanttPopup';

export default class GanttRow extends Component {
  static propTypes = {
    barStyle: PropTypes.object,
    popupStyle: PropTypes.object,
    markerStyle: PropTypes.object,
    steps: PropTypes.array.isRequired,
    style: PropTypes.object,
    templateName: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
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
    barStyle: {
      height: '80px',
      marginTop: '10px',
      marginBottom: '10px'
    },
    popupStyle: {
      backgroundColor: '#FFFFFF',
      padding: '20px',
      boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.75)'
    },
    markerStyle: {
      width: '40px',
      backgroundColor: '#000000',
      opacity: 0.5
    },
    style: {},
    templateName: 'default',
    title: '',
    children: null
  };

  state = {
    active: false,
    mouse: {}
  }

  render() {
    const { title, markerStyle, popupStyle } = this.props;
    const tdStyle = { whiteSpace: 'nowrap' };
    const { barStyle, barWrapperStyle } = this.calculateBarStyle(this.props.barStyle);
    return (
      <tr style={{ cursor: 'inherit' }}>
        <td style={{
          ...tdStyle,
          width: '0px'
        }}>
          {title}
        </td>
        <td style={{
          ...tdStyle,
          width: '100%'
        }}>
          <div style={barWrapperStyle}>
            <GanttBar
              title={this.props.title}
              templateName={this.props.templateName}
              steps={this.props.steps}
              style={barStyle}
            />
            <div style={{
              ...markerStyle,
              height: barStyle.height,
              marginTop: `-${barStyle.height}`,
              position: 'relative',
              marginLeft: `${this.state.mouse.offsetX - (parseInt(markerStyle.width) / 2)}px`,
              zIndex: 0,
              display: this.state.active ? 'inherit' : 'none'
            }} />
            <div
              style={{
                height: barStyle.height,
                marginTop: `-${barStyle.height}`,
                position: 'relative',
                zIndex: 0
              }}
              onMouseEnter={this.handleMouseEnter.bind(this)}
              onMouseLeave={this.handleMouseLeave.bind(this)}
            />
          </div>
          <div style={{
            position: 'absolute',
            left: `${this.state.mouse.offsetX}px`,
            display: this.state.active ? 'inherit' : 'none'
          }}>
            <GanttPopup
              style={popupStyle}
              title={title}
            />
          </div>
        </td>
      </tr>
    );
  }

  handleMouseEnter() {
    this.setState({ active: true });
    this.mouseEventListener = window.addEventListener('mousemove', e => this.handleMouseMove(e));
  }

  handleMouseLeave() {
    this.setState({ active: false });
    if (this.mouseEventListener) {
      this.mouseEventListener.removeEventListener();
    }
  }

  handleMouseMove(e) {
    if (this.state.active) {
      const { markerStyle } = this.props;
      const { timelineWidth } = this.context;
      this.setState({ mouse: e });
    }
  }

  calculateBarStyle(barStyle) {
    barStyle = _.clone(barStyle);
    const margin = this.getMargin(barStyle.margin)
    const marginTop = barStyle.marginTop || margin.marginTop;
    const marginBottom = barStyle.marginBottom || margin.marginBottom;
    delete barStyle.marginTop;
    delete barStyle.marginBottom;
    delete barStyle.margin;
    return {
      barStyle,
      barWrapperStyle: {
        marginTop,
        marginBottom
      }
    }
  }

  getMargin(margin) {
    let marginTop = '0px';
    let marginRight = '0px';
    let marginBottom = '0px';
    let marginLeft = '0px';
    margin = margin ? margin.split(' ') : [];
    switch (margin.length) {
      case 1:
        marginTop = margin[0];
        marginRight = margin[0];
        marginBottom = margin[0];
        marginLeft = margin[0];
      case 2:
        marginTop = margin[0];
        marginRight = margin[1];
        marginBottom = margin[0];
        marginLeft = margin[1];
      case 4:
        marginTop = margin[0];
        marginRight = margin[1];
        marginBottom = margin[2];
        marginLeft = margin[3];
    }
    return {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft
    }
  }
}
