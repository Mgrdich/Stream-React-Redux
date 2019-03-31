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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import EventListener from 'react-event-listener';
var dialogWidth = 310;
var dialogHeight = 405;
export var styles = {
    dialogRoot: {
        minWidth: dialogWidth,
        minHeight: dialogHeight,
    },
    dialog: {
        width: dialogWidth,
        minHeight: dialogHeight,
        overflow: 'hidden',
        '&:first-child': {
            padding: 0,
        },
    },
    dialogActions: {
        // set justifyContent to default value to fix IE11 layout bug
        // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
        justifyContent: 'flex-start',
    },
    clearableDialogAction: {
        '&:first-child': {
            marginRight: 'auto',
        },
    },
    todayDialogAction: {
        '&:first-child': {
            marginRight: 'auto',
        },
    },
    dialogAction: {
    // empty but may be needed for override
    },
};
export var ModalDialog = function (_a) {
    var children = _a.children, classes = _a.classes, onKeyDown = _a.onKeyDown, onAccept = _a.onAccept, onDismiss = _a.onDismiss, onClear = _a.onClear, onSetToday = _a.onSetToday, okLabel = _a.okLabel, cancelLabel = _a.cancelLabel, clearLabel = _a.clearLabel, todayLabel = _a.todayLabel, dialogContentClassName = _a.dialogContentClassName, clearable = _a.clearable, showTodayButton = _a.showTodayButton, other = __rest(_a, ["children", "classes", "onKeyDown", "onAccept", "onDismiss", "onClear", "onSetToday", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "dialogContentClassName", "clearable", "showTodayButton"]);
    var _b;
    return (React.createElement(Dialog, __assign({ onClose: onDismiss, classes: { paper: classes.dialogRoot }, role: "dialog" }, other),
        React.createElement(EventListener, { target: "window", onKeyDown: onKeyDown }),
        React.createElement(DialogContent, { className: classnames(classes.dialog, dialogContentClassName) }, children),
        React.createElement(DialogActions, { classes: {
                root: clearable || showTodayButton ? classes.dialogActions : undefined,
                action: classnames(classes.dialogAction, (_b = {},
                    _b[classes.clearableDialogAction] = clearable,
                    _b[classes.todayDialogAction] = !clearable && showTodayButton,
                    _b)),
            } },
            clearable && (React.createElement(Button, { color: "primary", onClick: onClear }, clearLabel)),
            !clearable &&
                showTodayButton && (React.createElement(Button, { color: "primary", onClick: onSetToday }, todayLabel)),
            React.createElement(Button, { color: "primary", onClick: onDismiss }, cancelLabel),
            React.createElement(Button, { color: "primary", onClick: onAccept }, okLabel))));
};
ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = {
    children: PropTypes.node.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    dialogContentClassName: PropTypes.string,
    okLabel: PropTypes.node.isRequired,
    cancelLabel: PropTypes.node.isRequired,
    clearLabel: PropTypes.node.isRequired,
    clearable: PropTypes.bool.isRequired,
    todayLabel: PropTypes.node.isRequired,
    showTodayButton: PropTypes.bool.isRequired,
    onSetToday: PropTypes.func.isRequired,
};
ModalDialog.defaultProps = {
    dialogContentClassName: '',
};
export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
