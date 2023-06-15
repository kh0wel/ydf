export interface EventOptions {

}

export class EventBuilder {

    session: (params: any) => BiscuitOptions = null!;

    include: string[] = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude: string[] = [];

    constructor (options: EventOptions) {

        this.session = options.session;

        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
