import {WordList} from "~/models/wordList.module";
import {Word} from "~/models/word.module";

export module Models {

    export interface IDeck {
        id: number;
        name: string;
        description: string;
        wordList: WordList;
    }

    export interface IWordList {
        wordList: Word[];
    }

    export interface IWord {
        value: string;
    }

}