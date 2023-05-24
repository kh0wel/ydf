export default function (properties, target) {

    const clonedProperties = { ...properties };

    delete clonedProperties[target];

    return clonedProperties;
};
