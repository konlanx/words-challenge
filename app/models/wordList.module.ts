import {Word} from "~/models/word.module";
import {Models} from "~/models/Models";
import IWordList = Models.IWordList;

/**
 * WordList model
 */
export class WordList implements IWordList{
    wordList: Word[];

    constructor(wordList: Word[]) {
        this.wordList = wordList;
    }

    getAmountOfWords(): number {
        return this.wordList.length;
    }

    addWord(word: Word): void {
        this.wordList.push(word);
    }

    removeWordOnIndex(index: number): void {
        this.wordList.splice(index, 1);
    }

    getWordOnIndex(index: number): Word {
        return this.wordList[index];
    }

}