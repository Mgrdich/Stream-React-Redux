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
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
var ToolbarButton = function (_a) {
    var classes = _a.classes, selected = _a.selected, label = _a.label, className = _a.className, other = __rest(_a, ["classes", "selected", "label", "className"]);
    var _b;
    return (React.createElement(Typography, __assign({ className: classnames(classes.toolbarBtn, className, (_b = {},
            _b[classes.toolbarBtnSelected] = selected,
            _b)) }, other), label));
};
ToolbarButton.propTypes = {
    selected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    classes: PropTypes.any.isRequired,
    className: PropTypes.string,
    innerRef: PropTypes.any,
};
ToolbarButton.defaultProps = {
    className: '',
};
var styles = function (theme) { return ({
    toolbarBtn: {
        cursor: 'pointer',
        color: 'rgba(255, 255, 255, 0.54)',
    },
    toolbarBtnSelected: {
        color: theme.palette.common.white,
    },
}); };
export default withStyles(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
