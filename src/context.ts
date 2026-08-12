import { createContext } from 'react';

export interface GanttTemplateStep {
  name: string;
  color: string;
}

export interface GanttTemplate {
  title?: string;
  steps: GanttTemplateStep[];
}

export type GanttTemplates = Record<string, GanttTemplate>;

export interface GanttContextValue {
  dateFormat: string;
  dayFormat: string;
  debug: boolean;
  hourFormat: string;
  leftBound: Date;
  minuteFormat: string;
  monthFormat: string;
  rightBound: Date;
  secondFormat: string;
  templates: GanttTemplates;
  timelineWidth: number;
  weekFormat: string;
  yearFormat: string;
}

export const defaultGanttFormats = {
  dateFormat: 'YY-MM-DD',
  dayFormat: 'YY-MM-DD',
  hourFormat: 'HH',
  minuteFormat: 'HH:mm',
  monthFormat: 'YY-MM-DD',
  secondFormat: 'HH:mm:ss',
  weekFormat: 'YY-MM-DD',
  yearFormat: 'YY-MM-DD',
};

export const GanttContext = createContext<GanttContextValue>({
  ...defaultGanttFormats,
  debug: false,
  leftBound: new Date(0),
  rightBound: new Date(0),
  templates: {},
  timelineWidth: 0,
});
