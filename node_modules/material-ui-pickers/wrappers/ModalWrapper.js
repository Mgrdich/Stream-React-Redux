var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateTextField from '../_shared/DateTextField';
import ModalDialog from '../_shared/ModalDialog';
import DomainPropTypes from '../constants/prop-types';
var ModalWrapper = /** @class */ (function (_super) {
    __extends(ModalWrapper, _super);
    function ModalWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            open: false,
        };
        _this.handleKeyDown = function (event) {
            switch (keycode(event)) {
                case 'enter':
                    _this.handleAccept();
                    break;
                default:
                    // if keycode is not handled, stop execution
                    return;
            }
            // if event was handled prevent other side effects
            event.preventDefault();
        };
        _this.handleSetTodayDate = function () {
            if (_this.props.onSetToday) {
                _this.props.onSetToday();
            }
        };
        _this.open = function () {
            _this.setState({ open: true });
            if (_this.props.onOpen) {
                _this.props.onOpen();
            }
        };
        _this.close = function () {
            _this.setState({ open: false });
            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };
        _this.handleAccept = function () {
            _this.close();
            if (_this.props.onAccept) {
                _this.props.onAccept();
            }
        };
        _this.handleDismiss = function () {
            _this.close();
            if (_this.props.onDismiss) {
                _this.props.onDismiss();
            }
        };
        _this.handleClear = function () {
            _this.close();
            if (_this.props.onClear) {
                _this.props.onClear();
            }
        };
        return _this;
    }
    ModalWrapper.getDerivedStateFromProps = function (nextProps) {
        // only if accept = true close the dialog
        if (nextProps.isAccepted) {
            return {
                open: false,
            };
        }
        return null;
    };
    ModalWrapper.prototype.render = function () {
        var _a = this.props, value = _a.value, format = _a.format, children = _a.children, dialogContentClassName = _a.dialogContentClassName, onAccept = _a.onAccept, onDismiss = _a.onDismiss, invalidLabel = _a.invalidLabel, labelFunc = _a.labelFunc, okLabel = _a.okLabel, cancelLabel = _a.cancelLabel, clearLabel = _a.clearLabel, clearable = _a.clearable, todayLabel = _a.todayLabel, showTodayButton = _a.showTodayButton, onOpen = _a.onOpen, onClose = _a.onClose, onSetToday = _a.onSetToday, isAccepted = _a.isAccepted, DialogProps = _a.DialogProps, other = __rest(_a, ["value", "format", "children", "dialogContentClassName", "onAccept", "onDismiss", "invalidLabel", "labelFunc", "okLabel", "cancelLabel", "clearLabel", "clearable", "todayLabel", "showTodayButton", "onOpen", "onClose", "onSetToday", "isAccepted", "DialogProps"]);
        return (React.createElement(React.Fragment, null,
            React.createElement(DateTextField, __assign({ value: value, format: format, onClick: this.open, 
                // onFocus={this.togglePicker} <- Currently not properly works with .blur() on TextField
                invalidLabel: invalidLabel, labelFunc: labelFunc, clearable: clearable }, other)),
            React.createElement(ModalDialog, __assign({ open: this.state.open, onKeyDown: this.handleKeyDown, onClear: this.handleClear, onAccept: this.handleAccept, onDismiss: this.handleDismiss, onSetToday: this.handleSetTodayDate, dialogContentClassName: dialogContentClassName, clearLabel: clearLabel, todayLabel: todayLabel, okLabel: okLabel, cancelLabel: cancelLabel, clearable: clearable, showTodayButton: showTodayButton, children: children }, DialogProps))));
    };
    ModalWrapper.propTypes = {
        okLabel: PropTypes.node,
        cancelLabel: PropTypes.node,
        clearLabel: PropTypes.node,
        clearable: PropTypes.bool,
        todayLabel: PropTypes.string,
        showTodayButton: PropTypes.bool,
        onOpen: PropTypes.func,
        format: PropTypes.string,
        /** Dialog props passed to material-ui Dialog */
        DialogProps: PropTypes.object,
        value: DomainPropTypes.date,
        invalidLabel: PropTypes.node,
        labelFunc: PropTypes.func,
        onClose: PropTypes.func,
        onAccept: PropTypes.func,
        onDismiss: PropTypes.func,
        onClear: PropTypes.func,
        onSetToday: PropTypes.func,
        children: PropTypes.node.isRequired,
        dialogContentClassName: PropTypes.string,
        isAccepted: PropTypes.bool.isRequired,
    };
    ModalWrapper.defaultProps = {
        dialogContentClassName: '',
        invalidLabel: undefined,
        value: new Date(),
        labelFunc: undefined,
        okLabel: 'OK',
        cancelLabel: 'Cancel',
        clearLabel: 'Clear',
        todayLabel: 'Today',
        clearable: false,
        showTodayButton: false,
        format: undefined,
        onAccept: undefined,
        onDismiss: undefined,
        onClear: undefined,
        onOpen: undefined,
        onClose: undefined,
        onSetToday: undefined,
        DialogProps: undefined,
        isAccepted: false,
    };
    return ModalWrapper;
}(React.PureComponent));
export default ModalWrapper;
