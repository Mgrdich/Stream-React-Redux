import { Theme } from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
export interface DayProps extends WithStyles<typeof styles> {
    children: React.ReactNode;
    current?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    selected?: boolean;
}
declare const styles: (theme: Theme) => Record<"disabled" | "hidden" | "selected" | "day" | "current", import("@material-ui/core/styles/withStyles").CSSProperties>;
declare const _default: React.ComponentType<(Pick<DayProps, "disabled" | "hidden" | "children" | "selected" | "current"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"disabled" | "hidden" | "selected" | "day" | "current">) | (Pick<DayProps & {
    children?: React.ReactNode;
}, "disabled" | "hidden" | "children" | "selected" | "current"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"disabled" | "hidden" | "selected" | "day" | "current">)>;
export default _default;
