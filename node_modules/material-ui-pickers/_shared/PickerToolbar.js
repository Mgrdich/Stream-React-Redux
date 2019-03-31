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
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
var PickerToolbar = function (_a) {
    var children = _a.children, className = _a.className, classes = _a.classes, other = __rest(_a, ["children", "className", "classes"]);
    return (React.createElement(Toolbar, __assign({ className: classnames(classes.toolbar, className) }, other), children));
};
PickerToolbar.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.string,
    classes: PropTypes.any.isRequired,
    innerRef: PropTypes.any,
};
PickerToolbar.defaultProps = {
    className: '',
};
var styles = function (theme) {
    return createStyles({
        toolbar: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: 100,
            backgroundColor: theme.palette.type === 'light'
                ? theme.palette.primary.main
                : theme.palette.background.default,
        },
    });
};
export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
