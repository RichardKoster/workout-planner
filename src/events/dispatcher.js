export class Dispatcher {
    constructor() {}

    fire(name, data) {
        const event = new CustomEvent(name, {'detail': data});
        document.dispatchEvent(event);
    }
}