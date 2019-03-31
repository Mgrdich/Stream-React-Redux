import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Theme } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { WithUtilsProps } from '../../_shared/WithUtils';
import { DateType } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { SlideDirection } from './SlideTransition';
export declare type DayComponent = React.ReactElement<IconButtonProps>;
export declare type RenderDay = (day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: DayComponent) => JSX.Element;
export interface CalendarProps extends WithUtilsProps, WithStyles<typeof styles, true> {
    date: MaterialUiPickersDate;
    minDate: DateType;
    maxDate: DateType;
    onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
    disablePast?: boolean;
    disableFuture?: boolean;
    leftArrowIcon?: React.ReactNode;
    rightArrowIcon?: React.ReactNode;
    renderDay?: RenderDay;
    allowKeyboardControl?: boolean;
    shouldDisableDate?: (day: MaterialUiPickersDate) => boolean;
}
export interface CalendarState {
    slideDirection: SlideDirection;
    currentMonth: MaterialUiPickersDate;
    lastDate?: MaterialUiPickersDate;
}
export declare class Calendar extends React.Component<CalendarProps, CalendarState> {
    static propTypes: any;
    static defaultProps: {
        minDate: string;
        maxDate: string;
        disablePast: boolean;
        disableFuture: boolean;
        leftArrowIcon: undefined;
        rightArrowIcon: undefined;
        renderDay: undefined;
        allowKeyboardControl: boolean;
        shouldDisableDate: () => boolean;
    };
    static getDerivedStateFromProps(nextProps: CalendarProps, state: CalendarState): {
        lastDate: any;
        currentMonth: any;
    } | null;
    state: CalendarState;
    componentDidMount(): void;
    onDateSelect: (day: any, isFinish?: boolean) => void;
    handleChangeMonth: (newMonth: any, slideDirection: "left" | "right") => void;
    validateMinMaxDate: (day: any) => boolean | "" | 0 | null | undefined;
    shouldDisablePrevMonth: () => boolean;
    shouldDisableNextMonth: () => boolean;
    shouldDisableDate: (day: any) => boolean;
    moveToDay: (day: any) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    renderWeeks: () => JSX.Element[];
    renderDays: (week: any[]) => JSX.Element[];
    render(): JSX.Element;
}
declare const styles: (theme: Theme) => {
    transitionContainer: {
        minHeight: number;
        marginTop: number;
    };
    week: {
        display: string;
        justifyContent: string;
    };
};
declare const _default: React.ComponentType<Pick<Pick<CalendarProps, "date" | "classes" | "onChange" | "innerRef" | "theme" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "leftArrowIcon" | "rightArrowIcon" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate"> & {
    children?: React.ReactNode;
}, "children" | "date" | "onChange" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "leftArrowIcon" | "rightArrowIcon" | "renderDay" | "allowKeyboardControl" | "shouldDisableDate"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"transitionContainer" | "week">>;
export default _default;
