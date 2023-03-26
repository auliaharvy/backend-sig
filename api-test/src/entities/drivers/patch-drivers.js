const patchDriver = ({
    encrypt
}) => {
    return function make(id, {
        name,
        sim,
        age
    } = {}) {
        if (!id) {
            throw new Error("Please enter ID of driver.");
        }
        if (!name) {
            throw new Error("Please enter name.");
        }
        if (!sim) {
            throw new Error("Please enter drivers licensi.");
        }
        if (age == null) {
            throw new Error("Please enter age.");
        }
        return Object.freeze({
            getId: () => id,
            getN: () => encrypt(name),
            getSim: () => encrypt(sim),
            getAge: () => age,
        });
    };
};

module.exports = patchDriver;