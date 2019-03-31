import * as PropTypes from 'prop-types';
import * as React from 'react';
export var DateTimePickerView = function (_a) {
    var selected = _a.selected, children = _a.children;
    if (!selected) {
        return null;
    }
    return React.createElement("div", { children: children });
};
DateTimePickerView.propTypes = {
    selected: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
export default DateTimePickerView;
