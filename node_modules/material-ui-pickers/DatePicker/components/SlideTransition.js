import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
var animationDuration = 350;
var SlideTransition = function (_a) {
    var classes = _a.classes, className = _a.className, children = _a.children, transKey = _a.transKey, slideDirection = _a.slideDirection;
    return (React.createElement(TransitionGroup, { className: classnames(classes.transitionContainer, className) },
        React.createElement(CSSTransition, { key: transKey, mountOnEnter: true, unmountOnExit: true, timeout: animationDuration, children: children, classNames: {
                enter: classes["slideEnter-" + slideDirection],
                enterActive: classes.slideEnterActive,
                exit: classes.slideExit,
                exitActive: classes["slideExitActiveLeft-" + slideDirection],
            } })));
};
SlideTransition.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
    transKey: PropTypes.string.isRequired,
    innerRef: PropTypes.any,
};
SlideTransition.defaultProps = {
    className: undefined,
};
var styles = function (theme) {
    var slideTransition = theme.transitions.create('transform', {
        duration: animationDuration,
        easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
    });
    return createStyles({
        transitionContainer: {
            display: 'block',
            position: 'relative',
            '& > *': {
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
            },
        },
        'slideEnter-left': {
            willChange: 'transform',
            transform: 'translate(100%)',
        },
        'slideEnter-right': {
            willChange: 'transform',
            transform: 'translate(-100%)',
        },
        slideEnterActive: {
            transform: 'translate(0%)',
            transition: slideTransition,
        },
        slideExit: {
            transform: 'translate(0%)',
        },
        'slideExitActiveLeft-left': {
            willChange: 'transform',
            transform: 'translate(-100%)',
            transition: slideTransition,
        },
        'slideExitActiveLeft-right': {
            willChange: 'transform',
            transform: 'translate(100%)',
            transition: slideTransition,
        },
    });
};
export default withStyles(styles, {
    name: 'MuiPickersSlideTransition',
})(SlideTransition);
