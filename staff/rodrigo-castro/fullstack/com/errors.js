class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return DuplicityError.name }
}

module.exports = {
    DuplicityError
}