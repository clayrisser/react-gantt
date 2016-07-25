var React = require('react');
var ReactDOM = require('react-dom');
var ReactGantt = require('react-gantt');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactGantt />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
