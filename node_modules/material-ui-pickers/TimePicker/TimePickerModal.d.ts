import * as React from 'react';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { BaseTimePickerProps } from './TimePicker';
export interface TimePickerModalProps extends BasePickerProps, BaseTimePickerProps, Omit<ModalWrapperProps, 'onChange' | 'value'> {
}
export declare const TimePickerModal: React.SFC<TimePickerModalProps>;
declare const _default: React.ComponentType<TimePickerModalProps & React.ClassAttributes<{}>>;
export default _default;
