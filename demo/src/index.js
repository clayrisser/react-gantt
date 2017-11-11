import React, {Component} from 'react'
import moment from 'moment';
import {render} from 'react-dom'
import ReactGantt, { GanttRow } from '../../src';

class Demo extends Component {
	render() {
		return (
			<div>
				<ReactGantt
          templates={{
            myTasks: {
				      title: 'My Tasks',
              steps: [
                {
                  name: 'Task Phase One',
                  color: 'blue'
                },
                {
                  name: 'Task Phase Two',
                  color: 'green'
                }
              ]
			      }
		      }}
          leftBound={moment().set({hour: 0, date: 30, month: 5, year: 2016}).toDate()}
          rightBound={moment().set({hour: 0, date: 29, month: 8, year: 2016}).toDate()}
          dateFormat="YYYY-MM-DD HH:MM"
        >
          <GanttRow
            title="Task 1"
            template="myTasks"
            steps={[
              moment().set({hour: 0, date: 1, month: 6, year: 2016}).toDate(),
              moment().set({hour: 0, date: 4, month: 8, year: 2016}).toDate(),
				      moment().set({hour: 0, date: 17, month: 8, year: 2016}).toDate()
            ]}
          />
          <GanttRow
            title="Task 2"
            template="myTasks"
            steps={[
              moment().set({hour: 0, date: 27, month: 2, year: 2016}).toDate(),
              moment().set({hour: 0, date: 9, month: 7, year: 2016}).toDate(),
				      moment().set({hour: 0, date: 22, month: 7, year: 2016}).toDate()
            ]}
          />
          <GanttRow
            title="Task 3"
            template="myTasks"
            steps={[
              moment().set({hour: 0, date: 12, month: 6, year: 2016}).toDate(),
              moment().set({hour: 0, date: 2, month: 7, year: 2016}).toDate(),
              moment().set({hour: 0, date: 2, month: 8, year: 2016}).toDate(),
				      moment().set({hour: 0, date: 24, month: 9, year: 2016}).toDate()
            ]}
          />
        </ReactGantt>
			</div>
		);
	}
}

render(<Demo/>, document.querySelector('#demo'))
