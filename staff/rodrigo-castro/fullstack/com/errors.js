class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return ContentError.name }
}

module.exports = {
    DuplicityError,
    ContentError
}