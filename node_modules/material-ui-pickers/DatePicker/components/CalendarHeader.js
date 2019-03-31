import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { withUtils } from '../../_shared/WithUtils';
import SlideTransition from './SlideTransition';
export var CalendarHeader = function (_a) {
    var classes = _a.classes, theme = _a.theme, currentMonth = _a.currentMonth, onMonthChange = _a.onMonthChange, leftArrowIcon = _a.leftArrowIcon, rightArrowIcon = _a.rightArrowIcon, disablePrevMonth = _a.disablePrevMonth, disableNextMonth = _a.disableNextMonth, utils = _a.utils, slideDirection = _a.slideDirection;
    var rtl = theme.direction === 'rtl';
    var selectNextMonth = function () {
        return onMonthChange(utils.getNextMonth(currentMonth), 'left');
    };
    var selectPreviousMonth = function () {
        return onMonthChange(utils.getPreviousMonth(currentMonth), 'right');
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: classes.switchHeader },
            React.createElement(IconButton, { disabled: disablePrevMonth, onClick: selectPreviousMonth, className: classes.iconButton },
                React.createElement(Icon, null, rtl ? rightArrowIcon : leftArrowIcon)),
            React.createElement(SlideTransition, { slideDirection: slideDirection, transKey: currentMonth.toString(), className: classes.transitionContainer },
                React.createElement(Typography, { align: "center", variant: "body1" }, utils.getCalendarHeaderText(currentMonth))),
            React.createElement(IconButton, { disabled: disableNextMonth, onClick: selectNextMonth, className: classes.iconButton },
                React.createElement(Icon, null, rtl ? leftArrowIcon : rightArrowIcon))),
        React.createElement("div", { className: classes.daysHeader }, utils.getWeekdays().map(function (day, index) { return (React.createElement(Typography, { key: index, variant: "caption", className: classes.dayLabel }, day)); }))));
};
CalendarHeader.propTypes = {
    currentMonth: PropTypes.object.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    disablePrevMonth: PropTypes.bool,
    disableNextMonth: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    slideDirection: PropTypes.oneOf(['right', 'left']).isRequired,
    innerRef: PropTypes.any,
};
CalendarHeader.defaultProps = {
    leftArrowIcon: 'keyboard_arrow_left',
    rightArrowIcon: 'keyboard_arrow_right',
    disablePrevMonth: false,
    disableNextMonth: false,
};
var styles = function (theme) {
    return createStyles({
        switchHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing.unit / 2,
            marginBottom: theme.spacing.unit,
        },
        transitionContainer: {
            width: '100%',
            height: 20,
        },
        iconButton: {
            zIndex: 2,
            backgroundColor: theme.palette.background.paper,
            '& > *': {
                // label
                backgroundColor: theme.palette.background.paper,
                '& > *': {
                    // icon
                    zIndex: 1,
                    overflow: 'visible',
                },
            },
        },
        daysHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: 16,
        },
        dayLabel: {
            width: 36,
            margin: '0 2px',
            textAlign: 'center',
            color: theme.palette.text.hint,
        },
    });
};
export default withStyles(styles, {
    withTheme: true,
    name: 'MuiPickersCalendarHeader',
})(withUtils()(CalendarHeader));
