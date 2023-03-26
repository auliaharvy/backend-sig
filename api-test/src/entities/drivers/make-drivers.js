const makeDriver = ({
    encrypt
}) => {
    return function make({
        name,
        age,
        sim
    } = {}) {
        if (!name) {
            throw new Error("Please enter name.");
        }
        if (age == null) {
            throw new Error("Please enter age.");
        }
        if (!sim) {
            throw new Error("Please enter drivers licensi.");
        }
        return Object.freeze({
            getN: () => encrypt(name),
            getSim: () => encrypt(sim),
            getAge: () => age,
        });
    };
};

module.exports = makeDriver;