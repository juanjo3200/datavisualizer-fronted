export class User{
    _id: string;
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public viz?: String[]
    ) {}
}
