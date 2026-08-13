import moment from 'moment';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGantt, { GanttRow } from '../src/index';

function date(month: number, day: number) {
  return moment().set({ hour: 0, date: day, month, year: 2016 }).toDate();
}

function Demo() {
  return (
    <div>
      <ReactGantt
        templates={{
          myTasks: {
            title: 'My Tasks',
            steps: [
              {
                name: 'Task Phase One',
                color: '#0099FF',
              },
              {
                name: 'Task Phase Two',
                color: '#FF9900',
              },
            ],
          },
        }}
        leftBound={date(5, 30)}
        rightBound={date(8, 29)}
        dateFormat="YYYY-MM-DD"
        debug={false}
      >
        <GanttRow
          title="Task 1"
          description="Task description 1"
          templateName="myTasks"
          steps={[date(6, 1), date(8, 4), date(8, 17)]}
        />
        <GanttRow
          title="Task 2"
          description="Task description 2"
          templateName="myTasks"
          steps={[date(2, 27), date(7, 9), date(7, 22)]}
        />
        <GanttRow
          title="Task 3"
          description="Task description 3"
          templateName="myTasks"
          steps={[date(6, 12), date(7, 2), date(8, 2), date(9, 24)]}
        />
      </ReactGantt>
    </div>
  );
}

createRoot(document.getElementById('demo')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
