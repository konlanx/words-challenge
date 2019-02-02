import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { Word } from "~/models/word.module";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {WordList} from "~/models/wordList.module";
import {Database} from "~/models/database.module";
import {Deck} from "~/models/deck.module";

@NgModule({
    imports: [
        NativeScriptFormsModule
    ]
})
@Component({
    selector: "WordList",
    moduleId: module.id,
    templateUrl: "./wordList.component.html",
    styleUrls: ['./wordList.component.css']
})
export class WordListComponent implements OnInit {

    wordList: WordList;
    newWord: Word;

    constructor() {
        this.wordList = new WordList([]);
        this.newWord = new Word('');
    }

    ngOnInit(): void {

    }

    onNewWordChange(args: any) {
        this.newWord.value = args.object.text;
    }

    addWord(): void {
        if (this.newWord.value === '') {
            // If word is empty, do nothing
            return;
        }

        this.wordList.addWord(this.newWord);
        this.newWord = new Word('');

        this.saveWords();
    }

    saveWords(): void {
        // Empty for now
    }

    onWordListTap($event): void {
        let index = $event.index;
        let wordList = this.wordList;
        let word = wordList.getWordOnIndex(index);
        let parent = this;
        dialogs.prompt({
            title: "Wort bearbeiten",
            message: "Wort ändern oder löschen",
            okButtonText: "Speichern",
            cancelButtonText: "Löschen",
            defaultText: word.value
        }).then(function (result) {
            if(result.result === true) {
                word.value = result.text;
            } else {
                wordList.removeWordOnIndex(index);
            }
            parent.saveWords();
        });
    }
}