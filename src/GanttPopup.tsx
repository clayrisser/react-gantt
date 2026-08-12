import moment from 'moment';
import { Component } from 'react';
import type { CSSProperties, ContextType } from 'react';
import { GanttContext } from './context';
import type { GanttTemplateStep } from './context';

export interface GanttPopupProps {
  style: CSSProperties;
  markerTime: Date;
  activeStep: GanttTemplateStep;
  title: string;
  titleStyle?: CSSProperties;
  description?: string;
}

const defaultTitleStyle: CSSProperties = {
  display: 'block',
  marginBottom: '10px',
  fontWeight: 'bold',
  borderBottom: '1px solid #cfcfcf',
};

export default class GanttPopup extends Component<GanttPopupProps> {
  static contextType = GanttContext;
  declare context: ContextType<typeof GanttContext>;

  render() {
    const {
      title,
      style,
      markerTime,
      activeStep,
      titleStyle = defaultTitleStyle,
      description = '',
    } = this.props;
    const { dateFormat } = this.context;
    return (
      <div style={style}>
        <span style={titleStyle}>{title}</span>
        {moment(markerTime).format(dateFormat)}
        <br />
        {activeStep.name}
        <br />
        {description}
      </div>
    );
  }
}
