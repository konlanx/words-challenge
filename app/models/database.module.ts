import {Deck} from "~/models/deck.module";

const sqlite = require("nativescript-sqlite");

/**
 * Database-module
 */
export class Database {

    private DATABASE_NAME = "wordlist-challenge-decks";

    private database: any;
    private decks: Array<Deck>;

    constructor() {
        this.decks = [];
        (new sqlite(this.DATABASE_NAME + ".db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, wordList TEXT)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    addDeck(deck: Deck): void {
        let jsonWordList = JSON.stringify(deck.wordList);
        this.database.execSQL("INSERT INTO people (name, description, wordList) VALUES (?, ?)", [deck.name, deck.description, jsonWordList]).then(id => {
            console.log("INSERT RESULT", id);
            this.fetch();
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    editDeck(deck: Deck): void {

    }

    removeDeck(deck: Deck): void {

    }

    public fetch(): Array<Deck> {
        this.database.all("SELECT * FROM people").then(rows => {
            this.decks = [];
            for(const row in rows) {
                let deck = new Deck(rows[row][1],JSON.parse(rows[row][2]), rows[row][2], rows[row][0]);
                this.decks.push(deck);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });

        return this.decks;
    }
}