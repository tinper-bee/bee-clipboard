'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

var _beeModal = require('bee-modal');

var _beeModal2 = _interopRequireDefault(_beeModal);

var _beeButton = require('bee-button');

var _beeButton2 = _interopRequireDefault(_beeButton);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _beeFormControl = require('bee-form-control');

var _beeFormControl2 = _interopRequireDefault(_beeFormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//text和target都写的时候，target无效。 text的cut改为copy。
// target可以传css3选择器
var propTypes = {
    action: _react.PropTypes.oneOf(['copy', 'cut']),
    text: _react.PropTypes.string,
    success: _react.PropTypes.func,
    error: _react.PropTypes.func
};
var defaultProps = {
    id: 'id' + Math.round(Math.random() * 1000 + 1) + new Date().getTime(),
    action: 'copy',
    text: '',
    target: '',
    success: function success() {},
    error: function error() {}
};

var Clipboard = function (_Component) {
    _inherits(Clipboard, _Component);

    function Clipboard(props) {
        _classCallCheck(this, Clipboard);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            currect: false,
            actionTitle: '复制',
            modalShow: false,
            html: ''
        };
        _this.close = _this.close.bind(_this);
        return _this;
    }

    Clipboard.prototype.close = function close() {
        this.setState({
            modalShow: false
        });
    };

    Clipboard.prototype.componentWillMount = function componentWillMount() {
        var self = this;
        var _props = this.props,
            id = _props.id,
            action = _props.action,
            text = _props.text,
            target = _props.target,
            success = _props.success,
            error = _props.error;

        var title = action === 'copy' ? '复制' : '剪切';
        self.setState({
            actionTitle: title
        });
        var cb = new _clipboard2["default"]('#' + id);
        cb.on('success', function (e) {
            self.setState({
                currect: true
            });
            window.setTimeout(function () {
                self.setState({
                    currect: false
                });
            }, 1000);
            if (success instanceof Function) success();
        });
        cb.on('error', function (e) {
            self.setState({
                html: e.text,
                modalShow: true
            });
            _reactDom2["default"].findDOMNode(self.refs.text).select();
            if (error instanceof Function) error();
        });
    };

    Clipboard.prototype.render = function render() {
        var _props2 = this.props,
            id = _props2.id,
            action = _props2.action,
            text = _props2.text,
            target = _props2.target;

        if (text) action = 'copy';
        return _react2["default"].createElement(
            'span',
            { className: 'u-clipboard', id: id, 'data-clipboard-action': action,
                'data-clipboard-target': target, 'data-clipboard-text': text,
                title: this.state.actionTitle },
            this.props.children ? this.props.children : _react2["default"].createElement(
                _beeIcon2["default"],
                { className: (0, _classnames2["default"])({
                        'uf': true,
                        'uf-correct': this.state.currect,
                        'uf-copy': !this.state.currect
                    }) },
                ' '
            ),
            _react2["default"].createElement(
                _beeModal2["default"],
                { show: this.state.modalShow, onHide: this.close },
                _react2["default"].createElement(
                    _beeModal2["default"].Header,
                    { closeButton: true },
                    _react2["default"].createElement(
                        _beeModal2["default"].Title,
                        null,
                        ' \u590D\u5236\u5230\u526A\u5207\u677F '
                    )
                ),
                _react2["default"].createElement(
                    _beeModal2["default"].Body,
                    null,
                    _react2["default"].createElement(_beeFormControl2["default"], { ref: 'text', type: 'text', readOnly: true, value: this.state.html })
                ),
                _react2["default"].createElement(
                    _beeModal2["default"].Footer,
                    null,
                    _react2["default"].createElement(
                        _beeButton2["default"],
                        { onClick: this.close },
                        ' \u5173\u95ED '
                    )
                )
            )
        );
    };

    return Clipboard;
}(_react.Component);

;
Clipboard.propTypes = propTypes;
Clipboard.defaultProps = defaultProps;
exports["default"] = Clipboard;
module.exports = exports['default'];