import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import {Deck} from "~/models/deck.module";
import {WordList} from "~/models/wordList.module";

registerElement('CardView', () => CardView);

@NgModule({
    imports: [
        NativeScriptFormsModule
    ]
})
@Component({
    selector: "WordList",
    moduleId: module.id,
    templateUrl: "./decks.component.html",
    styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {
    newDeck: Deck;
    decks: Deck[];

    constructor() {
        this.newDeck = new Deck("", new WordList([]), "", 1);

        // For testing
        let deck1 = new Deck("test1", null, "testDeck", 1);
        let deck2 = new Deck("test2", null, "anderes testDeck", 2);

        this.decks = [];
        this.decks.push(deck1, deck2);
    }

    ngOnInit(): void {

    }

    addWord() {
        
    }

    onNewDeckChange($event) {
        
    }
}