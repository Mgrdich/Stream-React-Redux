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
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import { convertToMeridiem } from '../_helpers/time-utils';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { withUtils } from '../_shared/WithUtils';
import ClockType from '../constants/ClockType';
import TimePickerView from './components/TimePickerView';
var TimePicker = /** @class */ (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            openView: ClockType.HOURS,
            meridiemMode: _this.props.utils.getHours(_this.props.date) >= 12 ? 'pm' : 'am',
        };
        _this.setMeridiemMode = function (mode) { return function () {
            _this.setState({ meridiemMode: mode }, function () {
                return _this.handleChange({
                    time: _this.props.date,
                    isFinish: false,
                    openMinutes: false,
                    openSeconds: false,
                });
            });
        }; };
        _this.handleChange = function (_a) {
            var time = _a.time, isFinish = _a.isFinish, openMinutes = _a.openMinutes, openSeconds = _a.openSeconds;
            var withMeridiem = convertToMeridiem(time, _this.state.meridiemMode, Boolean(_this.props.ampm), _this.props.utils);
            if (isFinish) {
                if (!openMinutes && !openSeconds) {
                    _this.props.onChange(withMeridiem, isFinish);
                    return;
                }
                if (openMinutes) {
                    _this.openMinutesView();
                }
                if (openSeconds) {
                    _this.openSecondsView();
                }
            }
            _this.props.onChange(withMeridiem, false);
        };
        _this.handleHourChange = function (time, isFinish) {
            _this.handleChange({
                time: time,
                isFinish: isFinish,
                openMinutes: true,
                openSeconds: false,
            });
        };
        _this.handleMinutesChange = function (time, isFinish) {
            _this.handleChange({
                time: time,
                isFinish: isFinish,
                openMinutes: false,
                openSeconds: Boolean(_this.props.seconds),
            });
        };
        _this.handleSecondsChange = function (time, isFinish) {
            _this.handleChange({
                time: time,
                isFinish: isFinish,
                openMinutes: false,
                openSeconds: false,
            });
        };
        _this.openSecondsView = function () {
            _this.setState({ openView: ClockType.SECONDS });
        };
        _this.openMinutesView = function () {
            _this.setState({ openView: ClockType.MINUTES });
        };
        _this.openHourView = function () {
            _this.setState({ openView: ClockType.HOURS });
        };
        return _this;
    }
    TimePicker.prototype.render = function () {
        var _a;
        var _b = this.props, classes = _b.classes, theme = _b.theme, date = _b.date, utils = _b.utils, ampm = _b.ampm, seconds = _b.seconds;
        var _c = this.state, meridiemMode = _c.meridiemMode, openView = _c.openView;
        var rtl = theme.direction === 'rtl';
        var hourMinuteClassName = rtl
            ? classes.hourMinuteLabelReverse
            : classes.hourMinuteLabel;
        return (React.createElement(React.Fragment, null,
            React.createElement(PickerToolbar, { className: classnames(classes.toolbar, (_a = {},
                    _a[classes.toolbarLeftPadding] = ampm,
                    _a)) },
                React.createElement("div", { className: hourMinuteClassName },
                    React.createElement(ToolbarButton, { variant: "h2", onClick: this.openHourView, selected: openView === ClockType.HOURS, label: utils.getHourText(date, Boolean(ampm)) }),
                    React.createElement(ToolbarButton, { variant: "h2", label: ":", selected: false, className: classes.separator }),
                    React.createElement(ToolbarButton, { variant: "h2", onClick: this.openMinutesView, selected: openView === ClockType.MINUTES, label: utils.getMinuteText(date) }),
                    seconds && (React.createElement(React.Fragment, null,
                        React.createElement(ToolbarButton, { variant: "h2", label: ":", selected: false, className: classes.separator }),
                        React.createElement(ToolbarButton, { variant: "h2", onClick: this.openSecondsView, selected: openView === ClockType.SECONDS, label: utils.getSecondText(date) })))),
                ampm && (React.createElement("div", { className: seconds
                        ? classes.ampmSelectionWithSeconds
                        : classes.ampmSelection },
                    React.createElement(ToolbarButton, { className: classes.ampmLabel, selected: meridiemMode === 'am', variant: "subtitle1", label: utils.getMeridiemText('am'), onClick: this.setMeridiemMode('am') }),
                    React.createElement(ToolbarButton, { className: classes.ampmLabel, selected: meridiemMode === 'pm', variant: "subtitle1", label: utils.getMeridiemText('pm'), onClick: this.setMeridiemMode('pm') })))),
            this.props.children,
            React.createElement(TimePickerView, { date: date, type: this.state.openView, ampm: ampm, onHourChange: this.handleHourChange, onMinutesChange: this.handleMinutesChange, onSecondsChange: this.handleSecondsChange })));
    };
    TimePicker.propTypes = {
        date: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        children: PropTypes.node,
        utils: PropTypes.object.isRequired,
        ampm: PropTypes.bool,
        seconds: PropTypes.bool,
        innerRef: PropTypes.any,
    };
    TimePicker.defaultProps = {
        children: null,
        ampm: true,
        seconds: false,
    };
    return TimePicker;
}(React.Component));
export { TimePicker };
var styles = function () {
    return createStyles({
        toolbar: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        toolbarLeftPadding: {
            paddingLeft: 50,
        },
        separator: {
            margin: '0 4px 0 2px',
            cursor: 'default',
        },
        ampmSelection: {
            marginLeft: 20,
            marginRight: -20,
        },
        ampmSelectionWithSeconds: {
            marginLeft: 15,
            marginRight: 10,
        },
        ampmLabel: {
            fontSize: 18,
        },
        hourMinuteLabel: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        hourMinuteLabelReverse: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'row-reverse',
        },
    });
};
export default withStyles(styles, {
    withTheme: true,
    name: 'MuiPickersTimePicker',
})(withUtils()(TimePicker));
