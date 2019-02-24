import {Component, } from "@angular/core";
import {SelectedIndexChangedEventData} from "nativescript-drop-down";

@Component({
    selector: "GameSetup",
    moduleId: module.id,
    templateUrl: "./gameSetup.component.html",
    styleUrls: ['./gameSetup.component.css']
})
export class GameSetupComponent {

    roundLengths = [
        30, 60, 90, 120, 150
    ];

    roundLength: Number;

    onChangeDropDown(args: SelectedIndexChangedEventData): void {
        this.roundLength = this.roundLengths[args.newIndex];
    }
}