"use strict";
const numbers = {
    123: true,
};
// numbers[123] = false;
function layout(settings) {
    console.log(settings);
}
const example = {
    align: 'left',
    padding: 0
};
layout(example);
function double() {
    this.value = this.value * 2;
}
const valid = {
    value: 10,
    double
};
valid.double();
function addFullName(obj) {
    return Object.assign(Object.assign({}, obj), { fullName: `${obj.firstName} ${obj.lastName}` });
}
const adil = addFullName({
    firstName: 'adil',
    lastName: 'benmoussa',
    email: 'adil.benmoussa@gmail.com'
});
console.log(adil.email);
console.log(adil.fullName);
const adil2 = addFullName({
    firstName: 'adil2',
    lastName: 'b'
});
const center = {
    x: 0,
    y: 0,
    z: 0
};
const unit = {
    x: center.x + 1,
    y: center.y + 1,
    z: center.z + 1
};
const john = {
    name: 'john',
    age: 40,
    location: 'NY'
};
function logGet(obj, key) {
    const value = obj[key];
    console.log('Getting::', key, value);
    return value;
}
function logSet(obj, key, value) {
    console.log("setting::", key, value);
    obj[key] = value;
}
logGet(john, 'age');
logSet(john, 'age', 10);
const isNumber = (value) => typeof value === 'number'
    ? 'number'
    : 'other';
const withNumber = isNumber(1234);
const withOther = isNumber('text');
// Conditional types with union and never
function error(message) {
    throw new Error(message);
}
// const notAllowd: never = 'some text'; // ts error
const allowd = error('some error did happen'); // allowed
function createPerson(first, last) {
    return {
        first,
        last,
        full: `${first} ${last}`
    };
}
function logPerson(person) {
    console.log('Person:', person.first, person.last, person.full);
}
const center1 = {
    x: 0,
    y: 0,
    z: 0,
};
// example:
class State {
    constructor(current) {
        this.current = current;
    }
    update(next) {
        this.current = Object.assign(Object.assign({}, this.current), next);
    }
}
const state = new State({ x: 0, y: 0 });
state.update({ x: 10, y: 10 });
console.log(state.current); // {x: 10, y: 10}
class State1 {
    constructor(current) {
        this.current = current;
    }
    update(next) {
        this.current = Object.assign(Object.assign({}, this.current), next);
    }
}
const state1 = new State1({ x: 0, y: 0 });
state1.update({ x: 10, y: 10 });
console.log(state1.current); // {x: 10, y: 10}
state1.update({ x: 20 }); // error
class Circle1 {
    constructor(cf) {
        var _a, _b;
        this.config = {
            color: (_a = cf.color) !== null && _a !== void 0 ? _a : 'green',
            radius: (_b = cf.radius) !== null && _b !== void 0 ? _b : 0
        };
    }
}
// Readonly
function makeReadonly(object) {
    return Object.freeze(Object.assign({}, object));
}
const persons = {};
persons['001'] = { name: 'adil', role: 'engineer' };
persons['002'] = { name: 'mo', role: 'engineer' };
let poepleWithRoles = {
    admin: ['adil', 'mo',],
    owner: ['adil']
};
