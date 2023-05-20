export default class {

    name    = undefined;
    execute = undefined;

    constructor (options) {

        this.name    = options.name;
        this.execute = options.execute;
    };
};
