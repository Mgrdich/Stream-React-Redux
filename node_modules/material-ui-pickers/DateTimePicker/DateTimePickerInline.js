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
import * as PropTypes from 'prop-types';
import * as React from 'react';
import BasePicker from '../_shared/BasePicker';
import DomainPropTypes from '../constants/prop-types';
import InlineWrapper from '../wrappers/InlineWrapper';
import DateTimePicker from './DateTimePicker';
export var DateTimePickerInline = function (props) {
    var value = props.value, format = props.format, autoOk = props.autoOk, openTo = props.openTo, minDate = props.minDate, maxDate = props.maxDate, initialFocusedDate = props.initialFocusedDate, showTabs = props.showTabs, autoSubmit = props.autoSubmit, disablePast = props.disablePast, disableFuture = props.disableFuture, leftArrowIcon = props.leftArrowIcon, rightArrowIcon = props.rightArrowIcon, dateRangeIcon = props.dateRangeIcon, timeIcon = props.timeIcon, renderDay = props.renderDay, ampm = props.ampm, shouldDisableDate = props.shouldDisableDate, animateYearScrolling = props.animateYearScrolling, forwardedRef = props.forwardedRef, allowKeyboardControl = props.allowKeyboardControl, other = __rest(props, ["value", "format", "autoOk", "openTo", "minDate", "maxDate", "initialFocusedDate", "showTabs", "autoSubmit", "disablePast", "disableFuture", "leftArrowIcon", "rightArrowIcon", "dateRangeIcon", "timeIcon", "renderDay", "ampm", "shouldDisableDate", "animateYearScrolling", "forwardedRef", "allowKeyboardControl"]);
    return (React.createElement(BasePicker, __assign({}, props, { autoOk: true }), function (_a) {
        var date = _a.date, utils = _a.utils, handleChange = _a.handleChange, handleTextFieldChange = _a.handleTextFieldChange, isAccepted = _a.isAccepted, pick12hOr24hFormat = _a.pick12hOr24hFormat, handleAccept = _a.handleAccept;
        return (React.createElement(InlineWrapper, __assign({ innerRef: forwardedRef, disableFuture: disableFuture, disablePast: disablePast, maxDate: maxDate, minDate: minDate, onChange: handleTextFieldChange, value: value, isAccepted: isAccepted, handleAccept: handleAccept, format: pick12hOr24hFormat(utils.dateTime12hFormat, utils.dateTime24hFormat) }, other),
            React.createElement(DateTimePicker, { allowKeyboardControl: allowKeyboardControl, ampm: ampm, animateYearScrolling: animateYearScrolling, autoSubmit: autoSubmit, date: date, dateRangeIcon: dateRangeIcon, disableFuture: disableFuture, disablePast: disablePast, leftArrowIcon: leftArrowIcon, maxDate: maxDate, minDate: minDate, onChange: handleChange, openTo: openTo, renderDay: renderDay, rightArrowIcon: rightArrowIcon, shouldDisableDate: shouldDisableDate, showTabs: showTabs, timeIcon: timeIcon })));
    }));
};
DateTimePickerInline.propTypes = {
    value: DomainPropTypes.date,
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    autoSubmit: PropTypes.bool,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    initialFocusedDate: DomainPropTypes.date,
    showTabs: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    dateRangeIcon: PropTypes.node,
    timeIcon: PropTypes.node,
    renderDay: PropTypes.func,
    ampm: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    animateYearScrolling: PropTypes.bool,
    openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
    allowKeyboardControl: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
DateTimePickerInline.defaultProps = {
    value: new Date(),
    format: undefined,
    autoOk: false,
    autoSubmit: true,
    openTo: 'date',
    disableFuture: false,
    disablePast: false,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    initialFocusedDate: undefined,
    showTabs: true,
    leftArrowIcon: 'keyboard_arrow_left',
    rightArrowIcon: 'keyboard_arrow_right',
    dateRangeIcon: 'date_range',
    timeIcon: 'access_time',
    renderDay: undefined,
    ampm: true,
    shouldDisableDate: undefined,
    animateYearScrolling: false,
    forwardedRef: undefined,
    allowKeyboardControl: true,
};
export default React.forwardRef(function (props, ref) { return (React.createElement(DateTimePickerInline, __assign({}, props, { forwardedRef: ref }))); });
