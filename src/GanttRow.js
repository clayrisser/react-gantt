import React, { Component } from 'react';
import moment from 'moment';
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
    mouse: {},
    activeStep: {},
    markerTime: moment().toDate()
  }

  renderPopup() {
    const { popupStyle, title } = this.props;
    const { activeStep, markerTime, active } = this.state;
    if (_.isEmpty(activeStep)) return (<div></div>);
    return (
      <div style={{
        position: 'absolute',
        left: `${this.state.mouse.offsetX}px`,
        display: active ? 'inherit' : 'none'
      }}>
        <GanttPopup
          style={popupStyle}
          title={title}
          activeStep={activeStep}
          markerTime={markerTime}
        />
      </div>
    );
  }

  render() {
    const { title, markerStyle, templateName, steps } = this.props;
    const { active } = this.state;
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
              title={title}
              templateName={templateName}
              steps={steps}
              style={barStyle}
            />
            <div style={{
              ...markerStyle,
              height: barStyle.height,
              marginTop: `-${barStyle.height}`,
              position: 'relative',
              marginLeft: `${this.state.mouse.offsetX - (parseInt(markerStyle.width) / 2)}px`,
              zIndex: 0,
              display: active ? 'inherit' : 'none'
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
          {this.renderPopup()}
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
      const { timelineWidth, leftBound } = this.context;
      const markerTime = moment(leftBound).add(this.widthToDuration(e.offsetX), 'seconds').toDate();
      this.setState({
        mouse: e,
        markerTime,
        activeStep: this.getStepFromTime(markerTime)
      });
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

  widthToDuration(width) {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const pixelPerSecond = timelineDuration / timelineWidth
    return pixelPerSecond * width;
  }

  getStepFromTime(time) {
    const { steps, templateName } = this.props;
    const { templates } = this.context;
    let templateStep = {};
    const templateSteps = templates[templateName].steps;
    _.each(steps, (step, index) => {
      if (
        moment(time).isAfter(step)
        && moment(time).isBefore(steps[index + 1])
      ) {
        templateStep = templateSteps[index];
        return false;
      }
    });
    return templateStep;
  }
}
