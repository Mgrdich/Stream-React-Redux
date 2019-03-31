import { Theme } from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import DateTimePickerView, { DateTimePickerViewType } from '../../constants/DateTimePickerView';
export interface DateTimePickerTabsProps extends WithStyles<typeof styles, true> {
    view: DateTimePickerViewType;
    onChange: (view: DateTimePickerView) => void;
    dateRangeIcon: React.ReactNode;
    timeIcon: React.ReactNode;
}
export declare const DateTimePickerTabs: React.SFC<DateTimePickerTabsProps>;
declare const styles: (theme: Theme) => {
    tabs: {
        color: string;
        backgroundColor: string;
    };
};
declare const _default: React.ComponentType<(Pick<Pick<DateTimePickerTabsProps & {
    children?: React.ReactNode;
}, "view" | "children" | "onChange" | "theme" | "dateRangeIcon" | "timeIcon"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"tabs">, "view" | "children" | "classes" | "onChange" | "dateRangeIcon" | "timeIcon"> & Partial<import("@material-ui/core/styles/withTheme").WithTheme>) | (Pick<Pick<DateTimePickerTabsProps & {
    children?: React.ReactNode;
}, "view" | "children" | "onChange" | "theme" | "dateRangeIcon" | "timeIcon"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"tabs"> & {
    children?: React.ReactNode;
}, "view" | "children" | "classes" | "onChange" | "dateRangeIcon" | "timeIcon"> & Partial<import("@material-ui/core/styles/withTheme").WithTheme>)>;
export default _default;
