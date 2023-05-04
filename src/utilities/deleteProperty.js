export default function (property, target) {

    delete property[target];

    return property;
};
