import {Models} from "~/models/Models";
import IWord = Models.IWord;

/**
 * Word model
 */
export class Word implements IWord{
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}