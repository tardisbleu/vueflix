const Producer = require('./Producer.js');

class Movie {
    constructor(title, language, releaseDate,producerFirstName,producerLastName,producerNationality,producerBirthDate,poster,kind,rating) {
        this._id = Math.random().toString(36).substr(2, 9);
        this._title = title;
        this._language = language;
        this._releaseDate = releaseDate;
        this._productBy = new Producer(producerFirstName,producerLastName,producerNationality,producerBirthDate);
        this._poster = poster;
        this._kind = kind;
        this._rating = rating;
    }
    get toJSON() {
        return {
            id: this._id,
            title: this._title,
            language: this._language,
            releaseDate: this._releaseDate,
            productBy: this._productBy.toJSON,
            poster: this._poster,
            kind: this._kind,
            rating: this._rating,
        }
    }

    set productBy(producer) {
        this._productBy = producer;
    }

    get productBy() {
        return this._productBy;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        this._language = value;
    }

    get releaseDate() {
        return this._releaseDate;
    }

    set releaseDate(value) {
        this._releaseDate = value;
    }

    get poster() {
        return this._poster;
    }

    set poster(value) {
        this._poster = value;
    }

    get kind() {
        return this._kind;
    }

    set kind(value) {
        this._kind = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}
module.exports = Movie;