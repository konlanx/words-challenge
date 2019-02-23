import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import {Deck} from "~/models/deck.module";
import {WordList} from "~/models/wordList.module";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {Database} from "~/models/database.module";

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

    private database: Database;

    constructor() {
        this.newDeck = new Deck("", new WordList([]), "", 0);

        this.decks = [];
        this.database = new Database();
    }

    ngOnInit(): void {
        this.loadDecks();
    }

    addDeck() {
        if ('' !== this.newDeck.name && '' !== this.newDeck.name.trim()) {
            this.database.addDeck(this.newDeck);
            this.loadDecks();
            this.newDeck = new Deck('', new WordList([]), '', 0);
        }
    }

    removeDeck(deck: Deck) {
        this.database.removeDeck(deck);
        this.loadDecks();
    }

    private loadDecks(): void {
        this.database.fetch(this.decks);

    }

    onNewDeckChange(args: any) {
        this.newDeck.name =  args.object.text;
    }
}