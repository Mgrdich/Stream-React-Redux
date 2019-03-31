import * as React from 'react';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import { BaseDateTimePickerProps } from './DateTimePicker';
export interface DateTimePickerInlineProps extends BasePickerProps, BaseDateTimePickerProps, Omit<OuterInlineWrapperProps, 'onChange' | 'value'> {
}
export declare const DateTimePickerInline: React.SFC<DateTimePickerInlineProps>;
declare const _default: React.ComponentType<DateTimePickerInlineProps & React.ClassAttributes<{}>>;
export default _default;
