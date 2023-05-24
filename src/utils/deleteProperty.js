export default function (obj, prop) {

    const createdObj = { ...obj };

    delete createdObj[prop];

    return createdObj;
};
