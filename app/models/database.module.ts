import {Deck} from "~/models/deck.module";
import {Injectable} from "@angular/core";

const sqlite = require("nativescript-sqlite");

/**
 * Database-module
 */
@Injectable()
export class Database {

    private DATABASE_NAME = "wordlist-challenge-decks";

    private database: any;
    private isInstantiated = false;

    public decks: Array<Deck>;

    constructor() {
        if (!this.isInstantiated) {
            (new sqlite(this.DATABASE_NAME + ".db")).then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS decks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, wordList TEXT)").then(id => {
                    this.database = db;
                    this.isInstantiated = true;
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });
            }, error => {
                console.log("OPEN DB ERROR", error);
            });
        }
    }

    addDeck(deck: Deck): void {
        let jsonWordList = JSON.stringify(deck.wordList);
        console.log('Database adding');
        this.database.execSQL("INSERT INTO decks (name, description, wordList) VALUES (?, ?, ?)", [deck.name, deck.description, jsonWordList]).then(id => {
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    editDeck(deck: Deck): void {

    }

    editWordList(wordList: string[], id: Number): void {
        let jsonWordList = JSON.stringify(wordList);
        console.log('Database wordList edit');
        this.database.execSQL("UPDATE decks SET wordList = ? WHERE id = ?", [jsonWordList, id]).then(id => {
            console.log("UPDATE RESULT", id);
        }, error => {
            console.log("UPDATE ERROR", error);
        });
    }

    removeDeck(deck: Deck): void {
        this.database.execSQL("DELETE FROM decks WHERE id = ?", deck.id).then(id => {
           console.log('Deleted', id);
        }, error => {
            console.log('DELETE ERROR', error);
        });
    }

    public fetch(): void {
        this.decks = [];
        this.database.all("SELECT * FROM decks").then(rows => {
            for(const row in rows) {
                let wordList = JSON.parse(rows[row][3]);
                let deck = new Deck(rows[row][1], wordList, rows[row][2], rows[row][0]);
                this.decks.push(deck);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
}