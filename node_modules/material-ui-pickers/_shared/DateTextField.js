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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DomainPropTypes from '../constants/prop-types';
import MaskedInput from './MaskedInput';
import { withUtils } from './WithUtils';
var getDisplayDate = function (_a) {
    var utils = _a.utils, value = _a.value, format = _a.format, invalidLabel = _a.invalidLabel, emptyLabel = _a.emptyLabel, labelFunc = _a.labelFunc;
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
    var utils = props.utils, maxDate = props.maxDate, minDate = props.minDate, disablePast = props.disablePast, disableFuture = props.disableFuture, maxDateMessage = props.maxDateMessage, minDateMessage = props.minDateMessage, invalidDateMessage = props.invalidDateMessage;
    if (!utils.isValid(value)) {
        // if null - do not show error
        if (utils.isNull(value)) {
            return '';
        }
        return invalidDateMessage;
    }
    if ((maxDate && utils.isAfter(value, utils.endOfDay(utils.date(maxDate)))) ||
        (disableFuture && utils.isAfter(value, utils.endOfDay(utils.date())))) {
        return maxDateMessage;
    }
    if ((minDate && utils.isBefore(value, utils.startOfDay(utils.date(minDate)))) ||
        (disablePast && utils.isBefore(value, utils.startOfDay(utils.date())))) {
        return minDateMessage;
    }
    return '';
};
var DateTextField = /** @class */ (function (_super) {
    __extends(DateTextField, _super);
    function DateTextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = DateTextField.updateState(_this.props);
        _this.commitUpdates = function (value) {
            var _a = _this.props, clearable = _a.clearable, onClear = _a.onClear, utils = _a.utils, format = _a.format, onError = _a.onError;
            if (value === '') {
                if (_this.props.value === null) {
                    _this.setState(DateTextField.updateState(_this.props));
                }
                else if (clearable && onClear) {
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
                value: error ? newValue : oldValue,
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
            var _a = _this.props, utils = _a.utils, format = _a.format, onInputChange = _a.onInputChange;
            var parsedValue = utils.parse(e.target.value, format);
            if (onInputChange) {
                onInputChange(e);
            }
            _this.setState({
                displayValue: e.target.value,
                error: getError(parsedValue, _this.props),
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
                }
                else {
                    // @ts-ignore TODO check me
                    _this.commitUpdates(e.target.value);
                }
            }
        };
        _this.openPicker = function (e) {
            var _a = _this.props, disabled = _a.disabled, onClick = _a.onClick;
            if (!disabled) {
                onClick(e);
            }
        };
        return _this;
    }
    DateTextField.prototype.componentDidUpdate = function (prevProps) {
        if (!this.props.utils.isEqual(this.props.value, prevProps.value) ||
            prevProps.format !== this.props.format ||
            prevProps.maxDate !== this.props.maxDate ||
            prevProps.minDate !== this.props.minDate ||
            prevProps.emptyLabel !== this.props.emptyLabel ||
            prevProps.utils !== this.props.utils) {
            /* eslint-disable-next-line react/no-did-update-set-state */
            this.setState(DateTextField.updateState(this.props));
        }
    };
    DateTextField.prototype.render = function () {
        var _a = this.props, adornmentPosition = _a.adornmentPosition, clearable = _a.clearable, disabled = _a.disabled, disableFuture = _a.disableFuture, disableOpenOnEnter = _a.disableOpenOnEnter, disablePast = _a.disablePast, emptyLabel = _a.emptyLabel, format = _a.format, InputAdornmentProps = _a.InputAdornmentProps, InputProps = _a.InputProps, invalidDateMessage = _a.invalidDateMessage, invalidLabel = _a.invalidLabel, keyboard = _a.keyboard, keyboardIcon = _a.keyboardIcon, labelFunc = _a.labelFunc, mask = _a.mask, maxDate = _a.maxDate, maxDateMessage = _a.maxDateMessage, minDate = _a.minDate, minDateMessage = _a.minDateMessage, onBlur = _a.onBlur, onClear = _a.onClear, onClick = _a.onClick, pipe = _a.pipe, TextFieldComponent = _a.TextFieldComponent, utils = _a.utils, value = _a.value, onInputChange = _a.onInputChange, other = __rest(_a, ["adornmentPosition", "clearable", "disabled", "disableFuture", "disableOpenOnEnter", "disablePast", "emptyLabel", "format", "InputAdornmentProps", "InputProps", "invalidDateMessage", "invalidLabel", "keyboard", "keyboardIcon", "labelFunc", "mask", "maxDate", "maxDateMessage", "minDate", "minDateMessage", "onBlur", "onClear", "onClick", "pipe", "TextFieldComponent", "utils", "value", "onInputChange"]);
        var _b = this.state, displayValue = _b.displayValue, error = _b.error;
        var localInputProps = {
            inputComponent: MaskedInput,
            inputProps: {
                mask: !keyboard ? null : mask,
                pipe: !keyboard ? null : pipe,
                readOnly: !keyboard,
            },
        };
        if (keyboard) {
            localInputProps[adornmentPosition + "Adornment"] = (React.createElement(InputAdornment, __assign({ position: adornmentPosition }, InputAdornmentProps),
                React.createElement(IconButton, { disabled: disabled, onClick: this.openPicker },
                    React.createElement(Icon, null,
                        " ",
                        keyboardIcon,
                        " "))));
        }
        var Component = TextFieldComponent;
        var inputProps = __assign({}, localInputProps, InputProps);
        return (React.createElement(Component, __assign({ onClick: this.handleFocus, error: !!error, helperText: error, onKeyPress: this.handleKeyPress, onBlur: this.handleBlur, disabled: disabled, value: displayValue }, other, { onError: undefined, onChange: this.handleChange, InputProps: inputProps })));
    };
    DateTextField.propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
        ]),
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
        pipe: PropTypes.func,
    };
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
        pipe: undefined,
    };
    DateTextField.updateState = function (props) { return ({
        value: props.value,
        displayValue: getDisplayDate(props),
        error: getError(props.utils.date(props.value), props),
    }); };
    return DateTextField;
}(React.PureComponent));
export { DateTextField };
// @ts-ignore ts requires to duplicate proptypes of textfield
export default withUtils()(DateTextField);
