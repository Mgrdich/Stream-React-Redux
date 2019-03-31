import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateTimePickerView from '../../constants/DateTimePickerView';
var viewToTabIndex = function (openView) {
    if (openView === DateTimePickerView.DATE ||
        openView === DateTimePickerView.YEAR) {
        return 'date';
    }
    return 'time';
};
var tabIndexToView = function (tab) {
    if (tab === 'date') {
        return DateTimePickerView.DATE;
    }
    return DateTimePickerView.HOUR;
};
export var DateTimePickerTabs = function (props) {
    var view = props.view, onChange = props.onChange, classes = props.classes, theme = props.theme, dateRangeIcon = props.dateRangeIcon, timeIcon = props.timeIcon;
    var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
    var handleChange = function (e, value) {
        if (value !== viewToTabIndex(view)) {
            onChange(tabIndexToView(value));
        }
    };
    return (React.createElement(Paper, null,
        React.createElement(Tabs, { fullWidth: true, value: viewToTabIndex(view), onChange: handleChange, className: classes.tabs, indicatorColor: indicatorColor },
            React.createElement(Tab, { value: "date", icon: React.createElement(Icon, null, dateRangeIcon) }),
            React.createElement(Tab, { value: "time", icon: React.createElement(Icon, null, timeIcon) }))));
};
DateTimePickerTabs.propTypes = {
    view: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    dateRangeIcon: PropTypes.node.isRequired,
    timeIcon: PropTypes.node.isRequired,
};
var styles = function (theme) { return ({
    tabs: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.type === 'light'
            ? theme.palette.primary.main
            : theme.palette.background.default,
    },
}); };
export default withTheme()(withStyles(styles, { name: 'MuiPickerDTTabs' })(DateTimePickerTabs));
