export default class NoteData {

    /**
     * Creates note data object
     * @param {string} title Note title
     * @param {string} text Note text
     * @param {string} color Note color
     * @param {string} id Note id from database (only when note was downloaded from database using Database.js file)
     */
    constructor(title, text, color, id = undefined) {
        this.title = title;
        this.text = text;
        this.color = color;
        this.id = id;
    }

    /**
     * Clones note data
     * @return {NoteData}
     */
    clone() {
        return new NoteData(this.title, this.text, this.color, this.id);
    }

    /**
     * Validates note id
     */
    get hasValidID() {
        return typeof this.id === 'string' && !isNaN(parseInt(this.id));
    }

}