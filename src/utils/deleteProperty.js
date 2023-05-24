export default function (previusObject, target) {

    const currentObject = { ...previusObject };

    delete currentObject[target];

    return currentObject;
};
