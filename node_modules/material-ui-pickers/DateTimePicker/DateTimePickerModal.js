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
import ModalWrapper from '../wrappers/ModalWrapper';
import DateTimePicker from './DateTimePicker';
export var DateTimePickerModal = function (props) {
    var value = props.value, format = props.format, autoOk = props.autoOk, openTo = props.openTo, minDate = props.minDate, maxDate = props.maxDate, initialFocusedDate = props.initialFocusedDate, showTabs = props.showTabs, autoSubmit = props.autoSubmit, disablePast = props.disablePast, disableFuture = props.disableFuture, leftArrowIcon = props.leftArrowIcon, rightArrowIcon = props.rightArrowIcon, dateRangeIcon = props.dateRangeIcon, timeIcon = props.timeIcon, renderDay = props.renderDay, ampm = props.ampm, shouldDisableDate = props.shouldDisableDate, animateYearScrolling = props.animateYearScrolling, forwardedRef = props.forwardedRef, allowKeyboardControl = props.allowKeyboardControl, other = __rest(props, ["value", "format", "autoOk", "openTo", "minDate", "maxDate", "initialFocusedDate", "showTabs", "autoSubmit", "disablePast", "disableFuture", "leftArrowIcon", "rightArrowIcon", "dateRangeIcon", "timeIcon", "renderDay", "ampm", "shouldDisableDate", "animateYearScrolling", "forwardedRef", "allowKeyboardControl"]);
    return (React.createElement(BasePicker, __assign({}, props), function (_a) {
        var date = _a.date, utils = _a.utils, handleAccept = _a.handleAccept, handleChange = _a.handleChange, handleClear = _a.handleClear, handleDismiss = _a.handleDismiss, handleSetTodayDate = _a.handleSetTodayDate, handleTextFieldChange = _a.handleTextFieldChange, isAccepted = _a.isAccepted, pick12hOr24hFormat = _a.pick12hOr24hFormat;
        return (React.createElement(ModalWrapper, __assign({ ref: forwardedRef, disableFuture: disableFuture, disablePast: disablePast, maxDate: maxDate, minDate: minDate, onAccept: handleAccept, onChange: handleTextFieldChange, onClear: handleClear, onDismiss: handleDismiss, onSetToday: handleSetTodayDate, value: value, isAccepted: isAccepted, format: pick12hOr24hFormat(utils.dateTime12hFormat, utils.dateTime24hFormat) }, other),
            React.createElement(DateTimePicker, { allowKeyboardControl: allowKeyboardControl, ampm: ampm, animateYearScrolling: animateYearScrolling, autoSubmit: autoSubmit, date: date, dateRangeIcon: dateRangeIcon, disableFuture: disableFuture, disablePast: disablePast, leftArrowIcon: leftArrowIcon, maxDate: maxDate, minDate: minDate, onChange: handleChange, openTo: openTo, renderDay: renderDay, rightArrowIcon: rightArrowIcon, shouldDisableDate: shouldDisableDate, showTabs: showTabs, timeIcon: timeIcon })));
    }));
};
DateTimePickerModal.propTypes = {
    /** Date-time picker value */
    value: DomainPropTypes.date,
    /** Date format string for input */
    format: PropTypes.string,
    /** Callback firing when date accepted [(date: Date) => void] */
    onChange: PropTypes.func.isRequired,
    /** Auto accept date on minute selection */
    autoOk: PropTypes.bool,
    /** Move to the next part of date on select (year -> date -> hour -> minute) */
    autoSubmit: PropTypes.bool,
    /** Disable future dates */
    disableFuture: PropTypes.bool,
    /** Disable past dates */
    disablePast: PropTypes.bool,
    /** Min selectable date */
    minDate: DomainPropTypes.date,
    /** Max selectable date */
    maxDate: DomainPropTypes.date,
    /** Initial focused date when calendar opens, if no value is provided */
    initialFocusedDate: DomainPropTypes.date,
    /** Show date/time tabs */
    showTabs: PropTypes.bool,
    /** Left arrow icon */
    leftArrowIcon: PropTypes.node,
    /** Right arrow icon */
    rightArrowIcon: PropTypes.node,
    /** Date tab icon */
    dateRangeIcon: PropTypes.node,
    /** Time tab icon */
    timeIcon: PropTypes.node,
    /**
     * Custom renderer for day
     * [(date: Date, nowSelectedDate: Date, isInCurrentMonth: boolean) => ReactElement]
     */
    renderDay: PropTypes.func,
    /** 12h/24h view for hour selection clock */
    ampm: PropTypes.bool,
    /** Disable specific date [(date: Date) => boolean] */
    shouldDisableDate: PropTypes.func,
    /** Enable animated scrolling to current year */
    animateYearScrolling: PropTypes.bool,
    /** Open directly to particular view */
    openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
    /** Enables keyboard listener for moving between days in calendar */
    allowKeyboardControl: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
DateTimePickerModal.defaultProps = {
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
export default React.forwardRef(function (props, ref) { return (React.createElement(DateTimePickerModal, __assign({}, props, { forwardedRef: ref }))); });
