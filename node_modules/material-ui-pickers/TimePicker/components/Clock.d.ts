import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Theme } from '@material-ui/core';
import { ClockTypeType } from '../../constants/ClockType';
export interface ClockProps extends WithStyles<typeof styles> {
    type: ClockTypeType;
    value: number;
    onChange: (value: number, isFinish?: boolean) => void;
    ampm?: boolean;
    children: Array<React.ReactElement<any>>;
}
export declare class Clock extends React.Component<ClockProps> {
    static propTypes: any;
    static defaultProps: {
        ampm: boolean;
    };
    isMoving: boolean;
    setTime(e: any, isFinish?: boolean): void;
    handleTouchMove: (e: React.TouchEvent<Element>) => void;
    handleTouchEnd: (e: React.TouchEvent<Element>) => void;
    handleMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseUp: (e: React.MouseEvent<Element>) => void;
    hasSelected: () => boolean;
    render(): JSX.Element;
}
declare const styles: (theme: Theme) => Record<"container" | "clock" | "squareMask" | "pin", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<(Pick<ClockProps, "children" | "value" | "onChange" | "type" | "ampm"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"container" | "clock" | "squareMask" | "pin">) | (Pick<ClockProps & {
    children?: React.ReactNode;
}, "children" | "value" | "onChange" | "type" | "ampm"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"container" | "clock" | "squareMask" | "pin">)>;
export default _default;
