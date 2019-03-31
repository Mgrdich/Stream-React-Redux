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
import * as PropTypes from 'prop-types';
import * as React from 'react';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { withUtils } from '../_shared/WithUtils';
import DomainPropTypes from '../constants/prop-types';
import Calendar from './components/Calendar';
import YearSelection from './components/YearSelection';
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showYearSelection: Boolean(_this.props.openToYearSelection),
        };
        _this.handleYearSelect = function (date) {
            _this.props.onChange(date, false);
            _this.openCalendar();
        };
        _this.openYearSelection = function () {
            _this.setState({ showYearSelection: true });
        };
        _this.openCalendar = function () {
            _this.setState({ showYearSelection: false });
        };
        return _this;
    }
    Object.defineProperty(DatePicker.prototype, "date", {
        get: function () {
            return this.props.date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "minDate", {
        get: function () {
            return this.props.utils.date(this.props.minDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePicker.prototype, "maxDate", {
        get: function () {
            return this.props.utils.date(this.props.maxDate);
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.render = function () {
        var showYearSelection = this.state.showYearSelection;
        var _a = this.props, disablePast = _a.disablePast, disableFuture = _a.disableFuture, onChange = _a.onChange, animateYearScrolling = _a.animateYearScrolling, leftArrowIcon = _a.leftArrowIcon, rightArrowIcon = _a.rightArrowIcon, renderDay = _a.renderDay, utils = _a.utils, shouldDisableDate = _a.shouldDisableDate, allowKeyboardControl = _a.allowKeyboardControl;
        return (React.createElement(React.Fragment, null,
            React.createElement(PickerToolbar, null,
                React.createElement(ToolbarButton, { variant: "subtitle1", onClick: this.openYearSelection, selected: showYearSelection, label: utils.getYearText(this.date) }),
                React.createElement(ToolbarButton, { variant: "h4", onClick: this.openCalendar, selected: !showYearSelection, label: utils.getDatePickerHeaderText(this.date) })),
            this.props.children,
            showYearSelection ? (React.createElement(YearSelection, { date: this.date, onChange: this.handleYearSelect, minDate: this.minDate, maxDate: this.maxDate, disablePast: disablePast, disableFuture: disableFuture, animateYearScrolling: animateYearScrolling })) : (React.createElement(Calendar, { date: this.date, onChange: onChange, disablePast: disablePast, disableFuture: disableFuture, minDate: this.minDate, maxDate: this.maxDate, leftArrowIcon: leftArrowIcon, rightArrowIcon: rightArrowIcon, renderDay: renderDay, shouldDisableDate: shouldDisableDate, allowKeyboardControl: allowKeyboardControl }))));
    };
    DatePicker.propTypes = {
        date: PropTypes.object.isRequired,
        minDate: DomainPropTypes.date,
        maxDate: DomainPropTypes.date,
        onChange: PropTypes.func.isRequired,
        disablePast: PropTypes.bool,
        disableFuture: PropTypes.bool,
        animateYearScrolling: PropTypes.bool,
        openToYearSelection: PropTypes.bool,
        children: PropTypes.node,
        leftArrowIcon: PropTypes.node,
        rightArrowIcon: PropTypes.node,
        renderDay: PropTypes.func,
        utils: PropTypes.object.isRequired,
        shouldDisableDate: PropTypes.func,
        allowKeyboardControl: PropTypes.bool,
        initialFocusedDate: DomainPropTypes.date,
    };
    DatePicker.defaultProps = {
        minDate: '1900-01-01',
        maxDate: '2100-01-01',
        disablePast: false,
        disableFuture: false,
        allowKeyboardControl: false,
        animateYearScrolling: undefined,
        openToYearSelection: false,
        children: null,
        leftArrowIcon: undefined,
        rightArrowIcon: undefined,
        renderDay: undefined,
        shouldDisableDate: undefined,
    };
    return DatePicker;
}(React.PureComponent));
export { DatePicker };
export default withUtils()(DatePicker);
