namespace Api.Errors {
    export class OfflineError extends Error {
        public constructor(public name: string, public message: string, public httpStatus: Number) {
            super(message);
            Object.setPrototypeOf(this, OfflineError.prototype);
            this.stack = new Error().stack;
        }
    }

    export class UnknownUserError extends Error {
        public constructor(public name: string, public message: string, public user: Api.User) {
            super(message);
            Object.setPrototypeOf(this, UnknownUserError.prototype);
            this.stack = new Error().stack;
        }
    }

    export class DeletedUserError extends Error {
        public constructor(public name: string, public message: string, public user: Api.User) {
            super(message);
            Object.setPrototypeOf(this, DeletedUserError.prototype);
            this.stack = new Error().stack;
        }
    }

    export class LockedUserError extends Error {
        public constructor(public name: string, public message: string, public user: Api.User) {
            super(message);
            Object.setPrototypeOf(this, LockedUserError.prototype);
            this.stack = new Error().stack;
        }
    }
}