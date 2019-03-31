import { BaseTextFieldProps, StandardTextFieldProps } from '@material-ui/core/TextField';
import * as React from 'react';
import { FilledInputProps } from '@material-ui/core/FilledInput';
import { InputProps as InputPropsType } from '@material-ui/core/Input';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { ExtendMui } from '../typings/extendMui';
import { WithUtilsProps } from './WithUtils';
export interface DateTextFieldProps extends WithUtilsProps, ExtendMui<BaseTextFieldProps, 'onError' | 'onChange' | 'value'> {
    variant?: 'outlined' | 'standard' | 'filled';
    InputProps?: Partial<InputPropsType | OutlinedInputProps | FilledInputProps>;
    inputProps?: InputPropsType['inputProps'] | OutlinedInputProps['inputProps'] | FilledInputProps['inputProps'];
    value: DateType;
    minDate?: DateType;
    /** Error message, shown if date is less then minimal date */
    minDateMessage?: React.ReactNode;
    disablePast?: boolean;
    disableFuture?: boolean;
    maxDate?: DateType;
    /** Error message, shown if date is more then maximal date */
    maxDateMessage?: React.ReactNode;
    /** Input mask, used in keyboard mode read more <a href="https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme">here</a> */
    mask?: any;
    pipe?: any;
    onChange: (date: MaterialUiPickersDate) => void;
    onClear?: () => void;
    /** On/off manual keyboard input mode */
    keyboard?: boolean;
    /** Format string */
    format: string;
    /** Message displaying in text field, if date is invalid (doesn't work in keyboard mode) */
    invalidLabel?: string;
    /** Message displaying in text field, if null passed (doesn't work in keyboard mode) */
    emptyLabel?: string;
    /** Do not open picker on enter keypress */
    disableOpenOnEnter?: boolean;
    /** Dynamic label generation function [(date: Date, invalidLabel: string) => string] */
    labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
    /** Icon displayed for open picker button in keyboard mode */
    keyboardIcon?: React.ReactNode;
    /** Message, appearing when date cannot be parsed */
    invalidDateMessage?: React.ReactNode;
    /** If true clear button will be displayed */
    clearable?: boolean;
    /** Component that should replace the default Material-UI TextField */
    TextFieldComponent?: React.ComponentType<StandardTextFieldProps> | React.ReactType<React.HTMLAttributes<any>>;
    /** Props to pass to keyboard input adornment */
    InputAdornmentProps?: object;
    /** Specifies position of keyboard button adornment */
    adornmentPosition?: 'start' | 'end';
    onClick: (e: React.SyntheticEvent) => void;
    onError?: (newValue: MaterialUiPickersDate, error: React.ReactNode) => void;
    onInputChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}
export declare class DateTextField extends React.PureComponent<DateTextFieldProps> {
    static propTypes: any;
    static defaultProps: {
        disabled: boolean;
        invalidLabel: string;
        emptyLabel: string;
        value: Date;
        labelFunc: undefined;
        format: undefined;
        InputProps: undefined;
        keyboard: boolean;
        mask: undefined;
        keyboardIcon: string;
        disableOpenOnEnter: boolean;
        invalidDateMessage: string;
        clearable: boolean;
        onBlur: undefined;
        onClear: undefined;
        disablePast: boolean;
        disableFuture: boolean;
        onError: undefined;
        onInputChange: undefined;
        minDate: string;
        maxDate: string;
        minDateMessage: string;
        maxDateMessage: string;
        TextFieldComponent: React.ComponentType<import("@material-ui/core/TextField/TextField").TextFieldProps>;
        InputAdornmentProps: {};
        adornmentPosition: string;
        pipe: undefined;
    };
    static updateState: (props: DateTextFieldProps) => {
        value: DateType;
        displayValue: string | undefined;
        error: React.ReactNode;
    };
    state: {
        value: DateType;
        displayValue: string | undefined;
        error: React.ReactNode;
    };
    componentDidUpdate(prevProps: DateTextFieldProps): void;
    commitUpdates: (value: string) => void;
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (e: React.SyntheticEvent<Element>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    openPicker: (e: React.SyntheticEvent<Element>) => void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
