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
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import keycode from 'keycode';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import EventListener from 'react-event-listener';
import DateTextField from '../_shared/DateTextField';
import DomainPropTypes from '../constants/prop-types';
var InlineWrapper = /** @class */ (function (_super) {
    __extends(InlineWrapper, _super);
    function InlineWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            anchorEl: null,
        };
        _this.open = function (e) {
            _this.setState({ anchorEl: e.currentTarget });
            if (_this.props.onOpen) {
                _this.props.onOpen();
            }
        };
        _this.close = function () {
            _this.setState({ anchorEl: null });
            _this.props.handleAccept();
            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };
        _this.handleKeyDown = function (event) {
            switch (keycode(event)) {
                case 'enter': {
                    _this.props.handleAccept();
                    _this.close();
                    break;
                }
                default:
                    // if keycode is not handled, stop execution
                    return;
            }
            // if event was handled prevent other side effects
            event.preventDefault();
        };
        return _this;
    }
    InlineWrapper.getDerivedStateFromProps = function (nextProps) {
        // only if accept = true close the popover
        if (nextProps.isAccepted) {
            return {
                anchorEl: null,
            };
        }
        return null;
    };
    InlineWrapper.prototype.render = function () {
        var _a = this.props, value = _a.value, format = _a.format, children = _a.children, onOpen = _a.onOpen, onClose = _a.onClose, PopoverProps = _a.PopoverProps, isAccepted = _a.isAccepted, keyboard = _a.keyboard, onlyCalendar = _a.onlyCalendar, classes = _a.classes, handleAccept = _a.handleAccept, other = __rest(_a, ["value", "format", "children", "onOpen", "onClose", "PopoverProps", "isAccepted", "keyboard", "onlyCalendar", "classes", "handleAccept"]);
        var isOpen = Boolean(this.state.anchorEl);
        return (React.createElement(React.Fragment, null,
            isOpen && (React.createElement(EventListener, { target: "window", onKeyDown: this.handleKeyDown })),
            React.createElement(DateTextField, __assign({ value: value, format: format, onClick: this.open, keyboard: keyboard }, other)),
            React.createElement(Popover, __assign({ id: "picker-popover", open: isOpen, anchorEl: this.state.anchorEl, onClose: this.close, classes: {
                    paper: classes.popoverPaper,
                }, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: keyboard ? 'right' : 'center',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: keyboard ? 'right' : 'center',
                }, children: children }, PopoverProps))));
    };
    InlineWrapper.propTypes = {
        /** Show only calendar for datepicker in popover mode */
        onlyCalendar: PropTypes.bool,
        /** Picker value */
        value: DomainPropTypes.date,
        /** On open callback [(e: Event) => void] */
        onOpen: PropTypes.func,
        /** On close callback [(e: Event) => void] */
        onClose: PropTypes.func,
        /** Format string */
        format: PropTypes.string,
        /** Dialog props passed to material-ui Dialog */
        PopoverProps: PropTypes.object,
        labelFunc: PropTypes.func,
        onClear: PropTypes.func,
        isAccepted: PropTypes.bool,
        handleAccept: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        keyboard: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        innerRef: PropTypes.any,
    };
    InlineWrapper.defaultProps = {
        value: new Date(),
        labelFunc: undefined,
        onlyCalendar: false,
        format: undefined,
        onClear: undefined,
        onOpen: undefined,
        onClose: undefined,
        PopoverProps: undefined,
        isAccepted: false,
        keyboard: undefined,
    };
    return InlineWrapper;
}(React.PureComponent));
export { InlineWrapper };
var styles = {
    popoverPaper: {
        maxWidth: 310,
        minWidth: 290,
        paddingBottom: 8,
    },
};
// @ts-ignore
export default withStyles(styles)(InlineWrapper);
