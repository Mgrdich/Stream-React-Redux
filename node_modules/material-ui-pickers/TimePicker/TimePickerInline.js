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
import TimePicker from './TimePicker';
export var TimePickerInline = function (props) {
    var value = props.value, format = props.format, onChange = props.onChange, ampm = props.ampm, forwardedRef = props.forwardedRef, seconds = props.seconds, other = __rest(props, ["value", "format", "onChange", "ampm", "forwardedRef", "seconds"]);
    return (React.createElement(BasePicker, __assign({}, props, { autoOk: true }), function (_a) {
        var date = _a.date, utils = _a.utils, handleChange = _a.handleChange, handleTextFieldChange = _a.handleTextFieldChange, isAccepted = _a.isAccepted, pick12hOr24hFormat = _a.pick12hOr24hFormat, handleAccept = _a.handleAccept;
        return (React.createElement(InlineWrapper, __assign({ innerRef: forwardedRef, value: value, onChange: handleTextFieldChange, isAccepted: isAccepted, handleAccept: handleAccept, format: pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat) }, other),
            React.createElement(TimePicker, { date: date, onChange: handleChange, ampm: ampm, seconds: seconds })));
    }));
};
TimePickerInline.propTypes = {
    value: DomainPropTypes.date,
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    ampm: PropTypes.bool,
    seconds: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
TimePickerInline.defaultProps = {
    ampm: true,
    value: new Date(),
    format: undefined,
    forwardedRef: undefined,
    seconds: false,
};
export default React.forwardRef(function (props, ref) { return (React.createElement(TimePickerInline, __assign({}, props, { forwardedRef: ref }))); });
