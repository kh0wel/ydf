export default function (property, target) {

    const clonedProperty = { ...property };

    delete clonedProperty[target];

    return clonedProperty;
};
