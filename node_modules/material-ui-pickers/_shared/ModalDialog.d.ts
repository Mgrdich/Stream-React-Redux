import { WithStyles } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import * as React from 'react';
import { ExtendMui } from '../typings/extendMui';
export declare const styles: {
    dialogRoot: {
        minWidth: number;
        minHeight: number;
    };
    dialog: {
        width: number;
        minHeight: number;
        overflow: string;
        '&:first-child': {
            padding: number;
        };
    };
    dialogActions: {
        justifyContent: string;
    };
    clearableDialogAction: {
        '&:first-child': {
            marginRight: string;
        };
    };
    todayDialogAction: {
        '&:first-child': {
            marginRight: string;
        };
    };
    dialogAction: {};
};
export interface DialogBaseProps extends ExtendMui<DialogProps, 'onKeyDown'> {
}
export interface ModalDialogProps extends DialogBaseProps {
    onAccept: () => void;
    onDismiss: () => void;
    onClear: () => void;
    onSetToday: () => void;
    onKeyDown: (e: KeyboardEvent) => void;
    dialogContentClassName?: string;
    okLabel?: React.ReactNode;
    cancelLabel?: React.ReactNode;
    clearLabel?: React.ReactNode;
    todayLabel?: React.ReactNode;
    clearable?: boolean;
    showTodayButton?: boolean;
}
export declare const ModalDialog: React.SFC<ModalDialogProps & WithStyles<typeof styles>>;
declare const _default: React.ComponentType<Pick<ModalDialogProps & {
    classes: Record<"dialog" | "dialogRoot" | "dialogActions" | "clearableDialogAction" | "todayDialogAction" | "dialogAction", string>;
    innerRef?: string | ((instance: any) => any) | React.RefObject<any> | undefined;
} & {
    children?: React.ReactNode;
}, "color" | "maxWidth" | "transitionDuration" | "hidden" | "dir" | "slot" | "style" | "title" | "scroll" | "open" | "manifest" | "children" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "className" | "contentEditable" | "contextMenu" | "draggable" | "id" | "lang" | "placeholder" | "spellCheck" | "tabIndex" | "inputMode" | "is" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "onEnter" | "onEntering" | "onEntered" | "onExit" | "onExiting" | "onExited" | "fullWidth" | "container" | "disablePortal" | "onRendered" | "BackdropComponent" | "BackdropProps" | "disableAutoFocus" | "disableBackdropClick" | "disableEnforceFocus" | "disableEscapeKeyDown" | "disableRestoreFocus" | "hideBackdrop" | "keepMounted" | "manager" | "onBackdropClick" | "onClose" | "onEscapeKeyDown" | "PaperProps" | "TransitionComponent" | "TransitionProps" | "onClear" | "clearable" | "fullScreen" | "onAccept" | "onDismiss" | "onSetToday" | "dialogContentClassName" | "okLabel" | "cancelLabel" | "clearLabel" | "todayLabel" | "showTodayButton"> & import("@material-ui/core/styles/withStyles").StyledComponentProps<"dialog" | "dialogRoot" | "dialogActions" | "clearableDialogAction" | "todayDialogAction" | "dialogAction">>;
export default _default;
