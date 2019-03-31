import * as React from 'react';
import { WithUtilsProps } from '../_shared/WithUtils';
import { DateType } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { DayComponent } from './components/Calendar';
export interface BaseDatePickerProps {
    /** Min selectable date */
    minDate?: DateType;
    /** Max selectable date */
    maxDate?: DateType;
    /** Disable past dates */
    disablePast?: boolean;
    /** Disable future dates */
    disableFuture?: boolean;
    /** To animate scrolling to current year (with scrollIntoView) */
    animateYearScrolling?: boolean;
    /** Open datepicker from year selection */
    openToYearSelection?: boolean;
    /** Left arrow icon */
    leftArrowIcon?: React.ReactNode;
    /** Right arrow icon */
    rightArrowIcon?: React.ReactNode;
    /** Custom renderer for day */
    renderDay?: (day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: DayComponent) => JSX.Element;
    /** Enables keyboard listener for moving between days in calendar */
    allowKeyboardControl?: boolean;
    /** Disable specific date */
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
    initialFocusedDate?: DateType;
}
export interface DatePickerProps extends BaseDatePickerProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}
export declare class DatePicker extends React.PureComponent<DatePickerProps & WithUtilsProps> {
    static propTypes: any;
    static defaultProps: {
        minDate: string;
        maxDate: string;
        disablePast: boolean;
        disableFuture: boolean;
        allowKeyboardControl: boolean;
        animateYearScrolling: undefined;
        openToYearSelection: boolean;
        children: null;
        leftArrowIcon: undefined;
        rightArrowIcon: undefined;
        renderDay: undefined;
        shouldDisableDate: undefined;
    };
    state: {
        showYearSelection: boolean;
    };
    readonly date: any;
    readonly minDate: any;
    readonly maxDate: any;
    handleYearSelect: (date: any) => void;
    openYearSelection: () => void;
    openCalendar: () => void;
    render(): JSX.Element;
}
declare const _default: React.StatelessComponent<Pick<DatePickerProps & WithUtilsProps, "date" | "onChange" | "initialFocusedDate" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "leftArrowIcon" | "rightArrowIcon" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate" | "animateYearScrolling" | "openToYearSelection">>;
export default _default;
