import * as React from 'react';
import { Omit } from '@material-ui/core';
import { BasePickerProps } from '../_shared/BasePicker';
import { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import { BaseDatePickerProps } from './DatePicker';
export interface DatePickerInlineProps extends Omit<BasePickerProps, 'ampm'>, BaseDatePickerProps, Omit<OuterInlineWrapperProps, 'onChange' | 'value'> {
    onlyCalendar?: boolean;
}
export declare const DatePickerInline: React.SFC<DatePickerInlineProps>;
declare const _default: React.ComponentType<DatePickerInlineProps & React.ClassAttributes<{}>>;
export default _default;
