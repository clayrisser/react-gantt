import moment from 'moment';
import { Component } from 'react';
import type { CSSProperties, ContextType } from 'react';
import { GanttContext } from './context';
import type { GanttTemplate } from './context';

export interface GanttBarProps {
  templateName: string;
  steps: Date[];
  style: CSSProperties;
}

interface BarStep {
  name: string;
  color: string;
  duration: number;
  theoreticalWidth: number;
  displayWidth: number;
  startPixel: number;
  endPixel: number;
  offTimelineLeft: boolean;
  offTimelineRight: boolean;
  startTime: Date;
  endTime: Date;
}

export default class GanttBar extends Component<GanttBarProps> {
  static contextType = GanttContext;
  declare context: ContextType<typeof GanttContext>;

  getSteps(): BarStep[] {
    const { templates } = this.context;
    const { templateName } = this.props;
    const template = templates[templateName];
    if (!template) return [];
    const barSteps: BarStep[] = [];
    template.steps.forEach((_templateStep, index) => {
      const barStep = this.getStep(index, template);
      if (barStep) barSteps.push(barStep);
    });
    return barSteps;
  }

  getStep(index: number, template: GanttTemplate): BarStep | null {
    const { leftBound, rightBound } = this.context;
    const { steps } = this.props;
    const stepStartTime = steps[index];
    const stepEndTime = steps[index + 1];
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
      endTime: stepEndTime,
    };
  }

  durationToWidth(duration: number): number {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const percentage = duration > 0 ? duration / timelineDuration : 0;
    return timelineWidth * percentage;
  }

  timeToPixel(time: Date): number {
    const { leftBound, timelineWidth } = this.context;
    const leftBoundPixel = 0;
    const rightBoundPixel = timelineWidth;
    const timeDurationFromLeftBound = moment(time).diff(leftBound, 'seconds');
    const pixel = this.durationToWidth(timeDurationFromLeftBound);
    if (leftBoundPixel < pixel && pixel < rightBoundPixel) return pixel;
    if (pixel <= leftBoundPixel) return leftBoundPixel;
    if (pixel >= rightBoundPixel) return rightBoundPixel;
    return 0;
  }

  defaultRender() {
    const { style } = this.props;
    const steps = this.getSteps();
    return (
      <div style={{ display: 'flex' }}>
        {steps.map((step, index) => (
          <div key={`reg${step.name}${index}`}>
            <div
              style={{
                ...style,
                borderTopLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                borderBottomLeftRadius: step.offTimelineLeft ? '6%' : '0%',
                borderTopRightRadius: step.offTimelineRight ? '6%' : '0%',
                borderBottomRightRadius: step.offTimelineRight ? '6%' : '0%',
                width: `${step.displayWidth}px`,
                backgroundColor: step.color,
                marginLeft: index === 0 ? `${step.startPixel}px` : '0px',
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  debugRender() {
    const { dateFormat } = this.context;
    const steps = this.getSteps();
    return (
      <div>
        {steps.map((step, index) => (
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
            <div
              style={{
                height: '20px',
                width: `${step.displayWidth}px`,
                backgroundColor: step.color,
                marginLeft: step.startPixel,
              }}
            />
            <hr />
          </div>
        ))}
        {this.defaultRender()}
      </div>
    );
  }

  render() {
    if (this.context.debug) return this.debugRender();
    return this.defaultRender();
  }
}
