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
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Clock from './Clock';
import { withUtils } from '../../_shared/WithUtils';
import ClockType from '../../constants/ClockType';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
var TimePickerView = /** @class */ (function (_super) {
    __extends(TimePickerView, _super);
    function TimePickerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getViewProps = function () {
            var _a = _this.props, type = _a.type, ampm = _a.ampm, date = _a.date, utils = _a.utils;
            switch (type) {
                case ClockType.HOURS:
                    return {
                        value: utils.getHours(date),
                        children: getHourNumbers({ date: date, ampm: Boolean(ampm), utils: utils }),
                        onChange: _this.handleHourChange,
                    };
                case ClockType.MINUTES:
                    var minutesValue = utils.getMinutes(date);
                    return {
                        value: minutesValue,
                        children: getMinutesNumbers({ value: minutesValue, utils: utils }),
                        onChange: _this.handleMinutesChange,
                    };
                case ClockType.SECONDS:
                    var secondsValue = utils.getSeconds(date);
                    return {
                        value: secondsValue,
                        children: getMinutesNumbers({ value: secondsValue, utils: utils }),
                        onChange: _this.handleSecondsChange,
                    };
                default:
                    throw new Error('You must provide the type for TimePickerView');
            }
        };
        _this.handleHourChange = function (hours, isFinish) {
            var _a = _this.props, date = _a.date, utils = _a.utils;
            var updatedTime = utils.setHours(date, hours);
            _this.props.onHourChange(updatedTime, isFinish);
        };
        _this.handleMinutesChange = function (minutes, isFinish) {
            var _a = _this.props, date = _a.date, utils = _a.utils;
            var updatedTime = utils.setMinutes(date, minutes);
            _this.props.onMinutesChange(updatedTime, isFinish);
        };
        _this.handleSecondsChange = function (seconds, isFinish) {
            var _a = _this.props, date = _a.date, utils = _a.utils;
            var updatedTime = utils.setSeconds(date, seconds);
            _this.props.onSecondsChange(updatedTime, isFinish);
        };
        return _this;
    }
    TimePickerView.prototype.render = function () {
        var _a = this.props, ampm = _a.ampm, type = _a.type;
        var viewProps = this.getViewProps();
        return React.createElement(Clock, __assign({ type: type, ampm: ampm }, viewProps));
    };
    TimePickerView.propTypes = {
        date: PropTypes.object.isRequired,
        onHourChange: PropTypes.func.isRequired,
        onMinutesChange: PropTypes.func.isRequired,
        onSecondsChange: PropTypes.func.isRequired,
        utils: PropTypes.object.isRequired,
        ampm: PropTypes.bool,
        type: PropTypes.oneOf(Object.keys(ClockType).map(function (key) { return ClockType[key]; }))
            .isRequired,
    };
    TimePickerView.defaultProps = {
        ampm: true,
    };
    return TimePickerView;
}(React.PureComponent));
export { TimePickerView };
export default withUtils()(TimePickerView);
