export default function (properties) {

    const available = {};

    // https://discord.com/developers/docs/reference#locales
    const locales = [

        'id', 'da', 'de',    'en-GB', 'en-US', 'es-ES',
        'fr', 'hr', 'it',    'lt',    'hu',    'nl',
        'no', 'pl', 'pt-BR', 'ro',    'fi',    'sv-SE',
        'vi', 'tr', 'cs',    'el',    'bg',    'ru',
        'uk', 'hi', 'th',    'zh-CN', 'ja',    'zh-TW',
        'ko'
    ];

    for (const locale of locales) {

        if (properties[locale]) available[locale] = properties[locale];
    };

    return available;
};
