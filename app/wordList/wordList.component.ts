import {Component, OnDestroy, OnInit} from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {ActivatedRoute} from "@angular/router";
import {Database} from "~/models/database.module";
import {DecksComponent} from "~/decks/decks.component";

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
export class WordListComponent implements OnInit, OnDestroy {

    newWord: string;

    wordList: string[];
    id: Number;
    parent: DecksComponent;

    constructor(private route: ActivatedRoute, private database: Database) {
        this.route.queryParams.subscribe(params => {
            this.wordList = params['wordList'];
            this.id = params['id'];
            this.parent = params['parent'];
        });

        this.newWord = '';
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        console.log('Destroying');
        this.database.fetch();
    }

    onNewWordChange(args: any) {
            console.log( args.object.text);
        this.newWord = args.object.text;
    }

    addWord(): void {
        if (this.newWord === '') {
            // If word is empty, do nothing
            return;
        }

        this.wordList.push(this.newWord);
        this.saveWords();

        this.newWord = '';
    }

    saveWords(): void {
        this.database.editWordList(this.wordList, this.id);
    }

    onWordListTap($event): void {
        let index = $event.index;
        let wordList = this.wordList;
        let parent = this;
        dialogs.prompt({
            title: "Wort bearbeiten",
            message: "Wort ändern oder löschen",
            okButtonText: "Speichern",
            cancelButtonText: "Löschen",
            defaultText: wordList[index]
        }).then(function (result) {
            if(result.result === true) {
                wordList[index] = result.text;
            } else {
                wordList.splice(index, 1);
            }
            parent.saveWords();
        });
    }
}