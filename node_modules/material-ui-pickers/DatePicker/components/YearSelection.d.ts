import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { WithUtilsProps } from '../../_shared/WithUtils';
import { DateType } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
export interface YearSelectionProps extends WithUtilsProps, WithStyles<typeof styles> {
    date: MaterialUiPickersDate;
    minDate?: DateType;
    maxDate?: DateType;
    onChange: (date: MaterialUiPickersDate) => void;
    disablePast?: boolean | null | undefined;
    disableFuture?: boolean | null | undefined;
    animateYearScrolling?: boolean | null | undefined;
}
export declare class YearSelection extends React.PureComponent<YearSelectionProps> {
    static propTypes: any;
    static defaultProps: {
        animateYearScrolling: boolean;
    };
    selectedYearRef?: React.ReactInstance;
    getSelectedYearRef: (ref?: Element | React.Component<any, {}, any> | undefined) => void;
    scrollToCurrentYear: (domNode: React.ReactInstance) => void;
    componentDidMount: () => void;
    onYearSelect: (year: number) => void;
    render(): JSX.Element;
}
declare const styles: Record<"container", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<Pick<Pick<YearSelectionProps, "date" | "classes" | "onChange" | "innerRef" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "animateYearScrolling"> & {
    children?: React.ReactNode;
}, "children" | "date" | "onChange" | "minDate" | "disablePast" | "disableFuture" | "maxDate" | "animateYearScrolling"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"container">>;
export default _default;
