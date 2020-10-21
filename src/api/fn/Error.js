export class MyError extends Error {
    constructor (error) {
        super(JSON.stringify(error));
    }

    get msg () {
        let msg = '';

        try {
            msg = JSON.parse(this.message);
        } catch {
            msg = this.message;
        }

        return msg;
    }
}
