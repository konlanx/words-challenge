import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { Word } from "./word.module";

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

	wordList: Word[];
	newWord: Word;

	constructor() {
		this.wordList = [new Word('test'), new Word('more test')];
		this.newWord = new Word('');
	}

	ngOnInit(): void {
	}

	onNewWordChange(args: any) {
		this.newWord.value = args.object.text;
	}

	addWord(): void {
		if (this.newWord.value === '') {
			alert('Bitte ausfüllen!');
			return;
		}

		this.wordList.push(this.newWord);
		this.newWord = new Word('');
	}
}