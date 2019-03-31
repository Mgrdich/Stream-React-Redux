import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import PickerToolbar from '../../_shared/PickerToolbar';
import ToolbarButton from '../../_shared/ToolbarButton';
import { withUtils } from '../../_shared/WithUtils';
import DateTimePickerView from '../../constants/DateTimePickerView';
export var DateTimePickerHeader = function (props) {
    var date = props.date, classes = props.classes, openView = props.openView, meridiemMode = props.meridiemMode, onOpenViewChange = props.onOpenViewChange, setMeridiemMode = props.setMeridiemMode, theme = props.theme, utils = props.utils, ampm = props.ampm;
    var changeOpenView = function (view) { return function () {
        return onOpenViewChange(view);
    }; };
    var rtl = theme.direction === 'rtl';
    var hourMinuteClassName = rtl
        ? classes.hourMinuteLabelReverse
        : classes.hourMinuteLabel;
    return (React.createElement(PickerToolbar, { className: classes.toolbar },
        React.createElement("div", { className: classes.dateHeader },
            React.createElement(ToolbarButton, { variant: "subtitle1", onClick: changeOpenView(DateTimePickerView.YEAR), selected: openView === DateTimePickerView.YEAR, label: utils.getYearText(date) }),
            React.createElement(ToolbarButton, { variant: "h4", onClick: changeOpenView(DateTimePickerView.DATE), selected: openView === DateTimePickerView.DATE, label: utils.getDateTimePickerHeaderText(date) })),
        React.createElement("div", { className: classes.timeHeader },
            React.createElement("div", { className: hourMinuteClassName },
                React.createElement(ToolbarButton, { variant: "h3", onClick: changeOpenView(DateTimePickerView.HOUR), selected: openView === DateTimePickerView.HOUR, label: utils.getHourText(date, ampm) }),
                React.createElement(ToolbarButton, { variant: "h3", label: ":", selected: false, className: classes.separator }),
                React.createElement(ToolbarButton, { variant: "h3", onClick: changeOpenView(DateTimePickerView.MINUTES), selected: openView === DateTimePickerView.MINUTES, label: utils.getMinuteText(date) })),
            ampm && (React.createElement("div", { className: classes.ampmSelection },
                React.createElement(ToolbarButton, { className: classes.ampmLabel, selected: meridiemMode === 'am', variant: "subtitle1", label: utils.getMeridiemText('am'), onClick: setMeridiemMode('am') }),
                React.createElement(ToolbarButton, { className: classes.ampmLabel, selected: meridiemMode === 'pm', variant: "subtitle1", label: utils.getMeridiemText('pm'), onClick: setMeridiemMode('pm') }))))));
};
DateTimePickerHeader.propTypes = {
    date: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    meridiemMode: PropTypes.string.isRequired,
    openView: PropTypes.string.isRequired,
    onOpenViewChange: PropTypes.func.isRequired,
    setMeridiemMode: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    innerRef: PropTypes.any,
};
DateTimePickerHeader.defaultProps = {
    ampm: true,
};
var styles = function () {
    return createStyles({
        toolbar: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: 'space-around',
        },
        separator: {
            margin: '0 4px 0 2px',
            cursor: 'default',
        },
        ampmSelection: {
            marginLeft: 10,
            marginRight: -10,
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
        dateHeader: {
            height: 65,
        },
        timeHeader: {
            height: 65,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
    });
};
export default withStyles(styles, { withTheme: true })(withUtils()(DateTimePickerHeader));
