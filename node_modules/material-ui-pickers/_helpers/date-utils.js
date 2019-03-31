export var findClosestEnabledDate = function (_a) {
    var date = _a.date, utils = _a.utils, minDate = _a.minDate, maxDate = _a.maxDate, disableFuture = _a.disableFuture, disablePast = _a.disablePast, shouldDisableDate = _a.shouldDisableDate;
    var today = utils.startOfDay(utils.date());
    minDate = minDate && utils.date(minDate);
    maxDate = maxDate && utils.date(maxDate);
    if (disablePast && utils.isBefore(minDate, today)) {
        minDate = today;
    }
    if (disableFuture && utils.isAfter(maxDate, today)) {
        maxDate = today;
    }
    var forward = utils.date(date);
    var backward = utils.date(date);
    if (utils.isBefore(date, minDate)) {
        forward = minDate;
        backward = null;
    }
    if (utils.isAfter(date, maxDate)) {
        if (backward) {
            backward = maxDate;
        }
        forward = null;
    }
    while (forward || backward) {
        if (forward && utils.isAfter(forward, maxDate)) {
            forward = null;
        }
        if (backward && utils.isBefore(backward, minDate)) {
            backward = null;
        }
        if (forward) {
            if (!shouldDisableDate(forward)) {
                return forward;
            }
            forward = utils.addDays(forward, 1);
        }
        if (backward) {
            if (!shouldDisableDate(backward)) {
                return backward;
            }
            backward = utils.addDays(backward, -1);
        }
    }
    return null;
};
