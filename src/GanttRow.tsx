import moment from 'moment';
import { Component } from 'react';
import type { CSSProperties, ContextType } from 'react';
import GanttBar from './GanttBar';
import GanttPopup from './GanttPopup';
import { GanttContext } from './context';
import type { GanttTemplateStep } from './context';

export interface GanttRowProps {
  barStyle?: CSSProperties;
  popupStyle?: CSSProperties;
  markerStyle?: CSSProperties;
  steps: Date[];
  templateName?: string;
  title?: string;
  description?: string;
}

interface GanttRowState {
  active: boolean;
  mouse: { offsetX?: number };
  activeStep: GanttTemplateStep | null;
  markerTime: Date;
}

const defaultBarStyle: CSSProperties = {
  height: '80px',
  marginTop: '10px',
  marginBottom: '10px',
};

const defaultPopupStyle: CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  padding: '15px',
  boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.75)',
  borderRadius: '5px',
};

const defaultMarkerStyle: CSSProperties = {
  width: '40px',
  backgroundColor: '#000000',
  opacity: 0.5,
};

export default class GanttRow extends Component<GanttRowProps, GanttRowState> {
  static contextType = GanttContext;
  declare context: ContextType<typeof GanttContext>;

  state: GanttRowState = {
    active: false,
    mouse: {},
    activeStep: null,
    markerTime: new Date(),
  };

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  getStepFromTime(time: Date): GanttTemplateStep | null {
    const { steps, templateName = 'default' } = this.props;
    const { templates } = this.context;
    const templateSteps = templates[templateName]?.steps ?? [];
    for (let index = 0; index < steps.length; index++) {
      if (moment(time).isAfter(steps[index]) && moment(time).isBefore(steps[index + 1])) {
        return templateSteps[index] ?? null;
      }
    }
    return null;
  }

  getMargin(marginValue?: string) {
    let marginTop: string | undefined = '0px';
    let marginRight: string | undefined = '0px';
    let marginBottom: string | undefined = '0px';
    let marginLeft: string | undefined = '0px';
    const margin = marginValue ? marginValue.split(' ') : [];
    switch (margin.length) {
      case 1:
        [marginTop] = margin;
        [marginRight] = margin;
        [marginBottom] = margin;
        [marginLeft] = margin;
        break;
      case 2:
        [marginTop] = margin;
        [, marginRight] = margin;
        [marginBottom] = margin;
        [, marginLeft] = margin;
        break;
      case 4:
        [marginTop] = margin;
        [, marginRight] = margin;
        [, , marginBottom] = margin;
        [, , , marginLeft] = margin;
        break;
      default:
        [marginTop] = margin;
        [marginRight] = margin;
        [marginBottom] = margin;
        [marginLeft] = margin;
    }
    return {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    };
  }

  handleMouseEnter = () => {
    this.setState({ active: true });
    window.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
    window.removeEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseMove = (e: MouseEvent) => {
    if (this.state.active) {
      const { leftBound } = this.context;
      const markerTime = moment(leftBound).add(this.widthToDuration(e.offsetX), 'seconds').toDate();
      this.setState({
        mouse: { offsetX: e.offsetX },
        markerTime,
        activeStep: this.getStepFromTime(markerTime),
      });
    }
  };

  calculateBarStyle(fullBarStyle: CSSProperties): {
    barStyle: CSSProperties;
    barWrapperStyle: CSSProperties;
  } {
    const { margin, marginTop, marginBottom, ...barStyle } = fullBarStyle;
    const parsedMargin = this.getMargin(typeof margin === 'string' ? margin : undefined);
    return {
      barStyle,
      barWrapperStyle: {
        marginTop: marginTop || parsedMargin.marginTop,
        marginBottom: marginBottom || parsedMargin.marginBottom,
      },
    };
  }

  widthToDuration(width: number): number {
    const { leftBound, rightBound, timelineWidth } = this.context;
    const timelineDuration = moment(rightBound).diff(leftBound, 'seconds');
    const pixelPerSecond = timelineDuration / timelineWidth;
    return pixelPerSecond * width;
  }

  renderPopup() {
    const { popupStyle = defaultPopupStyle, title = '', description = '' } = this.props;
    const { activeStep, markerTime, active, mouse } = this.state;
    if (!activeStep) return <div />;
    return (
      <div
        style={{
          position: 'absolute',
          left: `${mouse.offsetX}px`,
          display: active ? 'inherit' : 'none',
        }}
      >
        <GanttPopup
          style={popupStyle}
          title={title}
          description={description}
          activeStep={activeStep}
          markerTime={markerTime}
        />
      </div>
    );
  }

  render() {
    const {
      title = '',
      markerStyle = defaultMarkerStyle,
      templateName = 'default',
      steps,
    } = this.props;
    const { active, mouse } = this.state;
    const tdStyle: CSSProperties = { whiteSpace: 'nowrap' };
    const { barStyle, barWrapperStyle } = this.calculateBarStyle(
      this.props.barStyle ?? defaultBarStyle,
    );
    return (
      <tr style={{ cursor: 'inherit' }}>
        <td
          style={{
            ...tdStyle,
            width: '0px',
          }}
        >
          {title}
        </td>
        <td
          style={{
            ...tdStyle,
            width: '100%',
          }}
        >
          <div style={barWrapperStyle}>
            <GanttBar templateName={templateName} steps={steps} style={barStyle} />
            <div
              style={{
                ...markerStyle,
                height: barStyle.height,
                marginTop: `-${barStyle.height}`,
                position: 'relative',
                marginLeft: `${(mouse.offsetX ?? 0) - parseInt(`${markerStyle.width}`, 10) / 2}px`,
                zIndex: 0,
                display: active ? 'inherit' : 'none',
              }}
            />
            <div
              style={{
                height: barStyle.height,
                marginTop: `-${barStyle.height}`,
                position: 'relative',
                zIndex: 0,
              }}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            />
          </div>
          {this.renderPopup()}
        </td>
      </tr>
    );
  }
}
