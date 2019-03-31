import * as React from 'react';
import { MeridiemMode } from './components/DateTimePickerHeader';
import { Omit } from '@material-ui/core';
import { WithUtilsProps } from '../_shared/WithUtils';
import DateTimePickerView, { DateTimePickerViewType } from '../constants/DateTimePickerView';
import { BaseDatePickerProps } from '../DatePicker/DatePicker';
import { MaterialUiPickersDate } from '../typings/date';
export interface BaseDateTimePickerProps extends Omit<BaseDatePickerProps, 'openToYearSelection'> {
    autoSubmit?: boolean;
    showTabs?: boolean;
    ampm?: boolean;
    openTo?: DateTimePickerViewType;
    dateRangeIcon?: React.ReactNode;
    timeIcon?: React.ReactNode;
    ViewContainerComponent?: string | React.ComponentType<any>;
}
export interface DateTimePickerProps extends BaseDateTimePickerProps, WithUtilsProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished: boolean, view?: DateTimePickerView) => void;
}
interface DateTimePickerState {
    openView: DateTimePickerViewType;
    meridiemMode: MeridiemMode;
}
export declare class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {
    static propTypes: any;
    static defaultProps: {
        allowKeyboardControl: boolean;
        ampm: boolean;
        animateYearScrolling: boolean;
        autoSubmit: boolean;
        dateRangeIcon: undefined;
        disableFuture: boolean;
        disablePast: boolean;
        leftArrowIcon: undefined;
        renderDay: undefined;
        rightArrowIcon: undefined;
        shouldDisableDate: undefined;
        showTabs: boolean;
        timeIcon: undefined;
        ViewContainerComponent: string;
    };
    state: DateTimePickerState;
    onChange: (time: any, isFinish: boolean | undefined, nextView: DateTimePickerView) => void;
    setMeridiemMode: (mode: "am" | "pm") => () => void;
    handleViewChange: (view: DateTimePickerView) => void;
    handleChange: (time: any, isFinish?: boolean) => void;
    handleYearChange: (date: any) => void;
    handleDayChange: (date: any, isFinish?: boolean | undefined) => void;
    handleHourChange: (time: any, isFinish?: boolean | undefined) => void;
    render(): JSX.Element;
}
declare const _default: React.StatelessComponent<Pick<DateTimePickerProps, "date" | "onChange" | "ampm" | "initialFocusedDate" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "leftArrowIcon" | "rightArrowIcon" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "animateYearScrolling" | "dateRangeIcon" | "timeIcon" | "autoSubmit" | "showTabs" | "openTo" | "ViewContainerComponent">>;
export default _default;
