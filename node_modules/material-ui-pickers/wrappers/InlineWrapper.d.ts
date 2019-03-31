import { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DateTextFieldProps } from '../_shared/DateTextField';
export interface OuterInlineWrapperProps extends Partial<DateTextFieldProps> {
    onOpen?: () => void;
    onClose?: () => void;
    PopoverProps?: Partial<PopoverPropsType>;
}
export interface InlineWrapperProps extends OuterInlineWrapperProps {
    handleAccept: () => void;
    isAccepted: boolean;
    onlyCalendar: boolean;
}
export declare class InlineWrapper extends React.PureComponent<InlineWrapperProps & WithStyles<typeof styles>> {
    static propTypes: any;
    static defaultProps: {
        value: Date;
        labelFunc: undefined;
        onlyCalendar: boolean;
        format: undefined;
        onClear: undefined;
        onOpen: undefined;
        onClose: undefined;
        PopoverProps: undefined;
        isAccepted: boolean;
        keyboard: undefined;
    };
    static getDerivedStateFromProps(nextProps: InlineWrapperProps): {
        anchorEl: null;
    } | null;
    state: {
        anchorEl: null;
    };
    open: (e: React.SyntheticEvent<Element>) => void;
    close: () => void;
    handleKeyDown: (event: Event) => void;
    render(): JSX.Element;
}
declare const styles: {
    popoverPaper: {
        maxWidth: number;
        minWidth: number;
        paddingBottom: number;
    };
};
declare const _default: React.ComponentType<Pick<InlineWrapperProps & {
    classes: Record<"popoverPaper", string>;
    innerRef?: string | ((instance: any) => any) | React.RefObject<any> | undefined;
} & Pick<PropTypes.InferProps<any>, string | number | symbol>, string | number | symbol> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"popoverPaper">>;
export default _default;
