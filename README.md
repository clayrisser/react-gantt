# ReactGantt

A gantt chart for react. Uses (optional) [react-bootstrap](https://react-bootstrap.github.io/) and [moment.js](https://momentjs.com/)


## Demo & Examples

Live demo: [jamrizzi.github.io/react-gantt](http://jamrizzi.github.io/react-gantt/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-gantt is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-gantt.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-gantt --save
```


## Usage

Import the component to your React project and include as per any other React component.

Available properties are `groups`, `rows` and `options` explained below.

```
import ReactGantt from 'react-gantt';

<ReactGantt>Example</ReactGantt>
```

### Properties

#### Options

```
<ReactGantt options={{ ...options }} />
```

| Attribute | Description | Required | Type | Example/Default  |
| :------------- |:-------------| :-----:| :-----:| :-----|
| leftBound | Date for left bounds of table | yes | string | '2017-03-20' |
| rightBound | Date for right bounds of table | yes | string | '2017-03-31' |
| beforeClimaxColor | Color for left hand side of event bar. Accepts any css colors | no | string | 'red' |
| afterClimaxColor | Color for left hand side of event bar. Accepts any css colors | no | string | 'blue' |
| labelWidth | Width of left hand label. Accepts any css units | no | string | '80px' |
| showBorders | Enable or disable the borders | no | boolean | true |
| maxIntervalWidth | Maximum width between intervals | no | number | 100 |
| intervalFormat | moment.js date format for intervals | no | string | 'YYYY MM DD' |
| bootstrapped | Use react-bootstrap table | no | boolean | false |
| responsive | Add responsive prop to bootstrap table | no | boolean | false |


#### Rows

```
const rows = [
	{
		title: 'Task 1',
		startDate: moment().set({hour: 0, date: 16, month: 8, year: 2016}).toDate(),
		climaxDate: moment().set({hour: 0, date: 20, month: 8, year: 2016}).toDate(),
		endDate: moment().set({hour: 0, date: 28, month: 8, year: 2016}).toDate(),
		group: 'myTasks',
		action: () => {console.log('the first one was clicked');}
	},
	...
];

return <ReactGantt rows={rows} />;
```


#### Groups

```
const groups = [
	{
		id: 'myTasks',
		title: 'My Tasks'
	},
	...
];

return <ReactGantt groups={groups} />;
```


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

This project is dual licensed under the MIT or GPL Version 3 licenses.

Copyright (c) 2016 Jam Risser.
