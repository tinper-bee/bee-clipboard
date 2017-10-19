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

var _beeTooltip = require('bee-tooltip');

var _beeTooltip2 = _interopRequireDefault(_beeTooltip);

var _OverlayTrigger = require('bee-overlay/build/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

//text和target都写的时候，target无效。 text的cut改为copy。
// target可以传css3选择器
var propTypes = {
    action: _propTypes2["default"].oneOf(['copy', 'cut']),
    text: _propTypes2["default"].string,
    success: _propTypes2["default"].func,
    error: _propTypes2["default"].func
};
var defaultProps = {
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
            html: '',
            tootipContent: '复制',
            id: 'id' + Math.round(Math.random() * 1000 + 1) + new Date().getTime()
        };
        _this.close = _this.close.bind(_this);
        _this.blur = _this.blur.bind(_this);
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
            action = _props.action,
            success = _props.success,
            error = _props.error;

        var title = action === 'copy' ? '复制' : '剪切';
        self.setState({
            actionTitle: title
        });
        var id = this.state.id;
        var cb = new _clipboard2["default"]('#' + id);
        cb.on('success', function (e) {
            self.setState({
                currect: true,
                tootipContent: '已复制'
            });
            e.clearSelection();
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

    Clipboard.prototype.blur = function blur() {
        this.setState({
            currect: false,
            tootipContent: '复制'
        });
    };

    Clipboard.prototype.render = function render() {
        var seft = this;
        var _props2 = this.props,
            action = _props2.action,
            text = _props2.text,
            target = _props2.target;

        if (text) action = 'copy';
        var tooltip = function tooltip() {
            return _react2["default"].createElement(
                _beeTooltip2["default"],
                { positionTop: '20px' },
                seft.state.tootipContent,
                ' '
            );
        };
        return _react2["default"].createElement(
            _OverlayTrigger2["default"],
            { overlay: tooltip(), placement: 'top' },
            _react2["default"].createElement(
                'span',
                { onMouseOut: this.blur, className: 'u-clipboard', id: this.state.id, 'data-clipboard-action': action,
                    'data-clipboard-target': target, 'data-clipboard-text': text },
                this.props.children ? this.props.children : _react2["default"].createElement(
                    _beeIcon2["default"],
                    { className: (0, _classnames2["default"])({
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
                            ' Ctrl+C \u590D\u5236\u5230\u526A\u5207\u677F '
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