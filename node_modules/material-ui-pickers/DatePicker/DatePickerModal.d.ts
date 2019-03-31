import * as React from 'react';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { BaseDatePickerProps } from './DatePicker';
export interface DatePickerModalProps extends BasePickerProps, BaseDatePickerProps, Omit<ModalWrapperProps, 'onChange' | 'value'> {
}
export declare const DatePickerModal: React.SFC<DatePickerModalProps>;
declare const _default: React.ComponentType<DatePickerModalProps & React.ClassAttributes<{}>>;
export default _default;
