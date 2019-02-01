import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { Word } from "./word.module";
import * as dialogs from "tns-core-modules/ui/dialogs";

const applicationSettings = require("application-settings");

@NgModule({
	imports: [
		NativeScriptFormsModule
	]
})
@Component({
	selector: "List",
	moduleId: module.id,
	templateUrl: "./list.component.html",
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	private wordListKey: string = "wordList";

	wordList: Word[];
	newWord: Word;

	constructor() {
		this.wordList = [];
		this.newWord = new Word('');
	}

	ngOnInit(): void {
		let words = applicationSettings.getString(this.wordListKey, "");

		this.wordList = JSON.parse(words);
	}

	onNewWordChange(args: any) {
		this.newWord.value = args.object.text;
	}

	addWord(): void {
		if (this.newWord.value === '') {
			// If word is empty, do nothing
			return;
		}

		this.wordList.push(this.newWord);
		this.newWord = new Word('');

		this.saveWords();
	}

	saveWords(): void {
		let words = JSON.stringify(this.wordList);
		applicationSettings.setString(this.wordListKey, words);
	}

	onWordListTap($event): void {
		let index = $event.index;
		let wordList = this.wordList;
		let word = wordList[index];
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
				wordList.splice($event.index, 1);
			}
			parent.saveWords();
		});
	}
}