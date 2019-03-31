import { Omit } from '@material-ui/core';
import { DialogProps as DialogPropsType } from '@material-ui/core/Dialog';
import * as React from 'react';
import { DateTextFieldProps } from '../_shared/DateTextField';
export interface ModalWrapperProps extends Partial<DateTextFieldProps> {
    onAccept?: () => void;
    onDismiss?: () => void;
    onClear?: () => void;
    onSetToday?: () => void;
    /** On open callback */
    onOpen?: () => void;
    /** On close callback */
    onClose?: () => void;
    dialogContentClassName?: string;
    /** "OK" label message */
    okLabel?: React.ReactNode;
    /** "Cancel" label message */
    cancelLabel?: React.ReactNode;
    /** "Clear" label message */
    clearLabel?: React.ReactNode;
    /** "Today" label message */
    todayLabel?: React.ReactNode;
    /**
     * If true today button will be displayed
     * <b>Note*</b> that clear button has higher priority
     */
    showTodayButton?: boolean;
    container?: React.ReactNode;
    DialogProps?: Partial<Omit<DialogPropsType, 'classes'>>;
    isAccepted?: boolean;
}
export default class ModalWrapper extends React.PureComponent<ModalWrapperProps> {
    static propTypes: any;
    static defaultProps: {
        dialogContentClassName: string;
        invalidLabel: undefined;
        value: Date;
        labelFunc: undefined;
        okLabel: string;
        cancelLabel: string;
        clearLabel: string;
        todayLabel: string;
        clearable: boolean;
        showTodayButton: boolean;
        format: undefined;
        onAccept: undefined;
        onDismiss: undefined;
        onClear: undefined;
        onOpen: undefined;
        onClose: undefined;
        onSetToday: undefined;
        DialogProps: undefined;
        isAccepted: boolean;
    };
    static getDerivedStateFromProps(nextProps: ModalWrapperProps): {
        open: boolean;
    } | null;
    state: {
        open: boolean;
    };
    handleKeyDown: (event: KeyboardEvent) => void;
    handleSetTodayDate: () => void;
    open: () => void;
    close: () => void;
    handleAccept: () => void;
    handleDismiss: () => void;
    handleClear: () => void;
    render(): JSX.Element;
}
