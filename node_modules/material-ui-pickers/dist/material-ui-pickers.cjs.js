'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_1 = require('tslib');
var PropTypes = require('prop-types');
var React = require('react');
var MaskedInput = _interopDefault(require('react-text-mask'));
var Icon = _interopDefault(require('@material-ui/core/Icon'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var InputAdornment = _interopDefault(require('@material-ui/core/InputAdornment'));
var TextField = _interopDefault(require('@material-ui/core/TextField'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var withStyles = _interopDefault(require('@material-ui/core/styles/withStyles'));
var classnames = _interopDefault(require('classnames'));
var EventListener = _interopDefault(require('react-event-listener'));
var keycode = _interopDefault(require('keycode'));
var createStyles = _interopDefault(require('@material-ui/core/styles/createStyles'));
var Toolbar = _interopDefault(require('@material-ui/core/Toolbar'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var reactTransitionGroup = require('react-transition-group');
var reactDom = require('react-dom');
var Popover = _interopDefault(require('@material-ui/core/Popover'));
var Paper = _interopDefault(require('@material-ui/core/Paper'));
var withTheme = _interopDefault(require('@material-ui/core/styles/withTheme'));
var Tab = _interopDefault(require('@material-ui/core/Tab'));
var Tabs = _interopDefault(require('@material-ui/core/Tabs'));

var _a = React.createContext(null),
    Consumer = _a.Consumer,
    Provider = _a.Provider;

var MuiPickersContextConsumer = Consumer;

var MuiPickersUtilsProvider =
/** @class */
function (_super) {
  tslib_1.__extends(MuiPickersUtilsProvider, _super);

  function MuiPickersUtilsProvider() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      utils: null
    };
    return _this;
  }

  MuiPickersUtilsProvider.getDerivedStateFromProps = function (_a) {
    var Utils = _a.utils,
        locale = _a.locale,
        moment = _a.moment;
    return {
      utils: new Utils({
        locale: locale,
        moment: moment
      })
    };
  };

  MuiPickersUtilsProvider.prototype.render = function () {
    return React.createElement(Provider, {
      value: this.state.utils,
      children: this.props.children
    });
  };

  process.env.NODE_ENV !== "production" ? MuiPickersUtilsProvider.propTypes = {
    utils: PropTypes.func.isRequired,
    locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element.isRequired)]).isRequired,
    moment: PropTypes.func
  } : void 0;
  MuiPickersUtilsProvider.defaultProps = {
    locale: undefined,
    moment: undefined
  };
  return MuiPickersUtilsProvider;
}(React.Component);

var checkUtils = function (utils) {
  if (!utils) {
    // tslint:disable-next-line
    throw new Error('Can not find utils in context. You either a) forgot to wrap your component tree in MuiPickersUtilsProvider; or b) mixed named and direct file imports.  Recommendation: use named imports from the module index.');
  }
};

var withUtils = function () {
  return function (Component) {
    var WithUtils = function (props) {
      return React.createElement(MuiPickersContextConsumer, null, function (utils) {
        checkUtils(utils);
        return React.createElement(Component, tslib_1.__assign({
          utils: utils
        }, props));
      });
    };

    WithUtils.displayName = "WithUtils(" + (Component.displayName || Component.name) + ")";
    return WithUtils;
  };
};

var getInitialDate = function (_a) {
  var utils = _a.utils,
      value = _a.value,
      initialFocusedDate = _a.initialFocusedDate;
  var initialDate = value || initialFocusedDate || utils.date();
  var date = utils.date(initialDate);
  return utils.isValid(date) ? date : utils.date();
};

var BasePicker =
/** @class */
function (_super) {
  tslib_1.__extends(BasePicker, _super);

  function BasePicker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      date: getInitialDate(_this.props),
      isAccepted: false
    };

    _this.changeDate = function (date, callback) {
      return _this.setState({
        date: date
      }, callback);
    };

    _this.handleAcceptedChange = function (isAccepted, callback) {
      return _this.setState({
        isAccepted: isAccepted
      }, callback);
    };

    _this.handleClear = function () {
      return _this.props.onChange(null);
    };

    _this.handleAccept = function () {
      return _this.props.onChange(_this.state.date);
    };

    _this.handleSetTodayDate = function () {
      return _this.handleChange(_this.props.utils.date(), false);
    };

    _this.handleTextFieldChange = function (date) {
      var onChange = _this.props.onChange;

      if (date === null) {
        onChange(null);
      } else {
        _this.changeDate(date, function () {
          return onChange(date);
        });
      }
    };

    _this.pick12hOr24hFormat = function (default12hFormat, default24hFormat) {
      var _a = _this.props,
          format = _a.format,
          ampm = _a.ampm;

      if (format) {
        return format;
      }

      return ampm ? default12hFormat : default24hFormat;
    };

    _this.handleChange = function (newDate, isFinish) {
      if (isFinish === void 0) {
        isFinish = true;
      }

      var _a = _this.props,
          autoOk = _a.autoOk,
          onChange = _a.onChange;

      _this.changeDate(newDate, function () {
        if (isFinish && autoOk) {
          onChange(newDate); // pass down accept true, and make it false in the next tick

          _this.handleAcceptedChange(true, function () {
            return _this.handleAcceptedChange(false);
          });
        }
      });
    };

    _this.handleDismiss = function () {
      _this.setState({
        date: getInitialDate(_this.props)
      });
    };

    return _this;
  }

  BasePicker.prototype.componentDidUpdate = function (prevProps) {
    var _a = this.props,
        utils = _a.utils,
        value = _a.value,
        initialFocusedDate = _a.initialFocusedDate;

    if (prevProps.value !== value || prevProps.utils.locale !== utils.locale || prevProps.initialFocusedDate !== initialFocusedDate) {
      this.changeDate(getInitialDate(this.props));
    }
  };

  BasePicker.prototype.render = function () {
    return this.props.children(tslib_1.__assign({}, this.state, {
      utils: this.props.utils,
      changeDate: this.changeDate,
      handleAcceptedChange: this.handleAcceptedChange,
      handleClear: this.handleClear,
      handleAccept: this.handleAccept,
      handleDismiss: this.handleDismiss,
      handleSetTodayDate: this.handleSetTodayDate,
      handleTextFieldChange: this.handleTextFieldChange,
      pick12hOr24hFormat: this.pick12hOr24hFormat,
      handleChange: this.handleChange
    }));
  };

  return BasePicker;
}(React.Component);
var BasePicker$1 = withUtils()(BasePicker);

var date = PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]);
var DomainPropTypes = {
  date: date
};

var Input =
/** @class */
function (_super) {
  tslib_1.__extends(Input, _super);

  function Input() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Input.prototype.render = function () {
    var _a = this.props,
        inputRef = _a.inputRef,
        rest = tslib_1.__rest(_a, ["inputRef"]);

    return this.props.mask ? React.createElement(MaskedInput, tslib_1.__assign({}, rest, {
      ref: inputRef
    })) : React.createElement("input", tslib_1.__assign({}, rest, {
      ref: inputRef
    }));
  };

  process.env.NODE_ENV !== "production" ? Input.propTypes = {
    mask: PropTypes.any,
    inputRef: PropTypes.func.isRequired
  } : void 0;
  Input.defaultProps = {
    mask: undefined
  };
  return Input;
}(React.PureComponent);

var getDisplayDate = function (_a) {
  var utils = _a.utils,
      value = _a.value,
      format = _a.format,
      invalidLabel = _a.invalidLabel,
      emptyLabel = _a.emptyLabel,
      labelFunc = _a.labelFunc;
  var isEmpty = value === null;
  var date = utils.date(value);

  if (labelFunc) {
    return labelFunc(isEmpty ? null : date, invalidLabel);
  }

  if (isEmpty) {
    return emptyLabel;
  }

  return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
};

var getError = function (value, props) {
  var utils = props.utils,
      maxDate = props.maxDate,
      minDate = props.minDate,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      maxDateMessage = props.maxDateMessage,
      minDateMessage = props.minDateMessage,
      invalidDateMessage = props.invalidDateMessage;

  if (!utils.isValid(value)) {
    // if null - do not show error
    if (utils.isNull(value)) {
      return '';
    }

    return invalidDateMessage;
  }

  if (maxDate && utils.isAfter(value, utils.endOfDay(utils.date(maxDate))) || disableFuture && utils.isAfter(value, utils.endOfDay(utils.date()))) {
    return maxDateMessage;
  }

  if (minDate && utils.isBefore(value, utils.startOfDay(utils.date(minDate))) || disablePast && utils.isBefore(value, utils.startOfDay(utils.date()))) {
    return minDateMessage;
  }

  return '';
};

var DateTextField =
/** @class */
function (_super) {
  tslib_1.__extends(DateTextField, _super);

  function DateTextField() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = DateTextField.updateState(_this.props);

    _this.commitUpdates = function (value) {
      var _a = _this.props,
          clearable = _a.clearable,
          onClear = _a.onClear,
          utils = _a.utils,
          format = _a.format,
          onError = _a.onError;

      if (value === '') {
        if (_this.props.value === null) {
          _this.setState(DateTextField.updateState(_this.props));
        } else if (clearable && onClear) {
          onClear();
        }

        return;
      }

      var oldValue = utils.date(_this.state.value);
      var newValue = utils.parse(value, format);
      var error = getError(newValue, _this.props);

      _this.setState({
        error: error,
        displayValue: value,
        value: error ? newValue : oldValue
      }, function () {
        if (!error && !utils.isEqual(newValue, oldValue)) {
          _this.props.onChange(newValue);
        }

        if (error && onError) {
          onError(newValue, error);
        }
      });
    };

    _this.handleBlur = function (e) {
      if (_this.props.keyboard) {
        e.preventDefault();
        e.stopPropagation();

        _this.commitUpdates(e.target.value);

        if (_this.props.onBlur) {
          _this.props.onBlur(e);
        }
      }
    };

    _this.handleChange = function (e) {
      var _a = _this.props,
          utils = _a.utils,
          format = _a.format,
          onInputChange = _a.onInputChange;
      var parsedValue = utils.parse(e.target.value, format);

      if (onInputChange) {
        onInputChange(e);
      }

      _this.setState({
        displayValue: e.target.value,
        error: getError(parsedValue, _this.props)
      });
    };

    _this.handleFocus = function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (!_this.props.keyboard) {
        _this.openPicker(e);
      }
    };

    _this.handleKeyPress = function (e) {
      if (e.key === 'Enter') {
        if (!_this.props.disableOpenOnEnter) {
          _this.openPicker(e);
        } else {
          // @ts-ignore TODO check me
          _this.commitUpdates(e.target.value);
        }
      }
    };

    _this.openPicker = function (e) {
      var _a = _this.props,
          disabled = _a.disabled,
          onClick = _a.onClick;

      if (!disabled) {
        onClick(e);
      }
    };

    return _this;
  }

  DateTextField.prototype.componentDidUpdate = function (prevProps) {
    if (!this.props.utils.isEqual(this.props.value, prevProps.value) || prevProps.format !== this.props.format || prevProps.maxDate !== this.props.maxDate || prevProps.minDate !== this.props.minDate || prevProps.emptyLabel !== this.props.emptyLabel || prevProps.utils !== this.props.utils) {
      /* eslint-disable-next-line react/no-did-update-set-state */
      this.setState(DateTextField.updateState(this.props));
    }
  };

  DateTextField.prototype.render = function () {
    var _a = this.props,
        adornmentPosition = _a.adornmentPosition,
        clearable = _a.clearable,
        disabled = _a.disabled,
        disableFuture = _a.disableFuture,
        disableOpenOnEnter = _a.disableOpenOnEnter,
        disablePast = _a.disablePast,
        emptyLabel = _a.emptyLabel,
        format = _a.format,
        InputAdornmentProps = _a.InputAdornmentProps,
        InputProps = _a.InputProps,
        invalidDateMessage = _a.invalidDateMessage,
        invalidLabel = _a.invalidLabel,
        keyboard = _a.keyboard,
        keyboardIcon = _a.keyboardIcon,
        labelFunc = _a.labelFunc,
        mask = _a.mask,
        maxDate = _a.maxDate,
        maxDateMessage = _a.maxDateMessage,
        minDate = _a.minDate,
        minDateMessage = _a.minDateMessage,
        onBlur = _a.onBlur,
        onClear = _a.onClear,
        onClick = _a.onClick,
        pipe = _a.pipe,
        TextFieldComponent = _a.TextFieldComponent,
        utils = _a.utils,
        value = _a.value,
        onInputChange = _a.onInputChange,
        other = tslib_1.__rest(_a, ["adornmentPosition", "clearable", "disabled", "disableFuture", "disableOpenOnEnter", "disablePast", "emptyLabel", "format", "InputAdornmentProps", "InputProps", "invalidDateMessage", "invalidLabel", "keyboard", "keyboardIcon", "labelFunc", "mask", "maxDate", "maxDateMessage", "minDate", "minDateMessage", "onBlur", "onClear", "onClick", "pipe", "TextFieldComponent", "utils", "value", "onInputChange"]);

    var _b = this.state,
        displayValue = _b.displayValue,
        error = _b.error;
    var localInputProps = {
      inputComponent: Input,
      inputProps: {
        mask: !keyboard ? null : mask,
        pipe: !keyboard ? null : pipe,
        readOnly: !keyboard
      }
    };

    if (keyboard) {
      localInputProps[adornmentPosition + "Adornment"] = React.createElement(InputAdornment, tslib_1.__assign({
        position: adornmentPosition
      }, InputAdornmentProps), React.createElement(IconButton, {
        disabled: disabled,
        onClick: this.openPicker
      }, React.createElement(Icon, null, " ", keyboardIcon, " ")));
    }

    var Component = TextFieldComponent;

    var inputProps = tslib_1.__assign({}, localInputProps, InputProps);

    return React.createElement(Component, tslib_1.__assign({
      onClick: this.handleFocus,
      error: !!error,
      helperText: error,
      onKeyPress: this.handleKeyPress,
      onBlur: this.handleBlur,
      disabled: disabled,
      value: displayValue
    }, other, {
      onError: undefined,
      onChange: this.handleChange,
      InputProps: inputProps
    }));
  };

  process.env.NODE_ENV !== "production" ? DateTextField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    format: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    clearable: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    InputProps: PropTypes.shape({}),
    mask: PropTypes.any,
    minDateMessage: PropTypes.node,
    maxDateMessage: PropTypes.node,
    invalidLabel: PropTypes.string,
    emptyLabel: PropTypes.string,
    labelFunc: PropTypes.func,
    keyboard: PropTypes.bool,
    keyboardIcon: PropTypes.node,
    disableOpenOnEnter: PropTypes.bool,
    invalidDateMessage: PropTypes.node,
    TextFieldComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    InputAdornmentProps: PropTypes.object,
    adornmentPosition: PropTypes.oneOf(['start', 'end']),
    onError: PropTypes.func,
    onInputChange: PropTypes.func,
    pipe: PropTypes.func
  } : void 0;
  DateTextField.defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    emptyLabel: '',
    value: new Date(),
    labelFunc: undefined,
    format: undefined,
    InputProps: undefined,
    keyboard: false,
    mask: undefined,
    keyboardIcon: 'event',
    disableOpenOnEnter: false,
    invalidDateMessage: 'Invalid Date Format',
    clearable: false,
    onBlur: undefined,
    onClear: undefined,
    disablePast: false,
    disableFuture: false,
    onError: undefined,
    onInputChange: undefined,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    minDateMessage: 'Date should not be before minimal date',
    maxDateMessage: 'Date should not be after maximal date',
    TextFieldComponent: TextField,
    InputAdornmentProps: {},
    adornmentPosition: 'end',
    pipe: undefined
  };

  DateTextField.updateState = function (props) {
    return {
      value: props.value,
      displayValue: getDisplayDate(props),
      error: getError(props.utils.date(props.value), props)
    };
  };

  return DateTextField;
}(React.PureComponent);

var DateTextField$1 = withUtils()(DateTextField);

var dialogWidth = 310;
var dialogHeight = 405;
var styles = {
  dialogRoot: {
    minWidth: dialogWidth,
    minHeight: dialogHeight
  },
  dialog: {
    width: dialogWidth,
    minHeight: dialogHeight,
    overflow: 'hidden',
    '&:first-child': {
      padding: 0
    }
  },
  dialogActions: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start'
  },
  clearableDialogAction: {
    '&:first-child': {
      marginRight: 'auto'
    }
  },
  todayDialogAction: {
    '&:first-child': {
      marginRight: 'auto'
    }
  },
  dialogAction: {// empty but may be needed for override
  }
};
var ModalDialog = function (_a) {
  var children = _a.children,
      classes = _a.classes,
      onKeyDown = _a.onKeyDown,
      onAccept = _a.onAccept,
      onDismiss = _a.onDismiss,
      onClear = _a.onClear,
      onSetToday = _a.onSetToday,
      okLabel = _a.okLabel,
      cancelLabel = _a.cancelLabel,
      clearLabel = _a.clearLabel,
      todayLabel = _a.todayLabel,
      dialogContentClassName = _a.dialogContentClassName,
      clearable = _a.clearable,
      showTodayButton = _a.showTodayButton,
      other = tslib_1.__rest(_a, ["children", "classes", "onKeyDown", "onAccept", "onDismiss", "onClear", "onSetToday", "okLabel", "cancelLabel", "clearLabel", "todayLabel", "dialogContentClassName", "clearable", "showTodayButton"]);

  var _b;

  return React.createElement(Dialog, tslib_1.__assign({
    onClose: onDismiss,
    classes: {
      paper: classes.dialogRoot
    },
    role: "dialog"
  }, other), React.createElement(EventListener, {
    target: "window",
    onKeyDown: onKeyDown
  }), React.createElement(DialogContent, {
    className: classnames(classes.dialog, dialogContentClassName)
  }, children), React.createElement(DialogActions, {
    classes: {
      root: clearable || showTodayButton ? classes.dialogActions : undefined,
      action: classnames(classes.dialogAction, (_b = {}, _b[classes.clearableDialogAction] = clearable, _b[classes.todayDialogAction] = !clearable && showTodayButton, _b))
    }
  }, clearable && React.createElement(Button, {
    color: "primary",
    onClick: onClear
  }, clearLabel), !clearable && showTodayButton && React.createElement(Button, {
    color: "primary",
    onClick: onSetToday
  }, todayLabel), React.createElement(Button, {
    color: "primary",
    onClick: onDismiss
  }, cancelLabel), React.createElement(Button, {
    color: "primary",
    onClick: onAccept
  }, okLabel)));
};
ModalDialog.displayName = 'ModalDialog';
process.env.NODE_ENV !== "production" ? ModalDialog.propTypes = {
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
  onSetToday: PropTypes.func.isRequired
} : void 0;
ModalDialog.defaultProps = {
  dialogContentClassName: ''
};
var ModalDialog$1 = withStyles(styles, {
  name: 'MuiPickersModal'
})(ModalDialog);

var ModalWrapper =
/** @class */
function (_super) {
  tslib_1.__extends(ModalWrapper, _super);

  function ModalWrapper() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      open: false
    };

    _this.handleKeyDown = function (event) {
      switch (keycode(event)) {
        case 'enter':
          _this.handleAccept();

          break;

        default:
          // if keycode is not handled, stop execution
          return;
      } // if event was handled prevent other side effects


      event.preventDefault();
    };

    _this.handleSetTodayDate = function () {
      if (_this.props.onSetToday) {
        _this.props.onSetToday();
      }
    };

    _this.open = function () {
      _this.setState({
        open: true
      });

      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    };

    _this.close = function () {
      _this.setState({
        open: false
      });

      if (_this.props.onClose) {
        _this.props.onClose();
      }
    };

    _this.handleAccept = function () {
      _this.close();

      if (_this.props.onAccept) {
        _this.props.onAccept();
      }
    };

    _this.handleDismiss = function () {
      _this.close();

      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }
    };

    _this.handleClear = function () {
      _this.close();

      if (_this.props.onClear) {
        _this.props.onClear();
      }
    };

    return _this;
  }

  ModalWrapper.getDerivedStateFromProps = function (nextProps) {
    // only if accept = true close the dialog
    if (nextProps.isAccepted) {
      return {
        open: false
      };
    }

    return null;
  };

  ModalWrapper.prototype.render = function () {
    var _a = this.props,
        value = _a.value,
        format = _a.format,
        children = _a.children,
        dialogContentClassName = _a.dialogContentClassName,
        onAccept = _a.onAccept,
        onDismiss = _a.onDismiss,
        invalidLabel = _a.invalidLabel,
        labelFunc = _a.labelFunc,
        okLabel = _a.okLabel,
        cancelLabel = _a.cancelLabel,
        clearLabel = _a.clearLabel,
        clearable = _a.clearable,
        todayLabel = _a.todayLabel,
        showTodayButton = _a.showTodayButton,
        onOpen = _a.onOpen,
        onClose = _a.onClose,
        onSetToday = _a.onSetToday,
        isAccepted = _a.isAccepted,
        DialogProps = _a.DialogProps,
        other = tslib_1.__rest(_a, ["value", "format", "children", "dialogContentClassName", "onAccept", "onDismiss", "invalidLabel", "labelFunc", "okLabel", "cancelLabel", "clearLabel", "clearable", "todayLabel", "showTodayButton", "onOpen", "onClose", "onSetToday", "isAccepted", "DialogProps"]);

    return React.createElement(React.Fragment, null, React.createElement(DateTextField$1, tslib_1.__assign({
      value: value,
      format: format,
      onClick: this.open,
      // onFocus={this.togglePicker} <- Currently not properly works with .blur() on TextField
      invalidLabel: invalidLabel,
      labelFunc: labelFunc,
      clearable: clearable
    }, other)), React.createElement(ModalDialog$1, tslib_1.__assign({
      open: this.state.open,
      onKeyDown: this.handleKeyDown,
      onClear: this.handleClear,
      onAccept: this.handleAccept,
      onDismiss: this.handleDismiss,
      onSetToday: this.handleSetTodayDate,
      dialogContentClassName: dialogContentClassName,
      clearLabel: clearLabel,
      todayLabel: todayLabel,
      okLabel: okLabel,
      cancelLabel: cancelLabel,
      clearable: clearable,
      showTodayButton: showTodayButton,
      children: children
    }, DialogProps)));
  };

  process.env.NODE_ENV !== "production" ? ModalWrapper.propTypes = {
    okLabel: PropTypes.node,
    cancelLabel: PropTypes.node,
    clearLabel: PropTypes.node,
    clearable: PropTypes.bool,
    todayLabel: PropTypes.string,
    showTodayButton: PropTypes.bool,
    onOpen: PropTypes.func,
    format: PropTypes.string,

    /** Dialog props passed to material-ui Dialog */
    DialogProps: PropTypes.object,
    value: DomainPropTypes.date,
    invalidLabel: PropTypes.node,
    labelFunc: PropTypes.func,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onClear: PropTypes.func,
    onSetToday: PropTypes.func,
    children: PropTypes.node.isRequired,
    dialogContentClassName: PropTypes.string,
    isAccepted: PropTypes.bool.isRequired
  } : void 0;
  ModalWrapper.defaultProps = {
    dialogContentClassName: '',
    invalidLabel: undefined,
    value: new Date(),
    labelFunc: undefined,
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    clearLabel: 'Clear',
    todayLabel: 'Today',
    clearable: false,
    showTodayButton: false,
    format: undefined,
    onAccept: undefined,
    onDismiss: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    onSetToday: undefined,
    DialogProps: undefined,
    isAccepted: false
  };
  return ModalWrapper;
}(React.PureComponent);

var PickerToolbar = function (_a) {
  var children = _a.children,
      className = _a.className,
      classes = _a.classes,
      other = tslib_1.__rest(_a, ["children", "className", "classes"]);

  return React.createElement(Toolbar, tslib_1.__assign({
    className: classnames(classes.toolbar, className)
  }, other), children);
};

process.env.NODE_ENV !== "production" ? PickerToolbar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  classes: PropTypes.any.isRequired,
  innerRef: PropTypes.any
} : void 0;
PickerToolbar.defaultProps = {
  className: ''
};

var styles$1 = function (theme) {
  return createStyles({
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 100,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background["default"]
    }
  });
};

var PickerToolbar$1 = withStyles(styles$1, {
  name: 'MuiPickersToolbar'
})(PickerToolbar);

var ToolbarButton = function (_a) {
  var classes = _a.classes,
      selected = _a.selected,
      label = _a.label,
      className = _a.className,
      other = tslib_1.__rest(_a, ["classes", "selected", "label", "className"]);

  var _b;

  return React.createElement(Typography, tslib_1.__assign({
    className: classnames(classes.toolbarBtn, className, (_b = {}, _b[classes.toolbarBtnSelected] = selected, _b))
  }, other), label);
};

process.env.NODE_ENV !== "production" ? ToolbarButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  className: PropTypes.string,
  innerRef: PropTypes.any
} : void 0;
ToolbarButton.defaultProps = {
  className: ''
};

var styles$2 = function (theme) {
  return {
    toolbarBtn: {
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.54)'
    },
    toolbarBtnSelected: {
      color: theme.palette.common.white
    }
  };
};

var ToolbarButton$1 = withStyles(styles$2, {
  name: 'MuiPickersToolbarButton'
})(ToolbarButton);

var findClosestEnabledDate = function (_a) {
  var date = _a.date,
      utils = _a.utils,
      minDate = _a.minDate,
      maxDate = _a.maxDate,
      disableFuture = _a.disableFuture,
      disablePast = _a.disablePast,
      shouldDisableDate = _a.shouldDisableDate;
  var today = utils.startOfDay(utils.date());
  minDate = minDate && utils.date(minDate);
  maxDate = maxDate && utils.date(maxDate);

  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  var forward = utils.date(date);
  var backward = utils.date(date);

  if (utils.isBefore(date, minDate)) {
    forward = minDate;
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = maxDate;
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }

    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }

      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }

      backward = utils.addDays(backward, -1);
    }
  }

  return null;
};

var animationDuration = 350;

var SlideTransition = function (_a) {
  var classes = _a.classes,
      className = _a.className,
      children = _a.children,
      transKey = _a.transKey,
      slideDirection = _a.slideDirection;
  return React.createElement(reactTransitionGroup.TransitionGroup, {
    className: classnames(classes.transitionContainer, className)
  }, React.createElement(reactTransitionGroup.CSSTransition, {
    key: transKey,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: animationDuration,
    children: children,
    classNames: {
      enter: classes["slideEnter-" + slideDirection],
      enterActive: classes.slideEnterActive,
      exit: classes.slideExit,
      exitActive: classes["slideExitActiveLeft-" + slideDirection]
    }
  }));
};

process.env.NODE_ENV !== "production" ? SlideTransition.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
  transKey: PropTypes.string.isRequired,
  innerRef: PropTypes.any
} : void 0;
SlideTransition.defaultProps = {
  className: undefined
};

var styles$3 = function (theme) {
  var slideTransition = theme.transitions.create('transform', {
    duration: animationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return createStyles({
    transitionContainer: {
      display: 'block',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0
      }
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)'
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)'
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    slideExit: {
      transform: 'translate(0%)'
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition
    }
  });
};

var SlideTransition$1 = withStyles(styles$3, {
  name: 'MuiPickersSlideTransition'
})(SlideTransition);

var CalendarHeader = function (_a) {
  var classes = _a.classes,
      theme = _a.theme,
      currentMonth = _a.currentMonth,
      onMonthChange = _a.onMonthChange,
      leftArrowIcon = _a.leftArrowIcon,
      rightArrowIcon = _a.rightArrowIcon,
      disablePrevMonth = _a.disablePrevMonth,
      disableNextMonth = _a.disableNextMonth,
      utils = _a.utils,
      slideDirection = _a.slideDirection;
  var rtl = theme.direction === 'rtl';

  var selectNextMonth = function () {
    return onMonthChange(utils.getNextMonth(currentMonth), 'left');
  };

  var selectPreviousMonth = function () {
    return onMonthChange(utils.getPreviousMonth(currentMonth), 'right');
  };

  return React.createElement("div", null, React.createElement("div", {
    className: classes.switchHeader
  }, React.createElement(IconButton, {
    disabled: disablePrevMonth,
    onClick: selectPreviousMonth,
    className: classes.iconButton
  }, React.createElement(Icon, null, rtl ? rightArrowIcon : leftArrowIcon)), React.createElement(SlideTransition$1, {
    slideDirection: slideDirection,
    transKey: currentMonth.toString(),
    className: classes.transitionContainer
  }, React.createElement(Typography, {
    align: "center",
    variant: "body1"
  }, utils.getCalendarHeaderText(currentMonth))), React.createElement(IconButton, {
    disabled: disableNextMonth,
    onClick: selectNextMonth,
    className: classes.iconButton
  }, React.createElement(Icon, null, rtl ? leftArrowIcon : rightArrowIcon))), React.createElement("div", {
    className: classes.daysHeader
  }, utils.getWeekdays().map(function (day, index) {
    return React.createElement(Typography, {
      key: index,
      variant: "caption",
      className: classes.dayLabel
    }, day);
  })));
};
process.env.NODE_ENV !== "production" ? CalendarHeader.propTypes = {
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
  innerRef: PropTypes.any
} : void 0;
CalendarHeader.defaultProps = {
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  disablePrevMonth: false,
  disableNextMonth: false
};

var styles$4 = function (theme) {
  return createStyles({
    switchHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.unit / 2,
      marginBottom: theme.spacing.unit
    },
    transitionContainer: {
      width: '100%',
      height: 20
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
          overflow: 'visible'
        }
      }
    },
    daysHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 16
    },
    dayLabel: {
      width: 36,
      margin: '0 2px',
      textAlign: 'center',
      color: theme.palette.text.hint
    }
  });
};

var CalendarHeader$1 = withStyles(styles$4, {
  withTheme: true,
  name: 'MuiPickersCalendarHeader'
})(withUtils()(CalendarHeader));

var Day =
/** @class */
function (_super) {
  tslib_1.__extends(Day, _super);

  function Day() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Day.prototype.render = function () {
    var _a;

    var _b = this.props,
        children = _b.children,
        classes = _b.classes,
        disabled = _b.disabled,
        hidden = _b.hidden,
        current = _b.current,
        selected = _b.selected,
        other = tslib_1.__rest(_b, ["children", "classes", "disabled", "hidden", "current", "selected"]);

    var className = classnames(classes.day, (_a = {}, _a[classes.hidden] = hidden, _a[classes.current] = current, _a[classes.selected] = selected, _a[classes.disabled] = disabled, _a));
    return React.createElement(IconButton, tslib_1.__assign({
      className: className,
      tabIndex: hidden || disabled ? -1 : 0
    }, other), children);
  };

  process.env.NODE_ENV !== "production" ? Day.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    selected: PropTypes.bool,
    innerRef: PropTypes.any
  } : void 0;
  Day.defaultProps = {
    disabled: false,
    hidden: false,
    current: false,
    selected: false
  };
  return Day;
}(React.PureComponent);

var styles$5 = function (theme) {
  return createStyles({
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
      padding: 0
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none'
    },
    current: {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    selected: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  });
};

var Day$1 = withStyles(styles$5, {
  name: 'MuiPickersDay'
})(Day);

var DayWrapper =
/** @class */
function (_super) {
  tslib_1.__extends(DayWrapper, _super);

  function DayWrapper() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.handleClick = function () {
      _this.props.onSelect(_this.props.value);
    };

    return _this;
  }

  DayWrapper.prototype.render = function () {
    var _a = this.props,
        children = _a.children,
        value = _a.value,
        dayInCurrentMonth = _a.dayInCurrentMonth,
        disabled = _a.disabled,
        onSelect = _a.onSelect,
        other = tslib_1.__rest(_a, ["children", "value", "dayInCurrentMonth", "disabled", "onSelect"]);

    return React.createElement("div", tslib_1.__assign({
      onClick: dayInCurrentMonth && !disabled ? this.handleClick : undefined,
      onKeyPress: dayInCurrentMonth && !disabled ? this.handleClick : undefined,
      role: "presentation"
    }, other), children);
  };

  process.env.NODE_ENV !== "production" ? DayWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    dayInCurrentMonth: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
  } : void 0;
  DayWrapper.defaultProps = {
    dayInCurrentMonth: true,
    disabled: false
  };
  return DayWrapper;
}(React.PureComponent);

var Calendar =
/** @class */
function (_super) {
  tslib_1.__extends(Calendar, _super);

  function Calendar() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      slideDirection: 'left',
      currentMonth: _this.props.utils.getStartOfMonth(_this.props.date)
    };

    _this.onDateSelect = function (day, isFinish) {
      if (isFinish === void 0) {
        isFinish = true;
      }

      var _a = _this.props,
          date = _a.date,
          utils = _a.utils;

      _this.props.onChange(utils.mergeDateAndTime(day, date), isFinish);
    };

    _this.handleChangeMonth = function (newMonth, slideDirection) {
      _this.setState({
        currentMonth: newMonth,
        slideDirection: slideDirection
      });
    };

    _this.validateMinMaxDate = function (day) {
      var _a = _this.props,
          minDate = _a.minDate,
          maxDate = _a.maxDate,
          utils = _a.utils;
      return minDate && utils.isBeforeDay(day, utils.date(minDate)) || maxDate && utils.isAfterDay(day, utils.date(maxDate));
    };

    _this.shouldDisablePrevMonth = function () {
      var _a = _this.props,
          utils = _a.utils,
          disablePast = _a.disablePast,
          minDate = _a.minDate;
      var now = utils.date();
      return !utils.isBefore(utils.getStartOfMonth(disablePast && utils.isAfter(now, minDate) ? now : utils.date(minDate)), _this.state.currentMonth);
    };

    _this.shouldDisableNextMonth = function () {
      var _a = _this.props,
          utils = _a.utils,
          disableFuture = _a.disableFuture,
          maxDate = _a.maxDate;
      var now = utils.date();
      return !utils.isAfter(utils.getStartOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : utils.date(maxDate)), _this.state.currentMonth);
    };

    _this.shouldDisableDate = function (day) {
      var _a = _this.props,
          disablePast = _a.disablePast,
          disableFuture = _a.disableFuture,
          shouldDisableDate = _a.shouldDisableDate,
          utils = _a.utils;
      return Boolean(disableFuture && utils.isAfterDay(day, utils.date()) || disablePast && utils.isBeforeDay(day, utils.date()) || _this.validateMinMaxDate(day) || shouldDisableDate && shouldDisableDate(day));
    };

    _this.moveToDay = function (day) {
      if (day && !_this.shouldDisableDate(day)) {
        _this.onDateSelect(day, false);
      }
    };

    _this.handleKeyDown = function (event) {
      var _a = _this.props,
          theme = _a.theme,
          date = _a.date,
          utils = _a.utils;

      switch (keycode(event)) {
        case 'up':
          _this.moveToDay(utils.addDays(date, -7));

          break;

        case 'down':
          _this.moveToDay(utils.addDays(date, 7));

          break;

        case 'left':
          theme.direction === 'ltr' ? _this.moveToDay(utils.addDays(date, -1)) : _this.moveToDay(utils.addDays(date, 1));
          break;

        case 'right':
          theme.direction === 'ltr' ? _this.moveToDay(utils.addDays(date, 1)) : _this.moveToDay(utils.addDays(date, -1));
          break;

        default:
          // if keycode is not handled, stop execution
          return;
      } // if event was handled prevent other side effects (e.g. page scroll)


      event.preventDefault();
    };

    _this.renderWeeks = function () {
      var utils = _this.props.utils;
      var currentMonth = _this.state.currentMonth;
      var weeks = utils.getWeekArray(currentMonth);
      return weeks.map(function (week) {
        return React.createElement("div", {
          key: "week-" + week[0].toString(),
          className: _this.props.classes.week
        }, _this.renderDays(week));
      });
    };

    _this.renderDays = function (week) {
      var _a = _this.props,
          date = _a.date,
          renderDay = _a.renderDay,
          utils = _a.utils;
      var selectedDate = utils.startOfDay(date);
      var currentMonthNumber = utils.getMonth(_this.state.currentMonth);
      var now = utils.date();
      return week.map(function (day) {
        var disabled = _this.shouldDisableDate(day);

        var dayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;
        var dayComponent = React.createElement(Day$1, {
          current: utils.isSameDay(day, now),
          hidden: !dayInCurrentMonth,
          disabled: disabled,
          selected: utils.isSameDay(selectedDate, day)
        }, utils.getDayText(day));

        if (renderDay) {
          dayComponent = renderDay(day, selectedDate, dayInCurrentMonth, dayComponent);
        }

        return React.createElement(DayWrapper, {
          key: day.toString(),
          value: day,
          dayInCurrentMonth: dayInCurrentMonth,
          disabled: disabled,
          onSelect: _this.onDateSelect
        }, dayComponent);
      });
    };

    return _this;
  }

  Calendar.getDerivedStateFromProps = function (nextProps, state) {
    if (!nextProps.utils.isEqual(nextProps.date, state.lastDate)) {
      return {
        lastDate: nextProps.date,
        currentMonth: nextProps.utils.getStartOfMonth(nextProps.date)
      };
    }

    return null;
  };

  Calendar.prototype.componentDidMount = function () {
    var _a = this.props,
        date = _a.date,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        utils = _a.utils,
        disablePast = _a.disablePast;

    if (this.shouldDisableDate(date)) {
      this.onDateSelect(findClosestEnabledDate({
        date: date,
        utils: utils,
        minDate: minDate,
        maxDate: maxDate,
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disablePast),
        shouldDisableDate: this.shouldDisableDate
      }), false);
    }
  };

  Calendar.prototype.render = function () {
    var _a = this.state,
        currentMonth = _a.currentMonth,
        slideDirection = _a.slideDirection;
    var _b = this.props,
        classes = _b.classes,
        allowKeyboardControl = _b.allowKeyboardControl;
    return React.createElement(React.Fragment, null, allowKeyboardControl && React.createElement(EventListener, {
      target: "window",
      onKeyDown: this.handleKeyDown
    }), React.createElement(CalendarHeader$1, {
      slideDirection: slideDirection,
      currentMonth: currentMonth,
      onMonthChange: this.handleChangeMonth,
      leftArrowIcon: this.props.leftArrowIcon,
      rightArrowIcon: this.props.rightArrowIcon,
      disablePrevMonth: this.shouldDisablePrevMonth(),
      disableNextMonth: this.shouldDisableNextMonth()
    }), React.createElement(SlideTransition$1, {
      slideDirection: slideDirection,
      transKey: currentMonth.toString(),
      className: classes.transitionContainer
    }, React.createElement("div", {
      // @ts-ignore Autofocus required for getting work keyboard navigation feature
      autoFocus: true
    }, this.renderWeeks())));
  };

  process.env.NODE_ENV !== "production" ? Calendar.propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    theme: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
    utils: PropTypes.object.isRequired,
    allowKeyboardControl: PropTypes.bool,
    innerRef: PropTypes.any
  } : void 0;
  Calendar.defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    allowKeyboardControl: false,
    shouldDisableDate: function () {
      return false;
    }
  };
  return Calendar;
}(React.Component);

var styles$6 = function (theme) {
  return {
    transitionContainer: {
      minHeight: 36 * 6,
      marginTop: theme.spacing.unit * 1.5
    },
    week: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
};

var Calendar$1 = withStyles(styles$6, {
  name: 'MuiPickersCalendar',
  withTheme: true
})(withUtils()(Calendar));

var Year =
/** @class */
function (_super) {
  tslib_1.__extends(Year, _super);

  function Year() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.handleClick = function () {
      _this.props.onSelect(_this.props.value);
    };

    return _this;
  }

  Year.prototype.render = function () {
    var _a;

    var _b = this.props,
        classes = _b.classes,
        selected = _b.selected,
        disabled = _b.disabled,
        value = _b.value,
        children = _b.children,
        other = tslib_1.__rest(_b, ["classes", "selected", "disabled", "value", "children"]);

    return React.createElement(Typography, tslib_1.__assign({
      role: "button",
      component: "div",
      className: classnames(classes.root, (_a = {}, _a[classes.selected] = selected, _a[classes.disabled] = disabled, _a)),
      tabIndex: disabled ? -1 : 0,
      onClick: this.handleClick,
      onKeyPress: this.handleClick,
      color: selected ? 'primary' : 'default',
      variant: selected ? 'h5' : 'subtitle1'
    }, other), children);
  };

  process.env.NODE_ENV !== "production" ? Year.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    value: PropTypes.any.isRequired,
    innerRef: PropTypes.any
  } : void 0;
  Year.defaultProps = {
    selected: false,
    disabled: false
  };
  return Year;
}(React.PureComponent);

var styles$7 = function (theme) {
  return createStyles({
    root: {
      height: theme.spacing.unit * 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    selected: {
      margin: '10px 0',
      fontWeight: theme.typography.fontWeightMedium
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  });
};

var Year$1 = withStyles(styles$7, {
  name: 'MuiPickersYear'
})(Year);

var YearSelection =
/** @class */
function (_super) {
  tslib_1.__extends(YearSelection, _super);

  function YearSelection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.selectedYearRef = undefined;

    _this.getSelectedYearRef = function (ref) {
      _this.selectedYearRef = ref;
    };

    _this.scrollToCurrentYear = function (domNode) {
      var animateYearScrolling = _this.props.animateYearScrolling;
      var currentYearElement = reactDom.findDOMNode(domNode);

      if (currentYearElement && currentYearElement.scrollIntoView) {
        if (animateYearScrolling) {
          setTimeout(function () {
            return currentYearElement.scrollIntoView({
              behavior: 'smooth'
            });
          }, 100);
        } else {
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
      var _a = _this.props,
          date = _a.date,
          onChange = _a.onChange,
          utils = _a.utils;
      var newDate = utils.setYear(date, year);
      onChange(newDate);
    };

    return _this;
  }

  YearSelection.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        minDate = _a.minDate,
        maxDate = _a.maxDate,
        date = _a.date,
        classes = _a.classes,
        disablePast = _a.disablePast,
        disableFuture = _a.disableFuture,
        utils = _a.utils;
    var currentYear = utils.getYear(date);
    return React.createElement("div", {
      className: classes.container
    }, utils.getYearRange(minDate, maxDate).map(function (year) {
      var yearNumber = utils.getYear(year);
      var selected = yearNumber === currentYear;
      return React.createElement(Year$1, {
        key: utils.getYearText(year),
        selected: selected,
        value: yearNumber,
        onSelect: _this.onYearSelect,
        // @ts-ignore
        ref: selected ? _this.getSelectedYearRef : undefined,
        disabled: disablePast && utils.isBeforeYear(year, utils.date()) || disableFuture && utils.isAfterYear(year, utils.date())
      }, utils.getYearText(year));
    }));
  };

  process.env.NODE_ENV !== "production" ? YearSelection.propTypes = {
    date: PropTypes.shape({}).isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    innerRef: PropTypes.any
  } : void 0;
  YearSelection.defaultProps = {
    animateYearScrolling: false
  };
  return YearSelection;
}(React.PureComponent);
var styles$8 = createStyles({
  container: {
    maxHeight: 300,
    overflowY: 'auto',
    justifyContent: 'center'
  }
});
var YearSelection$1 = withStyles(styles$8, {
  name: 'MuiPickersYearSelection'
})(withUtils()(YearSelection));

var DatePicker =
/** @class */
function (_super) {
  tslib_1.__extends(DatePicker, _super);

  function DatePicker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      showYearSelection: Boolean(_this.props.openToYearSelection)
    };

    _this.handleYearSelect = function (date) {
      _this.props.onChange(date, false);

      _this.openCalendar();
    };

    _this.openYearSelection = function () {
      _this.setState({
        showYearSelection: true
      });
    };

    _this.openCalendar = function () {
      _this.setState({
        showYearSelection: false
      });
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
    var _a = this.props,
        disablePast = _a.disablePast,
        disableFuture = _a.disableFuture,
        onChange = _a.onChange,
        animateYearScrolling = _a.animateYearScrolling,
        leftArrowIcon = _a.leftArrowIcon,
        rightArrowIcon = _a.rightArrowIcon,
        renderDay = _a.renderDay,
        utils = _a.utils,
        shouldDisableDate = _a.shouldDisableDate,
        allowKeyboardControl = _a.allowKeyboardControl;
    return React.createElement(React.Fragment, null, React.createElement(PickerToolbar$1, null, React.createElement(ToolbarButton$1, {
      variant: "subtitle1",
      onClick: this.openYearSelection,
      selected: showYearSelection,
      label: utils.getYearText(this.date)
    }), React.createElement(ToolbarButton$1, {
      variant: "h4",
      onClick: this.openCalendar,
      selected: !showYearSelection,
      label: utils.getDatePickerHeaderText(this.date)
    })), this.props.children, showYearSelection ? React.createElement(YearSelection$1, {
      date: this.date,
      onChange: this.handleYearSelect,
      minDate: this.minDate,
      maxDate: this.maxDate,
      disablePast: disablePast,
      disableFuture: disableFuture,
      animateYearScrolling: animateYearScrolling
    }) : React.createElement(Calendar$1, {
      date: this.date,
      onChange: onChange,
      disablePast: disablePast,
      disableFuture: disableFuture,
      minDate: this.minDate,
      maxDate: this.maxDate,
      leftArrowIcon: leftArrowIcon,
      rightArrowIcon: rightArrowIcon,
      renderDay: renderDay,
      shouldDisableDate: shouldDisableDate,
      allowKeyboardControl: allowKeyboardControl
    }));
  };

  process.env.NODE_ENV !== "production" ? DatePicker.propTypes = {
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
    initialFocusedDate: DomainPropTypes.date
  } : void 0;
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
    shouldDisableDate: undefined
  };
  return DatePicker;
}(React.PureComponent);
var DatePicker$1 = withUtils()(DatePicker);

var DatePickerModal = function (props) {
  var allowKeyboardControl = props.allowKeyboardControl,
      animateYearScrolling = props.animateYearScrolling,
      autoOk = props.autoOk,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      format = props.format,
      forwardedRef = props.forwardedRef,
      labelFunc = props.labelFunc,
      leftArrowIcon = props.leftArrowIcon,
      maxDate = props.maxDate,
      minDate = props.minDate,
      initialFocusedDate = props.initialFocusedDate,
      onChange = props.onChange,
      openToYearSelection = props.openToYearSelection,
      renderDay = props.renderDay,
      rightArrowIcon = props.rightArrowIcon,
      shouldDisableDate = props.shouldDisableDate,
      value = props.value,
      other = tslib_1.__rest(props, ["allowKeyboardControl", "animateYearScrolling", "autoOk", "disableFuture", "disablePast", "format", "forwardedRef", "labelFunc", "leftArrowIcon", "maxDate", "minDate", "initialFocusedDate", "onChange", "openToYearSelection", "renderDay", "rightArrowIcon", "shouldDisableDate", "value"]);

  return React.createElement(BasePicker$1, tslib_1.__assign({}, props), function (_a) {
    var date = _a.date,
        utils = _a.utils,
        handleAccept = _a.handleAccept,
        handleChange = _a.handleChange,
        handleClear = _a.handleClear,
        handleDismiss = _a.handleDismiss,
        handleSetTodayDate = _a.handleSetTodayDate,
        handleTextFieldChange = _a.handleTextFieldChange,
        isAccepted = _a.isAccepted;
    return React.createElement(ModalWrapper, tslib_1.__assign({
      disableFuture: disableFuture,
      disablePast: disablePast,
      format: format || utils.dateFormat,
      labelFunc: labelFunc,
      maxDate: maxDate,
      minDate: minDate,
      onAccept: handleAccept,
      onChange: handleTextFieldChange,
      onClear: handleClear,
      onDismiss: handleDismiss,
      onSetToday: handleSetTodayDate,
      ref: forwardedRef,
      value: value,
      isAccepted: isAccepted
    }, other), React.createElement(DatePicker$1, {
      date: date,
      allowKeyboardControl: allowKeyboardControl,
      animateYearScrolling: animateYearScrolling,
      disableFuture: disableFuture,
      disablePast: disablePast,
      leftArrowIcon: leftArrowIcon,
      maxDate: maxDate,
      minDate: minDate,
      onChange: handleChange,
      openToYearSelection: openToYearSelection,
      renderDay: renderDay,
      rightArrowIcon: rightArrowIcon,
      shouldDisableDate: shouldDisableDate
    }));
  });
};
process.env.NODE_ENV !== "production" ? DatePickerModal.propTypes = {
  value: DomainPropTypes.date,
  minDate: DomainPropTypes.date,
  maxDate: DomainPropTypes.date,
  initialFocusedDate: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoOk: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  animateYearScrolling: PropTypes.bool,
  openToYearSelection: PropTypes.bool,
  labelFunc: PropTypes.func,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  renderDay: PropTypes.func,
  shouldDisableDate: PropTypes.func,
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : void 0;
DatePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  disableFuture: false,
  disablePast: false,
  animateYearScrolling: false,
  openToYearSelection: false,
  allowKeyboardControl: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined,
  forwardedRef: undefined
};
var DatePickerModal$1 = React.forwardRef(function (props, ref) {
  return React.createElement(DatePickerModal, tslib_1.__assign({}, props, {
    forwardedRef: ref
  }));
});

var InlineWrapper =
/** @class */
function (_super) {
  tslib_1.__extends(InlineWrapper, _super);

  function InlineWrapper() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      anchorEl: null
    };

    _this.open = function (e) {
      _this.setState({
        anchorEl: e.currentTarget
      });

      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    };

    _this.close = function () {
      _this.setState({
        anchorEl: null
      });

      _this.props.handleAccept();

      if (_this.props.onClose) {
        _this.props.onClose();
      }
    };

    _this.handleKeyDown = function (event) {
      switch (keycode(event)) {
        case 'enter':
          {
            _this.props.handleAccept();

            _this.close();

            break;
          }

        default:
          // if keycode is not handled, stop execution
          return;
      } // if event was handled prevent other side effects


      event.preventDefault();
    };

    return _this;
  }

  InlineWrapper.getDerivedStateFromProps = function (nextProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      return {
        anchorEl: null
      };
    }

    return null;
  };

  InlineWrapper.prototype.render = function () {
    var _a = this.props,
        value = _a.value,
        format = _a.format,
        children = _a.children,
        onOpen = _a.onOpen,
        onClose = _a.onClose,
        PopoverProps = _a.PopoverProps,
        isAccepted = _a.isAccepted,
        keyboard = _a.keyboard,
        onlyCalendar = _a.onlyCalendar,
        classes = _a.classes,
        handleAccept = _a.handleAccept,
        other = tslib_1.__rest(_a, ["value", "format", "children", "onOpen", "onClose", "PopoverProps", "isAccepted", "keyboard", "onlyCalendar", "classes", "handleAccept"]);

    var isOpen = Boolean(this.state.anchorEl);
    return React.createElement(React.Fragment, null, isOpen && React.createElement(EventListener, {
      target: "window",
      onKeyDown: this.handleKeyDown
    }), React.createElement(DateTextField$1, tslib_1.__assign({
      value: value,
      format: format,
      onClick: this.open,
      keyboard: keyboard
    }, other)), React.createElement(Popover, tslib_1.__assign({
      id: "picker-popover",
      open: isOpen,
      anchorEl: this.state.anchorEl,
      onClose: this.close,
      classes: {
        paper: classes.popoverPaper
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: keyboard ? 'right' : 'center'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: keyboard ? 'right' : 'center'
      },
      children: children
    }, PopoverProps)));
  };

  process.env.NODE_ENV !== "production" ? InlineWrapper.propTypes = {
    /** Show only calendar for datepicker in popover mode */
    onlyCalendar: PropTypes.bool,

    /** Picker value */
    value: DomainPropTypes.date,

    /** On open callback [(e: Event) => void] */
    onOpen: PropTypes.func,

    /** On close callback [(e: Event) => void] */
    onClose: PropTypes.func,

    /** Format string */
    format: PropTypes.string,

    /** Dialog props passed to material-ui Dialog */
    PopoverProps: PropTypes.object,
    labelFunc: PropTypes.func,
    onClear: PropTypes.func,
    isAccepted: PropTypes.bool,
    handleAccept: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    keyboard: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    innerRef: PropTypes.any
  } : void 0;
  InlineWrapper.defaultProps = {
    value: new Date(),
    labelFunc: undefined,
    onlyCalendar: false,
    format: undefined,
    onClear: undefined,
    onOpen: undefined,
    onClose: undefined,
    PopoverProps: undefined,
    isAccepted: false,
    keyboard: undefined
  };
  return InlineWrapper;
}(React.PureComponent);
var styles$9 = {
  popoverPaper: {
    maxWidth: 310,
    minWidth: 290,
    paddingBottom: 8
  }
}; // @ts-ignore

var InlineWrapper$1 = withStyles(styles$9)(InlineWrapper);

var DatePickerInline = function (props) {
  var allowKeyboardControl = props.allowKeyboardControl,
      animateYearScrolling = props.animateYearScrolling,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      format = props.format,
      forwardedRef = props.forwardedRef,
      labelFunc = props.labelFunc,
      leftArrowIcon = props.leftArrowIcon,
      maxDate = props.maxDate,
      minDate = props.minDate,
      initialFocusedDate = props.initialFocusedDate,
      onChange = props.onChange,
      openToYearSelection = props.openToYearSelection,
      renderDay = props.renderDay,
      rightArrowIcon = props.rightArrowIcon,
      shouldDisableDate = props.shouldDisableDate,
      value = props.value,
      autoOk = props.autoOk,
      onlyCalendar = props.onlyCalendar,
      other = tslib_1.__rest(props, ["allowKeyboardControl", "animateYearScrolling", "disableFuture", "disablePast", "format", "forwardedRef", "labelFunc", "leftArrowIcon", "maxDate", "minDate", "initialFocusedDate", "onChange", "openToYearSelection", "renderDay", "rightArrowIcon", "shouldDisableDate", "value", "autoOk", "onlyCalendar"]);

  var ComponentToShow = onlyCalendar ? Calendar$1 : DatePicker$1;
  return React.createElement(BasePicker$1, tslib_1.__assign({}, props, {
    autoOk: true
  }), function (_a) {
    var date = _a.date,
        utils = _a.utils,
        isAccepted = _a.isAccepted,
        handleChange = _a.handleChange,
        handleTextFieldChange = _a.handleTextFieldChange,
        handleAccept = _a.handleAccept;
    return React.createElement(InlineWrapper$1, tslib_1.__assign({
      disableFuture: disableFuture,
      disablePast: disablePast,
      format: format || utils.dateFormat,
      labelFunc: labelFunc,
      maxDate: maxDate,
      minDate: minDate,
      onChange: handleTextFieldChange,
      innerRef: forwardedRef,
      value: value,
      isAccepted: isAccepted,
      handleAccept: handleAccept
    }, other), React.createElement(ComponentToShow, {
      date: date,
      allowKeyboardControl: allowKeyboardControl,
      animateYearScrolling: animateYearScrolling,
      disableFuture: disableFuture,
      disablePast: disablePast,
      leftArrowIcon: leftArrowIcon,
      maxDate: maxDate,
      minDate: minDate,
      onChange: handleChange,
      openToYearSelection: openToYearSelection,
      renderDay: renderDay,
      rightArrowIcon: rightArrowIcon,
      shouldDisableDate: shouldDisableDate
    }));
  });
};
process.env.NODE_ENV !== "production" ? DatePickerInline.propTypes = {
  onlyCalendar: PropTypes.bool,
  value: DomainPropTypes.date,
  minDate: DomainPropTypes.date,
  maxDate: DomainPropTypes.date,
  initialFocusedDate: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  animateYearScrolling: PropTypes.bool,
  openToYearSelection: PropTypes.bool,
  labelFunc: PropTypes.func,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  renderDay: PropTypes.func,
  shouldDisableDate: PropTypes.func,
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  autoOk: PropTypes.bool
} : void 0;
DatePickerInline.defaultProps = {
  value: new Date(),
  format: undefined,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  disableFuture: false,
  disablePast: false,
  animateYearScrolling: false,
  openToYearSelection: false,
  allowKeyboardControl: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined,
  forwardedRef: undefined,
  autoOk: undefined,
  onlyCalendar: false
};
var DatePickerInline$1 = React.forwardRef(function (props, ref) {
  return React.createElement(DatePickerInline, tslib_1.__assign({}, props, {
    forwardedRef: ref
  }));
});

var center = {
  x: 260 / 2,
  y: 260 / 2
};
var basePoint = {
  x: center.x,
  y: 0
};
var cx = basePoint.x - center.x;
var cy = basePoint.y - center.y;

var rad2deg = function (rad) {
  return rad * 57.29577951308232;
};

var getAngleValue = function (step, offsetX, offsetY) {
  var x = offsetX - center.x;
  var y = offsetY - center.y;
  var atan = Math.atan2(cx, cy) - Math.atan2(x, y);
  var deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;
  var value = Math.floor(deg / step) || 0;
  var delta = Math.pow(x, 2) + Math.pow(y, 2);
  var distance = Math.sqrt(delta);
  return {
    value: value,
    distance: distance
  };
};

var getHours = function (offsetX, offsetY, ampm) {
  // tslint:disable-next-line
  var _a = getAngleValue(30, offsetX, offsetY),
      value = _a.value,
      distance = _a.distance;

  value = value || 12;

  if (!ampm) {
    if (distance < 90) {
      value += 12;
      value %= 24;
    }
  } else {
    value %= 12;
  }

  return value;
};
var getMinutes = function (offsetX, offsetY, step) {
  if (step === void 0) {
    step = 6;
  }

  var value = getAngleValue(step, offsetX, offsetY).value;
  return value;
};
var convertToMeridiem = function (time, meridiem, ampm, utils) {
  if (ampm) {
    var currentMeridiem = utils.getHours(time) >= 12 ? 'pm' : 'am';

    if (currentMeridiem !== meridiem) {
      var hours = meridiem === 'am' ? utils.getHours(time) - 12 : utils.getHours(time) + 12;
      return utils.setHours(time, hours);
    }
  }

  return time;
};

var ClockType;

(function (ClockType) {
  ClockType["HOURS"] = "hours";
  ClockType["MINUTES"] = "minutes";
  ClockType["SECONDS"] = "seconds";
})(ClockType || (ClockType = {}));

var ClockType$1 = ClockType;

var ClockPointer =
/** @class */
function (_super) {
  tslib_1.__extends(ClockPointer, _super);

  function ClockPointer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      toAnimateTransform: false,
      previousType: undefined
    };

    _this.getAngleStyle = function () {
      var _a = _this.props,
          value = _a.value,
          isInner = _a.isInner,
          type = _a.type;
      var max = type === ClockType$1.HOURS ? 12 : 60;
      var angle = 360 / max * value;

      if (type === ClockType$1.HOURS && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: isInner ? '26%' : '40%',
        transform: "rotateZ(" + angle + "deg)"
      };
    };

    return _this;
  }

  ClockPointer.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        classes = _c.classes,
        hasSelected = _c.hasSelected;
    return React.createElement("div", {
      style: this.getAngleStyle(),
      className: classnames(classes.pointer, (_a = {}, _a[classes.animateTransform] = this.state.toAnimateTransform, _a))
    }, React.createElement("div", {
      className: classnames(classes.thumb, (_b = {}, _b[classes.noPoint] = hasSelected, _b))
    }));
  };

  process.env.NODE_ENV !== "production" ? ClockPointer.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    hasSelected: PropTypes.bool.isRequired,
    isInner: PropTypes.bool.isRequired,
    innerRef: PropTypes.any,
    type: PropTypes.oneOf(Object.keys(ClockType$1).map(function (key) {
      return ClockType$1[key];
    })).isRequired
  } : void 0;

  ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
    if (nextProps.type !== state.previousType) {
      return {
        toAnimateTransform: true,
        previousType: nextProps.type
      };
    }

    return {
      toAnimateTransform: false,
      previousType: nextProps.type
    };
  };

  return ClockPointer;
}(React.Component);

var styles$a = function (theme) {
  return createStyles({
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height'])
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.common.white,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: "14px solid " + theme.palette.primary.main,
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  });
};

var ClockPointer$1 = withStyles(styles$a, {
  name: 'MuiPickersClockPointer'
})(ClockPointer);

var Clock =
/** @class */
function (_super) {
  tslib_1.__extends(Clock, _super);

  function Clock() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.isMoving = false;

    _this.handleTouchMove = function (e) {
      _this.isMoving = true;

      _this.setTime(e);
    };

    _this.handleTouchEnd = function (e) {
      if (_this.isMoving) {
        _this.setTime(e, true);

        _this.isMoving = false;
      }
    };

    _this.handleMove = function (e) {
      e.preventDefault();
      e.stopPropagation(); // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari

      var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

      if (isButtonPressed) {
        _this.setTime(e.nativeEvent, false);
      }
    };

    _this.handleMouseUp = function (e) {
      if (_this.isMoving) {
        _this.isMoving = false;
      }

      _this.setTime(e.nativeEvent, true);
    };

    _this.hasSelected = function () {
      var _a = _this.props,
          type = _a.type,
          value = _a.value;

      if (type === ClockType$1.HOURS) {
        return true;
      }

      return value % 5 === 0;
    };

    return _this;
  }

  Clock.prototype.setTime = function (e, isFinish) {
    if (isFinish === void 0) {
      isFinish = false;
    }

    var offsetX = e.offsetX,
        offsetY = e.offsetY;

    if (typeof offsetX === 'undefined') {
      var rect = e.target.getBoundingClientRect();
      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    var value = this.props.type === ClockType$1.SECONDS || this.props.type === ClockType$1.MINUTES ? getMinutes(offsetX, offsetY) : getHours(offsetX, offsetY, Boolean(this.props.ampm));
    this.props.onChange(value, isFinish);
  };

  Clock.prototype.render = function () {
    var _a = this.props,
        classes = _a.classes,
        value = _a.value,
        children = _a.children,
        type = _a.type,
        ampm = _a.ampm;
    var isPointerInner = !ampm && type === ClockType$1.HOURS && (value < 1 || value > 12);
    return React.createElement("div", {
      className: classes.container
    }, React.createElement("div", {
      className: classes.clock
    }, React.createElement("div", {
      role: "menu",
      tabIndex: -1,
      className: classes.squareMask,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onMouseUp: this.handleMouseUp,
      onMouseMove: this.handleMove
    }), React.createElement("div", {
      className: classes.pin
    }), React.createElement(ClockPointer$1, {
      type: type,
      value: value,
      isInner: isPointerInner,
      hasSelected: this.hasSelected()
    }), children));
  };

  process.env.NODE_ENV !== "production" ? Clock.propTypes = {
    type: PropTypes.oneOf(Object.keys(ClockType$1).map(function (key) {
      return ClockType$1[key];
    })).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    ampm: PropTypes.bool,
    innerRef: PropTypes.any
  } : void 0;
  Clock.defaultProps = {
    ampm: false
  };
  return Clock;
}(React.Component);

var styles$b = function (theme) {
  return createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: theme.spacing.unit * 4 + "px 0 " + theme.spacing.unit + "px"
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none',
      zIndex: 1
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move'
      }
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  });
};

var Clock$1 = withStyles(styles$b, {
  name: 'MuiPickersClock'
})(Clock);

var positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50]
};

var ClockNumber =
/** @class */
function (_super) {
  tslib_1.__extends(ClockNumber, _super);

  function ClockNumber() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.getTransformStyle = function (index) {
      var position = positions[index];
      return {
        transform: "translate(" + position[0] + "px, " + position[1] + "px"
      };
    };

    return _this;
  }

  ClockNumber.prototype.render = function () {
    var _a;

    var _b = this.props,
        selected = _b.selected,
        label = _b.label,
        index = _b.index,
        classes = _b.classes,
        isInner = _b.isInner;
    var className = classnames(classes.clockNumber, (_a = {}, _a[classes.selected] = selected, _a));
    return React.createElement(Typography, {
      variant: isInner ? 'body1' : 'subtitle1',
      component: "span",
      className: className,
      style: this.getTransformStyle(index)
    }, label);
  };

  process.env.NODE_ENV !== "production" ? ClockNumber.propTypes = {
    index: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    isInner: PropTypes.bool,
    innerRef: PropTypes.any
  } : void 0;
  ClockNumber.defaultProps = {
    isInner: false
  };
  return ClockNumber;
}(React.Component);

var styles$c = function (theme) {
  var size = theme.spacing.unit * 4;
  return createStyles({
    clockNumber: {
      width: size,
      height: size,
      userSelect: 'none',
      position: 'absolute',
      left: "calc(50% - " + size / 2 + "px)",
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.hint
    },
    selected: {
      color: theme.palette.common.white
    }
  });
};

var ClockNumber$1 = withStyles(styles$c, {
  name: 'MuiPickersClockNumber'
})(ClockNumber);

var getHourNumbers = function (_a) {
  var ampm = _a.ampm,
      utils = _a.utils,
      date = _a.date;
  var currentHours = utils.getHours(date);
  var hourNumbers = [];
  var startHour = ampm ? 1 : 0;
  var endHour = ampm ? 12 : 23;

  var isSelected = function (hour) {
    if (ampm) {
      if (hour === 12) {
        return currentHours === 12 || currentHours === 0;
      }

      return currentHours === hour || currentHours - 12 === hour;
    }

    return currentHours === hour;
  };

  for (var hour = startHour; hour <= endHour; hour += 1) {
    var label = hour.toString();

    if (hour === 0) {
      label = '00';
    }

    var props = {
      index: hour,
      label: utils.formatNumber(label),
      selected: isSelected(hour),
      isInner: !ampm && (hour === 0 || hour > 12)
    };
    hourNumbers.push(React.createElement(ClockNumber$1, tslib_1.__assign({
      key: hour
    }, props)));
  }

  return hourNumbers;
};
var getMinutesNumbers = function (_a) {
  var value = _a.value,
      utils = _a.utils;
  var f = utils.formatNumber;
  return [React.createElement(ClockNumber$1, {
    label: f('00'),
    selected: value === 0,
    index: 12,
    key: 12
  }), React.createElement(ClockNumber$1, {
    label: f('05'),
    selected: value === 5,
    index: 1,
    key: 1
  }), React.createElement(ClockNumber$1, {
    label: f('10'),
    selected: value === 10,
    index: 2,
    key: 2
  }), React.createElement(ClockNumber$1, {
    label: f('15'),
    selected: value === 15,
    index: 3,
    key: 3
  }), React.createElement(ClockNumber$1, {
    label: f('20'),
    selected: value === 20,
    index: 4,
    key: 4
  }), React.createElement(ClockNumber$1, {
    label: f('25'),
    selected: value === 25,
    index: 5,
    key: 5
  }), React.createElement(ClockNumber$1, {
    label: f('30'),
    selected: value === 30,
    index: 6,
    key: 6
  }), React.createElement(ClockNumber$1, {
    label: f('35'),
    selected: value === 35,
    index: 7,
    key: 7
  }), React.createElement(ClockNumber$1, {
    label: f('40'),
    selected: value === 40,
    index: 8,
    key: 8
  }), React.createElement(ClockNumber$1, {
    label: f('45'),
    selected: value === 45,
    index: 9,
    key: 9
  }), React.createElement(ClockNumber$1, {
    label: f('50'),
    selected: value === 50,
    index: 10,
    key: 10
  }), React.createElement(ClockNumber$1, {
    label: f('55'),
    selected: value === 55,
    index: 11,
    key: 11
  })];
};

var TimePickerView =
/** @class */
function (_super) {
  tslib_1.__extends(TimePickerView, _super);

  function TimePickerView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.getViewProps = function () {
      var _a = _this.props,
          type = _a.type,
          ampm = _a.ampm,
          date = _a.date,
          utils = _a.utils;

      switch (type) {
        case ClockType$1.HOURS:
          return {
            value: utils.getHours(date),
            children: getHourNumbers({
              date: date,
              ampm: Boolean(ampm),
              utils: utils
            }),
            onChange: _this.handleHourChange
          };

        case ClockType$1.MINUTES:
          var minutesValue = utils.getMinutes(date);
          return {
            value: minutesValue,
            children: getMinutesNumbers({
              value: minutesValue,
              utils: utils
            }),
            onChange: _this.handleMinutesChange
          };

        case ClockType$1.SECONDS:
          var secondsValue = utils.getSeconds(date);
          return {
            value: secondsValue,
            children: getMinutesNumbers({
              value: secondsValue,
              utils: utils
            }),
            onChange: _this.handleSecondsChange
          };

        default:
          throw new Error('You must provide the type for TimePickerView');
      }
    };

    _this.handleHourChange = function (hours, isFinish) {
      var _a = _this.props,
          date = _a.date,
          utils = _a.utils;
      var updatedTime = utils.setHours(date, hours);

      _this.props.onHourChange(updatedTime, isFinish);
    };

    _this.handleMinutesChange = function (minutes, isFinish) {
      var _a = _this.props,
          date = _a.date,
          utils = _a.utils;
      var updatedTime = utils.setMinutes(date, minutes);

      _this.props.onMinutesChange(updatedTime, isFinish);
    };

    _this.handleSecondsChange = function (seconds, isFinish) {
      var _a = _this.props,
          date = _a.date,
          utils = _a.utils;
      var updatedTime = utils.setSeconds(date, seconds);

      _this.props.onSecondsChange(updatedTime, isFinish);
    };

    return _this;
  }

  TimePickerView.prototype.render = function () {
    var _a = this.props,
        ampm = _a.ampm,
        type = _a.type;
    var viewProps = this.getViewProps();
    return React.createElement(Clock$1, tslib_1.__assign({
      type: type,
      ampm: ampm
    }, viewProps));
  };

  process.env.NODE_ENV !== "production" ? TimePickerView.propTypes = {
    date: PropTypes.object.isRequired,
    onHourChange: PropTypes.func.isRequired,
    onMinutesChange: PropTypes.func.isRequired,
    onSecondsChange: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    type: PropTypes.oneOf(Object.keys(ClockType$1).map(function (key) {
      return ClockType$1[key];
    })).isRequired
  } : void 0;
  TimePickerView.defaultProps = {
    ampm: true
  };
  return TimePickerView;
}(React.PureComponent);
var TimePickerView$1 = withUtils()(TimePickerView);

var TimePicker =
/** @class */
function (_super) {
  tslib_1.__extends(TimePicker, _super);

  function TimePicker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      openView: ClockType$1.HOURS,
      meridiemMode: _this.props.utils.getHours(_this.props.date) >= 12 ? 'pm' : 'am'
    };

    _this.setMeridiemMode = function (mode) {
      return function () {
        _this.setState({
          meridiemMode: mode
        }, function () {
          return _this.handleChange({
            time: _this.props.date,
            isFinish: false,
            openMinutes: false,
            openSeconds: false
          });
        });
      };
    };

    _this.handleChange = function (_a) {
      var time = _a.time,
          isFinish = _a.isFinish,
          openMinutes = _a.openMinutes,
          openSeconds = _a.openSeconds;
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
        openSeconds: false
      });
    };

    _this.handleMinutesChange = function (time, isFinish) {
      _this.handleChange({
        time: time,
        isFinish: isFinish,
        openMinutes: false,
        openSeconds: Boolean(_this.props.seconds)
      });
    };

    _this.handleSecondsChange = function (time, isFinish) {
      _this.handleChange({
        time: time,
        isFinish: isFinish,
        openMinutes: false,
        openSeconds: false
      });
    };

    _this.openSecondsView = function () {
      _this.setState({
        openView: ClockType$1.SECONDS
      });
    };

    _this.openMinutesView = function () {
      _this.setState({
        openView: ClockType$1.MINUTES
      });
    };

    _this.openHourView = function () {
      _this.setState({
        openView: ClockType$1.HOURS
      });
    };

    return _this;
  }

  TimePicker.prototype.render = function () {
    var _a;

    var _b = this.props,
        classes = _b.classes,
        theme = _b.theme,
        date = _b.date,
        utils = _b.utils,
        ampm = _b.ampm,
        seconds = _b.seconds;
    var _c = this.state,
        meridiemMode = _c.meridiemMode,
        openView = _c.openView;
    var rtl = theme.direction === 'rtl';
    var hourMinuteClassName = rtl ? classes.hourMinuteLabelReverse : classes.hourMinuteLabel;
    return React.createElement(React.Fragment, null, React.createElement(PickerToolbar$1, {
      className: classnames(classes.toolbar, (_a = {}, _a[classes.toolbarLeftPadding] = ampm, _a))
    }, React.createElement("div", {
      className: hourMinuteClassName
    }, React.createElement(ToolbarButton$1, {
      variant: "h2",
      onClick: this.openHourView,
      selected: openView === ClockType$1.HOURS,
      label: utils.getHourText(date, Boolean(ampm))
    }), React.createElement(ToolbarButton$1, {
      variant: "h2",
      label: ":",
      selected: false,
      className: classes.separator
    }), React.createElement(ToolbarButton$1, {
      variant: "h2",
      onClick: this.openMinutesView,
      selected: openView === ClockType$1.MINUTES,
      label: utils.getMinuteText(date)
    }), seconds && React.createElement(React.Fragment, null, React.createElement(ToolbarButton$1, {
      variant: "h2",
      label: ":",
      selected: false,
      className: classes.separator
    }), React.createElement(ToolbarButton$1, {
      variant: "h2",
      onClick: this.openSecondsView,
      selected: openView === ClockType$1.SECONDS,
      label: utils.getSecondText(date)
    }))), ampm && React.createElement("div", {
      className: seconds ? classes.ampmSelectionWithSeconds : classes.ampmSelection
    }, React.createElement(ToolbarButton$1, {
      className: classes.ampmLabel,
      selected: meridiemMode === 'am',
      variant: "subtitle1",
      label: utils.getMeridiemText('am'),
      onClick: this.setMeridiemMode('am')
    }), React.createElement(ToolbarButton$1, {
      className: classes.ampmLabel,
      selected: meridiemMode === 'pm',
      variant: "subtitle1",
      label: utils.getMeridiemText('pm'),
      onClick: this.setMeridiemMode('pm')
    }))), this.props.children, React.createElement(TimePickerView$1, {
      date: date,
      type: this.state.openView,
      ampm: ampm,
      onHourChange: this.handleHourChange,
      onMinutesChange: this.handleMinutesChange,
      onSecondsChange: this.handleSecondsChange
    }));
  };

  process.env.NODE_ENV !== "production" ? TimePicker.propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    seconds: PropTypes.bool,
    innerRef: PropTypes.any
  } : void 0;
  TimePicker.defaultProps = {
    children: null,
    ampm: true,
    seconds: false
  };
  return TimePicker;
}(React.Component);

var styles$d = function () {
  return createStyles({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    toolbarLeftPadding: {
      paddingLeft: 50
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default'
    },
    ampmSelection: {
      marginLeft: 20,
      marginRight: -20
    },
    ampmSelectionWithSeconds: {
      marginLeft: 15,
      marginRight: 10
    },
    ampmLabel: {
      fontSize: 18
    },
    hourMinuteLabel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    hourMinuteLabelReverse: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row-reverse'
    }
  });
};

var TimePicker$1 = withStyles(styles$d, {
  withTheme: true,
  name: 'MuiPickersTimePicker'
})(withUtils()(TimePicker));

var TimePickerModal = function (props) {
  var value = props.value,
      format = props.format,
      autoOk = props.autoOk,
      onChange = props.onChange,
      ampm = props.ampm,
      forwardedRef = props.forwardedRef,
      seconds = props.seconds,
      other = tslib_1.__rest(props, ["value", "format", "autoOk", "onChange", "ampm", "forwardedRef", "seconds"]);

  return React.createElement(BasePicker$1, tslib_1.__assign({}, props), function (_a) {
    var date = _a.date,
        utils = _a.utils,
        handleAccept = _a.handleAccept,
        handleChange = _a.handleChange,
        handleClear = _a.handleClear,
        handleDismiss = _a.handleDismiss,
        handleSetTodayDate = _a.handleSetTodayDate,
        handleTextFieldChange = _a.handleTextFieldChange,
        isAccepted = _a.isAccepted,
        pick12hOr24hFormat = _a.pick12hOr24hFormat;
    return React.createElement(ModalWrapper, tslib_1.__assign({
      ref: forwardedRef,
      value: value,
      onClear: handleClear,
      onAccept: handleAccept,
      onChange: handleTextFieldChange,
      onDismiss: handleDismiss,
      onSetToday: handleSetTodayDate,
      isAccepted: isAccepted,
      format: pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat)
    }, other), React.createElement(TimePicker$1, {
      date: date,
      onChange: handleChange,
      ampm: ampm,
      seconds: seconds
    }));
  });
};
process.env.NODE_ENV !== "production" ? TimePickerModal.propTypes = {
  value: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoOk: PropTypes.bool,
  ampm: PropTypes.bool,
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : void 0;
TimePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  ampm: true,
  forwardedRef: undefined,
  seconds: false
};
var TimePickerModal$1 = React.forwardRef(function (props, ref) {
  return React.createElement(TimePickerModal, tslib_1.__assign({}, props, {
    forwardedRef: ref
  }));
});

var TimePickerInline = function (props) {
  var value = props.value,
      format = props.format,
      onChange = props.onChange,
      ampm = props.ampm,
      forwardedRef = props.forwardedRef,
      seconds = props.seconds,
      other = tslib_1.__rest(props, ["value", "format", "onChange", "ampm", "forwardedRef", "seconds"]);

  return React.createElement(BasePicker$1, tslib_1.__assign({}, props, {
    autoOk: true
  }), function (_a) {
    var date = _a.date,
        utils = _a.utils,
        handleChange = _a.handleChange,
        handleTextFieldChange = _a.handleTextFieldChange,
        isAccepted = _a.isAccepted,
        pick12hOr24hFormat = _a.pick12hOr24hFormat,
        handleAccept = _a.handleAccept;
    return React.createElement(InlineWrapper$1, tslib_1.__assign({
      innerRef: forwardedRef,
      value: value,
      onChange: handleTextFieldChange,
      isAccepted: isAccepted,
      handleAccept: handleAccept,
      format: pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat)
    }, other), React.createElement(TimePicker$1, {
      date: date,
      onChange: handleChange,
      ampm: ampm,
      seconds: seconds
    }));
  });
};
process.env.NODE_ENV !== "production" ? TimePickerInline.propTypes = {
  value: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : void 0;
TimePickerInline.defaultProps = {
  ampm: true,
  value: new Date(),
  format: undefined,
  forwardedRef: undefined,
  seconds: false
};
var TimePickerInline$1 = React.forwardRef(function (props, ref) {
  return React.createElement(TimePickerInline, tslib_1.__assign({}, props, {
    forwardedRef: ref
  }));
});

var DateTimePickerView;

(function (DateTimePickerView) {
  DateTimePickerView["YEAR"] = "year";
  DateTimePickerView["DATE"] = "date";
  DateTimePickerView["HOUR"] = "hours";
  DateTimePickerView["MINUTES"] = "minutes";
})(DateTimePickerView || (DateTimePickerView = {}));

var DateTimePickerView$1 = DateTimePickerView;

var DateTimePickerHeader = function (props) {
  var date = props.date,
      classes = props.classes,
      openView = props.openView,
      meridiemMode = props.meridiemMode,
      onOpenViewChange = props.onOpenViewChange,
      setMeridiemMode = props.setMeridiemMode,
      theme = props.theme,
      utils = props.utils,
      ampm = props.ampm;

  var changeOpenView = function (view) {
    return function () {
      return onOpenViewChange(view);
    };
  };

  var rtl = theme.direction === 'rtl';
  var hourMinuteClassName = rtl ? classes.hourMinuteLabelReverse : classes.hourMinuteLabel;
  return React.createElement(PickerToolbar$1, {
    className: classes.toolbar
  }, React.createElement("div", {
    className: classes.dateHeader
  }, React.createElement(ToolbarButton$1, {
    variant: "subtitle1",
    onClick: changeOpenView(DateTimePickerView$1.YEAR),
    selected: openView === DateTimePickerView$1.YEAR,
    label: utils.getYearText(date)
  }), React.createElement(ToolbarButton$1, {
    variant: "h4",
    onClick: changeOpenView(DateTimePickerView$1.DATE),
    selected: openView === DateTimePickerView$1.DATE,
    label: utils.getDateTimePickerHeaderText(date)
  })), React.createElement("div", {
    className: classes.timeHeader
  }, React.createElement("div", {
    className: hourMinuteClassName
  }, React.createElement(ToolbarButton$1, {
    variant: "h3",
    onClick: changeOpenView(DateTimePickerView$1.HOUR),
    selected: openView === DateTimePickerView$1.HOUR,
    label: utils.getHourText(date, ampm)
  }), React.createElement(ToolbarButton$1, {
    variant: "h3",
    label: ":",
    selected: false,
    className: classes.separator
  }), React.createElement(ToolbarButton$1, {
    variant: "h3",
    onClick: changeOpenView(DateTimePickerView$1.MINUTES),
    selected: openView === DateTimePickerView$1.MINUTES,
    label: utils.getMinuteText(date)
  })), ampm && React.createElement("div", {
    className: classes.ampmSelection
  }, React.createElement(ToolbarButton$1, {
    className: classes.ampmLabel,
    selected: meridiemMode === 'am',
    variant: "subtitle1",
    label: utils.getMeridiemText('am'),
    onClick: setMeridiemMode('am')
  }), React.createElement(ToolbarButton$1, {
    className: classes.ampmLabel,
    selected: meridiemMode === 'pm',
    variant: "subtitle1",
    label: utils.getMeridiemText('pm'),
    onClick: setMeridiemMode('pm')
  }))));
};
process.env.NODE_ENV !== "production" ? DateTimePickerHeader.propTypes = {
  date: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  meridiemMode: PropTypes.string.isRequired,
  openView: PropTypes.string.isRequired,
  onOpenViewChange: PropTypes.func.isRequired,
  setMeridiemMode: PropTypes.func.isRequired,
  utils: PropTypes.object.isRequired,
  ampm: PropTypes.bool,
  innerRef: PropTypes.any
} : void 0;
DateTimePickerHeader.defaultProps = {
  ampm: true
};

var styles$e = function () {
  return createStyles({
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around'
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default'
    },
    ampmSelection: {
      marginLeft: 10,
      marginRight: -10
    },
    ampmLabel: {
      fontSize: 18
    },
    hourMinuteLabel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    hourMinuteLabelReverse: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row-reverse'
    },
    dateHeader: {
      height: 65
    },
    timeHeader: {
      height: 65,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    }
  });
};

var DatetimePickerHeader = withStyles(styles$e, {
  withTheme: true
})(withUtils()(DateTimePickerHeader));

var viewToTabIndex = function (openView) {
  if (openView === DateTimePickerView$1.DATE || openView === DateTimePickerView$1.YEAR) {
    return 'date';
  }

  return 'time';
};

var tabIndexToView = function (tab) {
  if (tab === 'date') {
    return DateTimePickerView$1.DATE;
  }

  return DateTimePickerView$1.HOUR;
};

var DateTimePickerTabs = function (props) {
  var view = props.view,
      onChange = props.onChange,
      classes = props.classes,
      theme = props.theme,
      dateRangeIcon = props.dateRangeIcon,
      timeIcon = props.timeIcon;
  var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';

  var handleChange = function (e, value) {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return React.createElement(Paper, null, React.createElement(Tabs, {
    fullWidth: true,
    value: viewToTabIndex(view),
    onChange: handleChange,
    className: classes.tabs,
    indicatorColor: indicatorColor
  }, React.createElement(Tab, {
    value: "date",
    icon: React.createElement(Icon, null, dateRangeIcon)
  }), React.createElement(Tab, {
    value: "time",
    icon: React.createElement(Icon, null, timeIcon)
  })));
};
process.env.NODE_ENV !== "production" ? DateTimePickerTabs.propTypes = {
  view: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  dateRangeIcon: PropTypes.node.isRequired,
  timeIcon: PropTypes.node.isRequired
} : void 0;

var styles$f = function (theme) {
  return {
    tabs: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background["default"]
    }
  };
};

var DateTimePickerTabs$1 = withTheme()(withStyles(styles$f, {
  name: 'MuiPickerDTTabs'
})(DateTimePickerTabs));

var DateTimePickerView$2 = function (_a) {
  var selected = _a.selected,
      children = _a.children;

  if (!selected) {
    return null;
  }

  return React.createElement("div", {
    children: children
  });
};
process.env.NODE_ENV !== "production" ? DateTimePickerView$2.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
} : void 0;

var DateTimePicker =
/** @class */
function (_super) {
  tslib_1.__extends(DateTimePicker, _super);

  function DateTimePicker() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      openView: _this.props.openTo,
      meridiemMode: _this.props.utils.getHours(_this.props.date) >= 12 ? 'pm' : 'am'
    };

    _this.onChange = function (time, isFinish, nextView) {
      if (isFinish === void 0) {
        isFinish = true;
      }

      _this.handleChange(time);

      if (isFinish && _this.props.autoSubmit) {
        _this.handleViewChange(nextView);
      }
    };

    _this.setMeridiemMode = function (mode) {
      return function () {
        _this.setState({
          meridiemMode: mode
        }, function () {
          return _this.handleChange(_this.props.date, false);
        });
      };
    };

    _this.handleViewChange = function (view) {
      _this.setState({
        openView: view
      });
    };

    _this.handleChange = function (time, isFinish) {
      if (isFinish === void 0) {
        isFinish = false;
      }

      var withMeridiem = convertToMeridiem(time, _this.state.meridiemMode, Boolean(_this.props.ampm), _this.props.utils);

      _this.props.onChange(withMeridiem, isFinish);
    };

    _this.handleYearChange = function (date) {
      _this.onChange(date, false, DateTimePickerView$1.DATE);
    };

    _this.handleDayChange = function (date, isFinish) {
      _this.onChange(date, isFinish, DateTimePickerView$1.HOUR);
    };

    _this.handleHourChange = function (time, isFinish) {
      _this.onChange(time, isFinish, DateTimePickerView$1.MINUTES);
    };

    return _this;
  }

  DateTimePicker.prototype.render = function () {
    var _a = this.state,
        openView = _a.openView,
        meridiemMode = _a.meridiemMode;
    var _b = this.props,
        date = _b.date,
        minDate = _b.minDate,
        maxDate = _b.maxDate,
        showTabs = _b.showTabs,
        disablePast = _b.disablePast,
        disableFuture = _b.disableFuture,
        leftArrowIcon = _b.leftArrowIcon,
        rightArrowIcon = _b.rightArrowIcon,
        dateRangeIcon = _b.dateRangeIcon,
        timeIcon = _b.timeIcon,
        renderDay = _b.renderDay,
        ampm = _b.ampm,
        shouldDisableDate = _b.shouldDisableDate,
        animateYearScrolling = _b.animateYearScrolling,
        allowKeyboardControl = _b.allowKeyboardControl,
        ViewContainerComponent = _b.ViewContainerComponent;
    var Container = ViewContainerComponent;
    var ViewContainerComponentProps = typeof ViewContainerComponent === 'string' ? {} : {
      openView: openView,
      onChange: this.onChange
    };
    return React.createElement(React.Fragment, null, React.createElement(DatetimePickerHeader, {
      date: date,
      openView: openView,
      meridiemMode: meridiemMode,
      setMeridiemMode: this.setMeridiemMode,
      onOpenViewChange: this.handleViewChange,
      ampm: ampm
    }), showTabs && React.createElement(DateTimePickerTabs$1, {
      view: openView,
      onChange: this.handleViewChange,
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon
    }), React.createElement(Container, tslib_1.__assign({}, ViewContainerComponentProps), React.createElement(DateTimePickerView$2, {
      selected: openView === DateTimePickerView$1.YEAR
    }, React.createElement(YearSelection$1, {
      date: date,
      minDate: minDate,
      maxDate: maxDate,
      onChange: this.handleYearChange,
      disablePast: disablePast,
      disableFuture: disableFuture,
      animateYearScrolling: animateYearScrolling
    })), React.createElement(DateTimePickerView$2, {
      selected: openView === DateTimePickerView$1.DATE
    }, React.createElement(Calendar$1, {
      allowKeyboardControl: allowKeyboardControl,
      date: date,
      minDate: minDate,
      maxDate: maxDate,
      onChange: this.handleDayChange,
      disablePast: disablePast,
      disableFuture: disableFuture,
      leftArrowIcon: leftArrowIcon,
      rightArrowIcon: rightArrowIcon,
      renderDay: renderDay,
      shouldDisableDate: shouldDisableDate
    })), React.createElement(DateTimePickerView$2, {
      selected: openView === DateTimePickerView$1.HOUR || openView === DateTimePickerView$1.MINUTES
    }, React.createElement(TimePickerView$1, {
      date: date,
      type: openView,
      onHourChange: this.handleHourChange,
      onMinutesChange: this.handleChange,
      onSecondsChange: this.handleChange,
      ampm: ampm
    }))));
  };

  process.env.NODE_ENV !== "production" ? DateTimePicker.propTypes = {
    allowKeyboardControl: PropTypes.bool,
    ampm: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    autoSubmit: PropTypes.bool,
    date: PropTypes.object.isRequired,
    initialFocusedDate: PropTypes.any,
    innerRef: PropTypes.any,
    dateRangeIcon: PropTypes.node,
    disableFuture: PropTypes.bool,
    disablePast: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    maxDate: DomainPropTypes.date.isRequired,
    minDate: DomainPropTypes.date.isRequired,
    onChange: PropTypes.func.isRequired,
    openTo: PropTypes.oneOf(Object.keys(DateTimePickerView$1).map(function (key) {
      return DateTimePickerView$1[key];
    })).isRequired,
    renderDay: PropTypes.func,
    rightArrowIcon: PropTypes.node,
    shouldDisableDate: PropTypes.func,
    showTabs: PropTypes.bool,
    timeIcon: PropTypes.node,
    utils: PropTypes.object.isRequired,
    ViewContainerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object])
  } : void 0;
  DateTimePicker.defaultProps = {
    allowKeyboardControl: false,
    ampm: true,
    animateYearScrolling: false,
    autoSubmit: true,
    dateRangeIcon: undefined,
    disableFuture: false,
    disablePast: false,
    leftArrowIcon: undefined,
    renderDay: undefined,
    rightArrowIcon: undefined,
    shouldDisableDate: undefined,
    showTabs: true,
    timeIcon: undefined,
    ViewContainerComponent: 'div'
  };
  return DateTimePicker;
}(React.Component);
var DateTimePicker$1 = withUtils()(DateTimePicker);

var DateTimePickerModal = function (props) {
  var value = props.value,
      format = props.format,
      autoOk = props.autoOk,
      openTo = props.openTo,
      minDate = props.minDate,
      maxDate = props.maxDate,
      initialFocusedDate = props.initialFocusedDate,
      showTabs = props.showTabs,
      autoSubmit = props.autoSubmit,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      leftArrowIcon = props.leftArrowIcon,
      rightArrowIcon = props.rightArrowIcon,
      dateRangeIcon = props.dateRangeIcon,
      timeIcon = props.timeIcon,
      renderDay = props.renderDay,
      ampm = props.ampm,
      shouldDisableDate = props.shouldDisableDate,
      animateYearScrolling = props.animateYearScrolling,
      forwardedRef = props.forwardedRef,
      allowKeyboardControl = props.allowKeyboardControl,
      other = tslib_1.__rest(props, ["value", "format", "autoOk", "openTo", "minDate", "maxDate", "initialFocusedDate", "showTabs", "autoSubmit", "disablePast", "disableFuture", "leftArrowIcon", "rightArrowIcon", "dateRangeIcon", "timeIcon", "renderDay", "ampm", "shouldDisableDate", "animateYearScrolling", "forwardedRef", "allowKeyboardControl"]);

  return React.createElement(BasePicker$1, tslib_1.__assign({}, props), function (_a) {
    var date = _a.date,
        utils = _a.utils,
        handleAccept = _a.handleAccept,
        handleChange = _a.handleChange,
        handleClear = _a.handleClear,
        handleDismiss = _a.handleDismiss,
        handleSetTodayDate = _a.handleSetTodayDate,
        handleTextFieldChange = _a.handleTextFieldChange,
        isAccepted = _a.isAccepted,
        pick12hOr24hFormat = _a.pick12hOr24hFormat;
    return React.createElement(ModalWrapper, tslib_1.__assign({
      ref: forwardedRef,
      disableFuture: disableFuture,
      disablePast: disablePast,
      maxDate: maxDate,
      minDate: minDate,
      onAccept: handleAccept,
      onChange: handleTextFieldChange,
      onClear: handleClear,
      onDismiss: handleDismiss,
      onSetToday: handleSetTodayDate,
      value: value,
      isAccepted: isAccepted,
      format: pick12hOr24hFormat(utils.dateTime12hFormat, utils.dateTime24hFormat)
    }, other), React.createElement(DateTimePicker$1, {
      allowKeyboardControl: allowKeyboardControl,
      ampm: ampm,
      animateYearScrolling: animateYearScrolling,
      autoSubmit: autoSubmit,
      date: date,
      dateRangeIcon: dateRangeIcon,
      disableFuture: disableFuture,
      disablePast: disablePast,
      leftArrowIcon: leftArrowIcon,
      maxDate: maxDate,
      minDate: minDate,
      onChange: handleChange,
      openTo: openTo,
      renderDay: renderDay,
      rightArrowIcon: rightArrowIcon,
      shouldDisableDate: shouldDisableDate,
      showTabs: showTabs,
      timeIcon: timeIcon
    }));
  });
};
process.env.NODE_ENV !== "production" ? DateTimePickerModal.propTypes = {
  /** Date-time picker value */
  value: DomainPropTypes.date,

  /** Date format string for input */
  format: PropTypes.string,

  /** Callback firing when date accepted [(date: Date) => void] */
  onChange: PropTypes.func.isRequired,

  /** Auto accept date on minute selection */
  autoOk: PropTypes.bool,

  /** Move to the next part of date on select (year -> date -> hour -> minute) */
  autoSubmit: PropTypes.bool,

  /** Disable future dates */
  disableFuture: PropTypes.bool,

  /** Disable past dates */
  disablePast: PropTypes.bool,

  /** Min selectable date */
  minDate: DomainPropTypes.date,

  /** Max selectable date */
  maxDate: DomainPropTypes.date,

  /** Initial focused date when calendar opens, if no value is provided */
  initialFocusedDate: DomainPropTypes.date,

  /** Show date/time tabs */
  showTabs: PropTypes.bool,

  /** Left arrow icon */
  leftArrowIcon: PropTypes.node,

  /** Right arrow icon */
  rightArrowIcon: PropTypes.node,

  /** Date tab icon */
  dateRangeIcon: PropTypes.node,

  /** Time tab icon */
  timeIcon: PropTypes.node,

  /**
   * Custom renderer for day
   * [(date: Date, nowSelectedDate: Date, isInCurrentMonth: boolean) => ReactElement]
   */
  renderDay: PropTypes.func,

  /** 12h/24h view for hour selection clock */
  ampm: PropTypes.bool,

  /** Disable specific date [(date: Date) => boolean] */
  shouldDisableDate: PropTypes.func,

  /** Enable animated scrolling to current year */
  animateYearScrolling: PropTypes.bool,

  /** Open directly to particular view */
  openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),

  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : void 0;
DateTimePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  autoSubmit: true,
  openTo: 'date',
  disableFuture: false,
  disablePast: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  showTabs: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  dateRangeIcon: 'date_range',
  timeIcon: 'access_time',
  renderDay: undefined,
  ampm: true,
  shouldDisableDate: undefined,
  animateYearScrolling: false,
  forwardedRef: undefined,
  allowKeyboardControl: true
};
var DateTimePickerModal$1 = React.forwardRef(function (props, ref) {
  return React.createElement(DateTimePickerModal, tslib_1.__assign({}, props, {
    forwardedRef: ref
  }));
});

var DateTimePickerInline = function (props) {
  var value = props.value,
      format = props.format,
      autoOk = props.autoOk,
      openTo = props.openTo,
      minDate = props.minDate,
      maxDate = props.maxDate,
      initialFocusedDate = props.initialFocusedDate,
      showTabs = props.showTabs,
      autoSubmit = props.autoSubmit,
      disablePast = props.disablePast,
      disableFuture = props.disableFuture,
      leftArrowIcon = props.leftArrowIcon,
      rightArrowIcon = props.rightArrowIcon,
      dateRangeIcon = props.dateRangeIcon,
      timeIcon = props.timeIcon,
      renderDay = props.renderDay,
      ampm = props.ampm,
      shouldDisableDate = props.shouldDisableDate,
      animateYearScrolling = props.animateYearScrolling,
      forwardedRef = props.forwardedRef,
      allowKeyboardControl = props.allowKeyboardControl,
      other = tslib_1.__rest(props, ["value", "format", "autoOk", "openTo", "minDate", "maxDate", "initialFocusedDate", "showTabs", "autoSubmit", "disablePast", "disableFuture", "leftArrowIcon", "rightArrowIcon", "dateRangeIcon", "timeIcon", "renderDay", "ampm", "shouldDisableDate", "animateYearScrolling", "forwardedRef", "allowKeyboardControl"]);

  return React.createElement(BasePicker$1, tslib_1.__assign({}, props, {
    autoOk: true
  }), function (_a) {
    var date = _a.date,
        utils = _a.utils,
        handleChange = _a.handleChange,
        handleTextFieldChange = _a.handleTextFieldChange,
        isAccepted = _a.isAccepted,
        pick12hOr24hFormat = _a.pick12hOr24hFormat,
        handleAccept = _a.handleAccept;
    return React.createElement(InlineWrapper$1, tslib_1.__assign({
      innerRef: forwardedRef,
      disableFuture: disableFuture,
      disablePast: disablePast,
      maxDate: maxDate,
      minDate: minDate,
      onChange: handleTextFieldChange,
      value: value,
      isAccepted: isAccepted,
      handleAccept: handleAccept,
      format: pick12hOr24hFormat(utils.dateTime12hFormat, utils.dateTime24hFormat)
    }, other), React.createElement(DateTimePicker$1, {
      allowKeyboardControl: allowKeyboardControl,
      ampm: ampm,
      animateYearScrolling: animateYearScrolling,
      autoSubmit: autoSubmit,
      date: date,
      dateRangeIcon: dateRangeIcon,
      disableFuture: disableFuture,
      disablePast: disablePast,
      leftArrowIcon: leftArrowIcon,
      maxDate: maxDate,
      minDate: minDate,
      onChange: handleChange,
      openTo: openTo,
      renderDay: renderDay,
      rightArrowIcon: rightArrowIcon,
      shouldDisableDate: shouldDisableDate,
      showTabs: showTabs,
      timeIcon: timeIcon
    }));
  });
};
process.env.NODE_ENV !== "production" ? DateTimePickerInline.propTypes = {
  value: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoOk: PropTypes.bool,
  autoSubmit: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  minDate: DomainPropTypes.date,
  maxDate: DomainPropTypes.date,
  initialFocusedDate: DomainPropTypes.date,
  showTabs: PropTypes.bool,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  dateRangeIcon: PropTypes.node,
  timeIcon: PropTypes.node,
  renderDay: PropTypes.func,
  ampm: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  animateYearScrolling: PropTypes.bool,
  openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : void 0;
DateTimePickerInline.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  autoSubmit: true,
  openTo: 'date',
  disableFuture: false,
  disablePast: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  showTabs: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  dateRangeIcon: 'date_range',
  timeIcon: 'access_time',
  renderDay: undefined,
  ampm: true,
  shouldDisableDate: undefined,
  animateYearScrolling: false,
  forwardedRef: undefined,
  allowKeyboardControl: true
};
var DateTimePickerInline$1 = React.forwardRef(function (props, ref) {
  return React.createElement(DateTimePickerInline, tslib_1.__assign({}, props, {
    forwardedRef: ref
  }));
});

exports.DatePicker = DatePickerModal$1;
exports.InlineDatePicker = DatePickerInline$1;
exports.TimePicker = TimePickerModal$1;
exports.InlineTimePicker = TimePickerInline$1;
exports.DateTimePicker = DateTimePickerModal$1;
exports.InlineDateTimePicker = DateTimePickerInline$1;
exports.MuiPickersUtilsProvider = MuiPickersUtilsProvider;
//# sourceMappingURL=material-ui-pickers.cjs.js.map
