"use strict";
function isSquare(shape) {
    return shape.kind === 's';
}
function isRectangle(shape) {
    return shape.kind === 'r';
}
function isCircle(shape) {
    return shape.kind === 'c';
}
function area(s) {
    if (isSquare(s)) {
        return s.size * s.size;
    }
    if (isRectangle(s)) {
        return s.height * s.width;
    }
    if (isCircle(s)) {
        return Math.PI * (Math.pow(s.radius, 2));
    }
    const _ensureAllCasesArehandled = s;
    return _ensureAllCasesArehandled;
}
