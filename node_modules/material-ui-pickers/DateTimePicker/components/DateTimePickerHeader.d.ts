import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { WithUtilsProps } from '../../_shared/WithUtils';
import DateTimePickerView, { DateTimePickerViewType } from '../../constants/DateTimePickerView';
import { MaterialUiPickersDate } from '../../typings/date';
export declare type MeridiemMode = 'am' | 'pm';
export interface DateTimePickerHeaderProps extends WithUtilsProps, WithStyles<typeof styles, true> {
    date: MaterialUiPickersDate;
    meridiemMode: MeridiemMode;
    openView: DateTimePickerViewType;
    onOpenViewChange: (view: DateTimePickerView) => void;
    setMeridiemMode: (mode: MeridiemMode) => () => void;
    ampm?: boolean;
}
export declare const DateTimePickerHeader: React.SFC<DateTimePickerHeaderProps>;
declare const styles: () => Record<"separator" | "toolbar" | "ampmSelection" | "ampmLabel" | "hourMinuteLabel" | "hourMinuteLabelReverse" | "dateHeader" | "timeHeader", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<Pick<Pick<DateTimePickerHeaderProps, "date" | "classes" | "innerRef" | "theme" | "ampm" | "meridiemMode" | "openView" | "onOpenViewChange" | "setMeridiemMode"> & {
    children?: React.ReactNode;
}, "children" | "date" | "ampm" | "meridiemMode" | "openView" | "onOpenViewChange" | "setMeridiemMode"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"separator" | "toolbar" | "ampmSelection" | "ampmLabel" | "hourMinuteLabel" | "hourMinuteLabelReverse" | "dateHeader" | "timeHeader">>;
export default _default;
