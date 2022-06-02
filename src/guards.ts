
type Square = {
    kind: 's',
    size: number,
}

type Rectangle = {
    kind: 'r',
    height: number,
    width: number,
}

type Circle = {
    kind: 'c',
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function isSquare(shape: Shape): shape is Square {
    return shape.kind === 's';
}

function isRectangle(shape: Shape): shape is Rectangle {
    return shape.kind === 'r';
}

function isCircle(shape: Shape): shape is Circle {
    return shape.kind === 'c';
}


function area(s: Shape) {

    if(isSquare(s)) {
        return s.size * s.size;
    }

    if(isRectangle(s)) {
        return s.height * s.width;
    }

    if(isCircle(s)) {
        return Math.PI * (s.radius ** 2);
    }

    const _ensureAllCasesArehandled: never = s;
    return _ensureAllCasesArehandled;
}