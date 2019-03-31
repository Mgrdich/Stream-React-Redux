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
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { withUtils } from '../../_shared/WithUtils';
import DomainPropTypes from '../../constants/prop-types';
import Year from './Year';
var YearSelection = /** @class */ (function (_super) {
    __extends(YearSelection, _super);
    function YearSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedYearRef = undefined;
        _this.getSelectedYearRef = function (ref) {
            _this.selectedYearRef = ref;
        };
        _this.scrollToCurrentYear = function (domNode) {
            var animateYearScrolling = _this.props.animateYearScrolling;
            var currentYearElement = findDOMNode(domNode);
            if (currentYearElement && currentYearElement.scrollIntoView) {
                if (animateYearScrolling) {
                    setTimeout(function () { return currentYearElement.scrollIntoView({ behavior: 'smooth' }); }, 100);
                }
                else {
                    currentYearElement.scrollIntoView();
                }
            }
        };
        _this.componentDidMount = function () {
            if (_this.selectedYearRef) {
                _this.scrollToCurrentYear(_this.selectedYearRef);
            }
        };
        _this.onYearSelect = function (year) {
            var _a = _this.props, date = _a.date, onChange = _a.onChange, utils = _a.utils;
            var newDate = utils.setYear(date, year);
            onChange(newDate);
        };
        return _this;
    }
    YearSelection.prototype.render = function () {
        var _this = this;
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate, date = _a.date, classes = _a.classes, disablePast = _a.disablePast, disableFuture = _a.disableFuture, utils = _a.utils;
        var currentYear = utils.getYear(date);
        return (React.createElement("div", { className: classes.container }, utils.getYearRange(minDate, maxDate).map(function (year) {
            var yearNumber = utils.getYear(year);
            var selected = yearNumber === currentYear;
            return (React.createElement(Year, { key: utils.getYearText(year), selected: selected, value: yearNumber, onSelect: _this.onYearSelect, 
                // @ts-ignore
                ref: selected ? _this.getSelectedYearRef : undefined, disabled: (disablePast && utils.isBeforeYear(year, utils.date())) ||
                    (disableFuture && utils.isAfterYear(year, utils.date())) }, utils.getYearText(year)));
        })));
    };
    YearSelection.propTypes = {
        date: PropTypes.shape({}).isRequired,
        minDate: DomainPropTypes.date,
        maxDate: DomainPropTypes.date,
        classes: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        disablePast: PropTypes.bool,
        disableFuture: PropTypes.bool,
        animateYearScrolling: PropTypes.bool,
        utils: PropTypes.object.isRequired,
        innerRef: PropTypes.any,
    };
    YearSelection.defaultProps = {
        animateYearScrolling: false,
    };
    return YearSelection;
}(React.PureComponent));
export { YearSelection };
var styles = createStyles({
    container: {
        maxHeight: 300,
        overflowY: 'auto',
        justifyContent: 'center',
    },
});
export default withStyles(styles, { name: 'MuiPickersYearSelection' })(withUtils()(YearSelection));
