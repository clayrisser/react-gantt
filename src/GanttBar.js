import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

export default class GanttBar extends Component {
  static propTypes = {
    dateFormat: PropTypes.string.isRequired,
    leftBound: PropTypes.object.isRequired,
    rightBound: PropTypes.object.isRequired,
    row: PropTypes.object.isRequired,
    templates: PropTypes.object.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    debug: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired
  };

  render() {
    if (this.props.debug) return this.debugRender();
    return this.regularRender();
  }

  regularRender() {
    const { dateFormat, leftBound, rightBound } = this.props;
    const style = _.clone(this.props.style);
    const margin = _.clone(style.margin);
    delete style.margin;
    const steps = this.getSteps();
    let timelineTaken = 0;
    return(
      <div ref="bar" style={{display: 'flex'}}>
        {_.map(steps, (step, index) => {
           return (
             <div key={`reg${step.name}${index}`}>
               <div style={{
                 height: '30px',
                 ...style,
                 borderTopLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                 borderBottomLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                 borderTopRightRadius: step.offTimelineRight ? '6%' : '0%',
                 borderBottomRightRadius: step.offTimelineRight ? '6%' : '0%',
                 marginTop: margin,
                 marginBottom: margin,
                 width: `${step.displayWidth}px`,
                 backgroundColor: step.color,
                 marginLeft: index === 0 ? `${step.startPixel}px` : '0px'
               }} />
             </div>
           )
        })}
      </div>
    );
  }

  debugRender() {
    const { dateFormat, leftBound, rightBound } = this.props;
    const steps = this.getSteps();
    return(
      <div ref="bar">
        {_.map(steps, (step, index) => {
           return (
             <div key={`deb${step.name}${index}`}>
               <div>
                 Start Time: {moment(step.startTime).format(dateFormat)}
                 <br />
                 End Time: {moment(step.endTime).format(dateFormat)}
                 <br />
                 Start Pixel: {step.startPixel}
                 <br />
                 End Pixel: {step.endPixel}
                 <br />
                 Theoretical Width: {step.theoreticalWidth}
                 <br />
                 Display Width: {step.displayWidth}
               </div>
               <div style={{
                 height: '20px',
                 width: `${step.displayWidth}px`,
                 backgroundColor: step.color,
                 marginLeft: step.startPixel
               }} />
               <hr />
             </div>
           )
        })}
        {this.regularRender()}
      </div>
    );
  }

  getSteps() {
    return _.map(this.props.templates[this.props.row.template].steps, (step, index) => {
      return this.getStep(index);
    });
  }

  getStep(index) {
    const { templates, row, leftBound, rightBound } = this.props;
    const template = templates[this.props.row.template];
    const stepStartTime = row.steps[index];
    const stepEndTime = (template.steps.length > index) ? row.steps[index + 1] : null;
    if (!stepEndTime) return null;
    const stepDuration = moment(stepEndTime).diff(stepStartTime, 'seconds');
    const theoreticalWidth = this.durationToWidth(stepDuration);
    const startPixel = this.timeToPixel(stepStartTime);
    const endPixel = this.timeToPixel(stepEndTime);
    const displayWidth = endPixel - startPixel;
    let offTimelineLeft = false;
    let offTimelineRight = false;
    if (moment(stepStartTime).diff(moment(leftBound), 'seconds') < 0) {
      offTimelineLeft = true;
    }
    if (moment(rightBound).diff(moment(stepEndTime), 'seconds') < 0) {
      offTimelineRight = true;
    }
    return {
      name: template.steps[index].name,
      color: template.steps[index].color,
      duration: stepDuration,
      theoreticalWidth,
      displayWidth,
      startPixel,
      endPixel,
      offTimelineLeft,
      offTimelineRight,
      startTime: stepStartTime,
      endTime: stepEndTime
    };
  }

  durationToWidth(duration) {
    const { leftBound, rightBound, timelineWidth } = this.props;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage;
  }

  timeToPixel(time) {
    const { leftBound, rightBound, timelineWidth } = this.props;
    const leftBoundPixel = 0;
    const rightBoundPixel = timelineWidth;
    const timeDurationFromLeftBound = moment(time).diff(leftBound, 'seconds');
    const timeWidthFromLeftBound = this.durationToWidth(timeDurationFromLeftBound);
    const pixel = timeWidthFromLeftBound;
    if (leftBoundPixel < pixel && pixel < rightBoundPixel) return pixel;
    if (pixel <= leftBoundPixel) return leftBoundPixel;
    if (pixel >= rightBoundPixel) return rightBoundPixel;
  }
}
