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
import * as React from 'react';
import { withUtils } from './WithUtils';
var getInitialDate = function (_a) {
    var utils = _a.utils, value = _a.value, initialFocusedDate = _a.initialFocusedDate;
    var initialDate = value || initialFocusedDate || utils.date();
    var date = utils.date(initialDate);
    return utils.isValid(date) ? date : utils.date();
};
var BasePicker = /** @class */ (function (_super) {
    __extends(BasePicker, _super);
    function BasePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            date: getInitialDate(_this.props),
            isAccepted: false,
        };
        _this.changeDate = function (date, callback) {
            return _this.setState({ date: date }, callback);
        };
        _this.handleAcceptedChange = function (isAccepted, callback) {
            return _this.setState({ isAccepted: isAccepted }, callback);
        };
        _this.handleClear = function () { return _this.props.onChange(null); };
        _this.handleAccept = function () { return _this.props.onChange(_this.state.date); };
        _this.handleSetTodayDate = function () {
            return _this.handleChange(_this.props.utils.date(), false);
        };
        _this.handleTextFieldChange = function (date) {
            var onChange = _this.props.onChange;
            if (date === null) {
                onChange(null);
            }
            else {
                _this.changeDate(date, function () { return onChange(date); });
            }
        };
        _this.pick12hOr24hFormat = function (default12hFormat, default24hFormat) {
            var _a = _this.props, format = _a.format, ampm = _a.ampm;
            if (format) {
                return format;
            }
            return ampm ? default12hFormat : default24hFormat;
        };
        _this.handleChange = function (newDate, isFinish) {
            if (isFinish === void 0) { isFinish = true; }
            var _a = _this.props, autoOk = _a.autoOk, onChange = _a.onChange;
            _this.changeDate(newDate, function () {
                if (isFinish && autoOk) {
                    onChange(newDate);
                    // pass down accept true, and make it false in the next tick
                    _this.handleAcceptedChange(true, function () { return _this.handleAcceptedChange(false); });
                }
            });
        };
        _this.handleDismiss = function () {
            _this.setState({ date: getInitialDate(_this.props) });
        };
        return _this;
    }
    BasePicker.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, utils = _a.utils, value = _a.value, initialFocusedDate = _a.initialFocusedDate;
        if (prevProps.value !== value ||
            prevProps.utils.locale !== utils.locale ||
            prevProps.initialFocusedDate !== initialFocusedDate) {
            this.changeDate(getInitialDate(this.props));
        }
    };
    BasePicker.prototype.render = function () {
        return this.props.children(__assign({}, this.state, { utils: this.props.utils, changeDate: this.changeDate, handleAcceptedChange: this.handleAcceptedChange, handleClear: this.handleClear, handleAccept: this.handleAccept, handleDismiss: this.handleDismiss, handleSetTodayDate: this.handleSetTodayDate, handleTextFieldChange: this.handleTextFieldChange, pick12hOr24hFormat: this.pick12hOr24hFormat, handleChange: this.handleChange }));
    };
    return BasePicker;
}(React.Component));
export { BasePicker };
export default withUtils()(BasePicker);
