export class PasswordDoNotMatchError extends Error {
    constructor() {
        super("PasswordDoNotMatchError");
    }
}