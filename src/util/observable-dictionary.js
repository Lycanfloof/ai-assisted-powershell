export class ObservableDictionary {
    constructor(dictionary = {}) {
        this.dictionary = dictionary
    }

    get = (id) => { return this.dictionary[id] }

    put = (id, item) => {
        this.dictionary[id] = item
        this.onPut(item)
    }

    onPut = (item) => {}
}