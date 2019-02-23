import {Models} from "~/models/Models";
import IDeck = Models.IDeck;

/**
 * Deck model
 *
 * A deck holds a wordList of words
 */
export class Deck implements IDeck{
    wordList: string[];
    name: string;
    description: string;
    id: number;

    constructor(name: string, wordList: string[], description: string, id: number) {
        this.name = name;
        this.wordList = wordList;
        this.description = description;
        this.id = id;
    }

    getAmountOfWords(): number {
        return this.wordList.length;
    }


}