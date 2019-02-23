import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import {Deck} from "~/models/deck.module";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {Database} from "~/models/database.module";
import {NavigationExtras, Router} from "@angular/router";

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

    constructor(private router: Router, public database: Database) {
        this.newDeck = new Deck("", [], "", 0);
    }

    ngOnInit(): void {
        this.loadDecks();
    }

    addDeck() {
        if ('' !== this.newDeck.name && '' !== this.newDeck.name.trim()) {
            this.database.addDeck(this.newDeck);
            this.loadDecks();
            this.newDeck = new Deck('', [], '', 0);
        }
    }

    removeDeck(deck: Deck) {
        let parent = this;
        dialogs.confirm({
            title: deck.name,
            message: "Sicher löschen?",
            okButtonText: "Löschen",
            cancelButtonText: "Abbrechen"
        }).then(function (result) {
            if(result === true) {
                parent.database.removeDeck(deck);
                parent.loadDecks();
            }
        });
    }

    changeDeck(deck: Deck) {
        console.log(deck.wordList);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                'id': deck.id,
                'wordList': deck.wordList
            }
        };
        this.router.navigate(['wordList'], navigationExtras);
    }

    public loadDecks(): void {
        this.database.fetch();

    }

    onNewDeckChange(args: any) {
        this.newDeck.name =  args.object.text;
    }
}