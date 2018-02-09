class Producer {
    constructor(firstName,lastName,nationality,birthDate) {
        this._id = Math.random().toString(36).substr(2, 9);
        this._firstName = firstName;
        this._lastName = lastName;
        this._nationality = nationality;
        this._birthDate = birthDate;
    }
    get toJSON() {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            nationality: this._nationality,
            birthDate: this._birthDate
        }
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get nationality() {
        return this._nationality;
    }

    set nationality(value) {
        this._nationality = value;
    }

    get birthDate() {
        return this._birthDate;
    }

    set birthDate(value) {
        this._birthDate = value;
    }
}
module.exports = Producer;