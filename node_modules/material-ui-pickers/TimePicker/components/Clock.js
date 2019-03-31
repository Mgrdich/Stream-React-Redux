var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import withStyles from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import { getHours, getMinutes } from '../../_helpers/time-utils';
import ClockType from '../../constants/ClockType';
import ClockPointer from './ClockPointer';
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMoving = false;
        _this.handleTouchMove = function (e) {
            _this.isMoving = true;
            _this.setTime(e);
        };
        _this.handleTouchEnd = function (e) {
            if (_this.isMoving) {
                _this.setTime(e, true);
                _this.isMoving = false;
            }
        };
        _this.handleMove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
            var isButtonPressed = typeof e.buttons === 'undefined'
                ? e.nativeEvent.which === 1
                : e.buttons === 1;
            if (isButtonPressed) {
                _this.setTime(e.nativeEvent, false);
            }
        };
        _this.handleMouseUp = function (e) {
            if (_this.isMoving) {
                _this.isMoving = false;
            }
            _this.setTime(e.nativeEvent, true);
        };
        _this.hasSelected = function () {
            var _a = _this.props, type = _a.type, value = _a.value;
            if (type === ClockType.HOURS) {
                return true;
            }
            return value % 5 === 0;
        };
        return _this;
    }
    Clock.prototype.setTime = function (e, isFinish) {
        if (isFinish === void 0) { isFinish = false; }
        var offsetX = e.offsetX, offsetY = e.offsetY;
        if (typeof offsetX === 'undefined') {
            var rect = e.target.getBoundingClientRect();
            offsetX = e.changedTouches[0].clientX - rect.left;
            offsetY = e.changedTouches[0].clientY - rect.top;
        }
        var value = this.props.type === ClockType.SECONDS ||
            this.props.type === ClockType.MINUTES
            ? getMinutes(offsetX, offsetY)
            : getHours(offsetX, offsetY, Boolean(this.props.ampm));
        this.props.onChange(value, isFinish);
    };
    Clock.prototype.render = function () {
        var _a = this.props, classes = _a.classes, value = _a.value, children = _a.children, type = _a.type, ampm = _a.ampm;
        var isPointerInner = !ampm && type === ClockType.HOURS && (value < 1 || value > 12);
        return (React.createElement("div", { className: classes.container },
            React.createElement("div", { className: classes.clock },
                React.createElement("div", { role: "menu", tabIndex: -1, className: classes.squareMask, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, onMouseUp: this.handleMouseUp, onMouseMove: this.handleMove }),
                React.createElement("div", { className: classes.pin }),
                React.createElement(ClockPointer, { type: type, value: value, isInner: isPointerInner, hasSelected: this.hasSelected() }),
                children)));
    };
    Clock.propTypes = {
        type: PropTypes.oneOf(Object.keys(ClockType).map(function (key) { return ClockType[key]; }))
            .isRequired,
        classes: PropTypes.object.isRequired,
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        ampm: PropTypes.bool,
        innerRef: PropTypes.any,
    };
    Clock.defaultProps = {
        ampm: false,
    };
    return Clock;
}(React.Component));
export { Clock };
var styles = function (theme) {
    return createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            margin: theme.spacing.unit * 4 + "px 0 " + theme.spacing.unit + "px",
        },
        clock: {
            backgroundColor: 'rgba(0,0,0,.07)',
            borderRadius: '50%',
            height: 260,
            width: 260,
            position: 'relative',
            pointerEvents: 'none',
            zIndex: 1,
        },
        squareMask: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            pointerEvents: 'auto',
            outline: 'none',
            touchActions: 'none',
            userSelect: 'none',
            '&:active': {
                cursor: 'move',
            },
        },
        pin: {
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    });
};
export default withStyles(styles, {
    name: 'MuiPickersClock',
})(Clock);
