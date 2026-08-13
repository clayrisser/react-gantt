import { Component, createRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import GanttTimeline from './GanttTimeline';
import type { GanttTimelineStyle } from './GanttTimeline';
import { GanttContext, defaultGanttFormats } from './context';
import type { GanttContextValue, GanttTemplates } from './context';

export { default as GanttRow } from './GanttRow';
export type { GanttRowProps } from './GanttRow';
export { GanttContext } from './context';
export type {
  GanttContextValue,
  GanttTemplate,
  GanttTemplates,
  GanttTemplateStep,
} from './context';
export type { GanttTimelineStyle } from './GanttTimeline';

export interface ReactGanttProps {
  children: ReactNode;
  dateFormat?: string;
  dayFormat?: string;
  debug?: boolean;
  hourFormat?: string;
  leftBound?: Date;
  minuteFormat?: string;
  monthFormat?: string;
  rightBound?: Date;
  secondFormat?: string;
  style?: CSSProperties;
  templates?: GanttTemplates;
  timelineStyle?: GanttTimelineStyle;
  weekFormat?: string;
  yearFormat?: string;
}

interface ReactGanttState {
  timelineWidth: number;
}

export default class ReactGantt extends Component<ReactGanttProps, ReactGanttState> {
  state: ReactGanttState = {
    timelineWidth: 0,
  };

  private timelineRef = createRef<HTMLTableCellElement>();

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    // Collapse the timeline first so the header cell can shrink below its
    // previously rendered content, then measure the freed-up width once that
    // render has committed.
    this.setState({ timelineWidth: 0 }, () => {
      this.setState({
        timelineWidth: this.timelineRef.current?.offsetWidth ?? 0,
      });
    });
  };

  private getContextValue(): GanttContextValue {
    const {
      dateFormat = defaultGanttFormats.dateFormat,
      dayFormat = defaultGanttFormats.dayFormat,
      debug = false,
      hourFormat = defaultGanttFormats.hourFormat,
      leftBound = new Date(),
      minuteFormat = defaultGanttFormats.minuteFormat,
      monthFormat = defaultGanttFormats.monthFormat,
      rightBound = new Date(),
      secondFormat = defaultGanttFormats.secondFormat,
      templates = {},
      weekFormat = defaultGanttFormats.weekFormat,
      yearFormat = defaultGanttFormats.yearFormat,
    } = this.props;
    return {
      dateFormat,
      dayFormat,
      debug,
      hourFormat,
      leftBound,
      minuteFormat,
      monthFormat,
      rightBound,
      secondFormat,
      templates,
      timelineWidth: this.state.timelineWidth,
      weekFormat,
      yearFormat,
    };
  }

  render() {
    const { children, style = {}, timelineStyle = { minWidth: '60px' } } = this.props;
    const thStyle: CSSProperties = { whiteSpace: 'nowrap' };
    return (
      <GanttContext.Provider value={this.getContextValue()}>
        <div style={style}>
          <table style={{ width: '100%' }} cellSpacing={0}>
            <thead>
              <tr>
                <th
                  style={{
                    ...thStyle,
                    width: '0px',
                  }}
                />
                <th
                  ref={this.timelineRef}
                  style={{
                    ...thStyle,
                    width: '100%',
                  }}
                >
                  <GanttTimeline style={timelineStyle} />
                </th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </GanttContext.Provider>
    );
  }
}
