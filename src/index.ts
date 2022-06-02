type Dic = {
    [key: string]: boolean,
}

const numbers = {
    123: true,
} as const;

// numbers[123] = false;


function layout(settings: {
    align: 'left' | 'right' | 'center',
    padding: number
}) {
    console.log(settings);
}


const example = {
    align: 'left' as const,
    padding: 0
}

layout(example);


function double (this: {value: number}) {
    this.value = this.value * 2;
}

const valid = {
    value: 10,
    double
}

valid.double();

type NameFileds = {
    firstName: string,
    lastName: string
}

function addFullName<T extends NameFileds>(obj: T) : T & {fullName: string} {
    return {
        ...obj,
        fullName: `${obj.firstName} ${obj.lastName}`
    };
}


const adil = addFullName({
    firstName: 'adil',
    lastName: 'benmoussa',
    email: 'adil.benmoussa@gmail.com'
})

console.log(adil.email);
console.log(adil.fullName);

const adil2 = addFullName({
    firstName: 'adil2',
    lastName: 'b'
})



const center = {
    x: 0,
    y: 0,
    z: 0
}

type Point = typeof center;

const unit: Point = {
    x: center.x + 1,
    y: center.y + 1,
    z: center.z + 1
}

type Person = {
    name: string,
    age: number,
    location: string
}

type PersonKeys = keyof Person;

const john: Person = {
    name: 'john',
    age: 40,
    location: 'NY'
}

function logGet<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
    const value = obj[key];
    console.log('Getting::', key, value);
    return value
}

function logSet<Obj, Key extends keyof Obj>(obj: Obj, key: Key, value: Obj[Key]) {
    console.log("setting::", key ,value);
    obj[key] = value
}


logGet(john, 'age')
logSet(john, 'age', 10)


// Conditional types
 type IsNumber<T> = 
     T extends number
     ? 'number'
     : 'other'

type WithNumber = IsNumber<number>
type WithString = IsNumber<string>

const isNumber = (value: unknown) =>
    typeof value === 'number'
    ? 'number'
    : 'other'

const withNumber = isNumber(1234);
const withOther = isNumber('text');


// Conditional types with union and never
function error(message: string): never {
    throw new Error(message)
}

// const notAllowd: never = 'some text'; // ts error
const allowd: never = error('some error did happen'); // allowed

type Verbose = string | never;
type Consice = string;


type NoEmpty<T> = T extends null | undefined ? never : T;

type Example = NoEmpty<string | null> 
type ExampleExpanded0 = NoEmpty<string> | NoEmpty<null>
type ExampleExpanded1 = (string extends null | undefined ? never : string) | (null extends null | undefined ? never : string);
type ExampleExpanded2 = string | never;



// Infer keyword and ReturnType<T>
type IsArray<T> = T extends Array<infer Member> ? 'array' : 'other';
type WithArray = IsArray<string[]>;
type WithNoArray = IsArray<number>;

type UnboxArray<T> = 
    T extends Array<infer Member>
    ? Member
    : T;

type UnboxedStringArray = UnboxArray<string[]>;
type UnboxedNumberArray = UnboxArray<number[]>;
type AnythingElse = UnboxArray<string>;

function createPerson(first: string, last: string) {
    return {
        first,
        last,
        full: `${first} ${last}`
    }
}


type ReturnType1<T> = 
    T extends (...args: any) => infer R
    ? R
    : never

type Person1 = ReturnType1<typeof createPerson>;

function logPerson(person: Person1) {
    console.log(
        'Person:', 
        person.first,
        person.last,
        person.full
    );
}


// mapped types
type Point1 = {
    x: number,
    y: number,
    z: number,
}

// type ReadonlyPoint1 = {
//     readonly x: number,
//     readonly y: number,
//     readonly z: number,
// }

type Readonly1<T> = {
    // [Item in Union] : Output 
    // readonly [Item in 'x' | 'y' | 'z'] : number
    readonly [Item in keyof T] : T[Item]
}

const center1: Readonly<Point1> = {
    x: 0,
    y: 0,
    z: 0,
}

// center1.x = 10; // ts error

// mapped types modifiers

type Point2 = {
    readonly x: number,
    y?: number,
}

type Mapped2<T> = {
    -readonly [P in keyof T]-? : T[P]
};

type Result2 = Mapped2<Point2>;


// example:
class State<T> {
    constructor(public current: T) {}
    update(next: T) {
        this.current = {...this.current, ...next};
    }
}

const state = new State({x: 0, y: 0});
state.update({x: 10, y: 10});
console.log(state.current) // {x: 10, y: 10}



type Partial1<T> = {
    [P in keyof T]? : T[P]
}

class State1<T> {
    constructor(public current: T) {}
    update(next: Partial1<T>) {
        this.current = {...this.current, ...next};
    }
}

type Result3 = Partial1<Point2>;

const state1 = new State1({x: 0, y: 0});
state1.update({x: 10, y: 10});
console.log(state1.current) // {x: 10, y: 10}


state1.update({x: 20}); // error

//required

type Required1<T> = {
    [P in keyof T]-? : T[P]
}

type PartialPoint1 = {x?: number, y?: number};
type Point3 = Required1<PartialPoint1>;

// example
type CircleConfig = {
    color?: string,
    radius?: number
}

class Circle1 {
    private config: Required1<CircleConfig>;

    constructor(cf: CircleConfig) {
        this.config = {
            color: cf.color ?? 'green',
            radius: cf.radius ?? 0
        };
    }
}


// Readonly
function makeReadonly<T>(object: T) : Readonly1<T> {
    return Object.freeze({...object});
}

// Record

type Persons = Record<string, {name: string, role: string}>;
type PersonsVerbose = {[key: string] : {name: string, role: string}};
const persons: PersonsVerbose = {};

persons['001'] = {name: 'adil', role: 'engineer'};
persons['002'] = {name: 'mo', role: 'engineer'};
// persons['003'] = {name: 'mo'}; //ts error

type Roles = 'admin' | 'owner';
type R = Record<Roles, string[]>;

let poepleWithRoles: Record<Roles, string[]> = {
    admin: ['adil', 'mo',],
    owner: ['adil']
};



type PageInfo = {id: string, title: string};

type PageVerbose = {
    home: PageInfo,
    services: PageInfo,
    about: PageInfo,
    contact: PageInfo,
}

// better to do so

type Record1<K extends keyof any, T> = {
    [P in K] : T
}

type Pages = Record1<'home' | 'services' | 'about' | 'contact', {id: string, title: string}>


// type Extract<T, U> = T extends U ? T : never;
// type Exclude<T, U> = T extends U ? never : T;

type Exclude1<T, U> = T extends U ? never : T;

type Person3 = {
    id: string,
    age: number,
    address: string
}

type Person3WithOutAddress = Exclude1<keyof Person3, 'address'>;
type T1 = Exclude1<"a" | "b" | "c", "a" | "c">;


type Extract1<T, U> = T extends U ? T: never;

type T2 = Extract1<"a" | "b" | "c", "b" | "c" | "d" | "r">;

// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

type Todo = {
    title: string,
    description: string,
    completed: boolean,
}

type Pick1<T, K extends keyof T> = {
    [P in K]: T[P]
}

type TodoPreview = Pick1<Todo, "title" | "completed">;

type Exclude2<T, U> = T extends U ? never : T;
type Omit1<T, K extends keyof T> = Pick1<T, Exclude2<keyof T, K>>

type TodoPreview1 = Omit1<Todo, "title">;




















