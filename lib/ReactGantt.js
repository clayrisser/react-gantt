'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactBootstrapLibTable = require('react-bootstrap/lib/Table');

var _reactBootstrapLibTable2 = _interopRequireDefault(_reactBootstrapLibTable);

var ReactGantt = (function (_Component) {
	_inherits(ReactGantt, _Component);

	function ReactGantt() {
		_classCallCheck(this, ReactGantt);

		_get(Object.getPrototypeOf(ReactGantt.prototype), 'constructor', this).call(this);
		this.state = {
			tableId: _underscore2['default'].sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 32).join(''),
			scaleMarksCount: 99,
			scaleDrawn: false
		};
	}

	_createClass(ReactGantt, [{
		key: 'renderBar',
		value: function renderBar(row) {
			var difference = (0, _moment2['default'])(this.props.options.leftBound).unix();
			var rightBound = (0, _moment2['default'])(this.props.options.rightBound).unix() - difference;
			var startDate = (0, _moment2['default'])(row.startDate).unix() - difference;
			if (startDate < 0) {
				startDate = 0;
			} else if (startDate > rightBound) {
				startDate = rightBound;
			}
			var climaxDate = (0, _moment2['default'])(row.climaxDate).unix() - difference;
			if (climaxDate < 0) {
				climaxDate = 0;
			} else if (climaxDate > rightBound) {
				climaxDate = rightBound;
			}
			var endDate = (0, _moment2['default'])(row.endDate).unix() - difference;
			if (endDate < 0) {
				endDate = 0;
			} else if (endDate > rightBound) {
				endDate = rightBound;
			}
			var leftPadWidth = startDate / rightBound * 100 + '%';
			var div1Width = (climaxDate - startDate) / rightBound * 100 + '%';
			var div2Width = (endDate - climaxDate) / rightBound * 100 + '%';
			var rightPadWidth = (rightBound - endDate) / rightBound * 100 + '%';
			var div1BackgroundColor = 'blue';
			if (row.beforeClimaxColor) {
				div1BackgroundColor = row.beforeClimaxColor;
			} else if (this.props.options.beforeClimaxColor) {
				div1BackgroundColor = this.props.options.beforeClimaxColor;
			}
			var div2BackgroundColor = 'red';
			if (row.afterClimaxColor) {
				div2BackgroundColor = row.afterClimaxColor;
			} else if (this.props.options.afterClimaxColor) {
				div2BackgroundColor = this.props.options.afterClimaxColor;
			}
			var bar1 = {
				marginTop: '2px',
				marginBottom: '2px',
				marginLeft: leftPadWidth,
				marginRight: '0px',
				backgroundColor: div1BackgroundColor,
				width: div1Width,
				float: 'left',
				height: '30px',
				borderTopLeftRadius: '10px',
				borderBottomLeftRadius: '10px',
				boxShadow: '2px 2px 4px #000000'
			};
			var bar2 = {
				marginTop: '2px',
				marginBottom: '2px',
				marginLeft: '0px',
				marginRight: rightPadWidth,
				backgroundColor: div2BackgroundColor,
				width: div2Width,
				float: 'left',
				height: '30px',
				borderTopRightRadius: '10px',
				borderBottomRightRadius: '10px',
				boxShadow: '2px 2px 4px #000000'
			};
			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement('div', { style: bar1 }),
				_react2['default'].createElement('div', { style: bar2 })
			);
		}
	}, {
		key: 'renderRows',
		value: function renderRows() {
			var rows = [];
			var labelWidth = '80px';
			if (this.props.options && this.props.options.labelWidth) {
				labelWidth = this.props.options.labelWidth;
			}
			var titleStyle = {
				textAlign: 'right',
				verticalAlign: 'middle',
				paddingRight: '10px',
				fontWeight: 'bold'
			};
			var timelineStyle = {
				width: '50%'
			};
			if (this.props.options.showBorders !== false) {
				titleStyle.border = 'solid';
				timelineStyle.border = 'solid';
			}
			var labelStyle = {
				width: labelWidth
			};
			for (var i = 0; i < this.props.rows.length; i++) {
				var rowObject = this.props.rows[i];
				var row = _react2['default'].createElement(
					'tr',
					{ key: i },
					_react2['default'].createElement(
						'td',
						{ style: titleStyle },
						_react2['default'].createElement(
							'div',
							{ style: labelStyle },
							rowObject.title
						)
					),
					_react2['default'].createElement(
						'td',
						{ style: timelineStyle },
						this.renderBar(rowObject)
					)
				);
				rows.push(row);
			}
			return rows;
		}
	}, {
		key: 'drawScale',
		value: function drawScale() {
			var leftBound = this.props.options.leftBound;
			var rightBound = this.props.options.rightBound;
			var minutes = 0;
			var hours = 0;
			var days = 0;
			var weeks = 0;
			var months = 0;
			var years = (0, _moment2['default'])(rightBound).diff((0, _moment2['default'])(leftBound), 'years');
			if (years < 2) {
				var months = (0, _moment2['default'])(rightBound).diff((0, _moment2['default'])(leftBound), 'months');
				if (months < 6) {
					var days = ((0, _moment2['default'])(rightBound).unix() - (0, _moment2['default'])(leftBound).unix()) / 24 / 60 / 60;
					if (days < 2) {
						var hours = (0, _moment2['default'])(rightBound).diff((0, _moment2['default'])(leftBound), 'hours');
						if (hours < 1) {
							var minutes = (0, _moment2['default'])(rightBound).diff((0, _moment2['default'])(leftBound), 'minutes');
							this.setState({ scale: this.calculateScale(minutes, 'minutes') });
						} else {
							this.setState({ scale: this.calculateScale(hours, 'hours') });
						}
					} else {
						this.setState({ scale: this.calculateScale(days, 'days') });
					}
				} else {
					this.setState({ scale: this.calculateScale(months, 'months') });
				}
			} else {
				this.setState({ scale: this.calculateScale(years, 'years') });
			}
		}
	}, {
		key: 'calculateScale',
		value: function calculateScale(count, type) {
			var difference = (0, _moment2['default'])(this.props.options.leftBound).unix();
			var widthByTime = (0, _moment2['default'])(this.props.options.rightBound).unix() - difference;
			var table = document.querySelector('#' + this.state.tableId + ' > thead td:nth-child(2)');
			var widthByPixels = table.offsetWidth;
			var markersCount = Math.round(widthByPixels / 100);
			var unitByPixels = widthByPixels / count;
			var maxIntervalWidth = 100;
			if (this.props.options.maxIntervalWidth) {
				maxIntervalWidth = this.props.options.maxIntervalWidth;
			}
			var unitsPerInterval = 1;
			if (maxIntervalWidth > unitByPixels) {
				unitsPerInterval = Math.floor(maxIntervalWidth / unitByPixels);
			}
			var intervalByPixels = unitsPerInterval * unitByPixels;
			var markersCount = Math.floor(widthByPixels / intervalByPixels);
			var markers = [];
			var style = {
				margin: '0px',
				padding: '0px',
				width: intervalByPixels + 'px',
				float: 'left',
				borderLeft: 'solid',
				borderWidth: '1px',
				paddingLeft: '5px',
				width: intervalByPixels + 'px'
			};
			for (var i = 0; i < markersCount; i++) {
				var date = (0, _moment2['default'])(difference * 1000);
				switch (type) {
					case 'years':
						date.add(i * unitsPerInterval, 'years');
						break;
					case 'months':
						date.add(i * unitsPerInterval, 'months');
						break;
					case 'days':
						date.add(i * unitsPerInterval, 'days');
						break;
					default:
				}
				var mark = _react2['default'].createElement(
					'div',
					{ key: i, style: style },
					date.format('YYYY MM DD')
				);
				markers.push(mark);
			}
			return _react2['default'].createElement(
				'div',
				null,
				markers
			);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.bootstraped = false;
			if (this.props.options.bootstraped) {
				this.bootstraped = this.props.options.bootstraped;
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.previousProps = this.props;
			this.drawScale();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.previousProps.options !== this.props.options || this.previousProps.rows !== this.props.rows) {
				// prevents infinite loop
				this.previousProps = this.props;
				this.drawScale();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var tableStyle = {
				width: '100%'
			};
			var scaleStyle = {
				width: '100%'
			};
			if (this.bootstraped) {
				return _react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(
						_reactBootstrapLibTable2['default'],
						{ id: this.state.tableId, style: tableStyle, striped: true, bordered: true, condensed: true, hover: true },
						_react2['default'].createElement(
							'thead',
							null,
							_react2['default'].createElement(
								'tr',
								null,
								_react2['default'].createElement('td', null),
								_react2['default'].createElement(
									'td',
									{ style: scaleStyle },
									this.state.scale
								)
							)
						),
						_react2['default'].createElement(
							'tbody',
							null,
							this.renderRows()
						)
					)
				);
			} else {
				return _react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(
						'table',
						{ id: this.state.tableId, style: tableStyle },
						_react2['default'].createElement(
							'thead',
							null,
							_react2['default'].createElement(
								'tr',
								null,
								_react2['default'].createElement('td', null),
								_react2['default'].createElement(
									'td',
									{ style: scaleStyle },
									this.state.scale
								)
							)
						),
						_react2['default'].createElement(
							'tbody',
							null,
							this.renderRows()
						)
					)
				);
			}
		}
	}]);

	return ReactGantt;
})(_react.Component);

exports['default'] = ReactGantt;
module.exports = exports['default'];