import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { WordListComponent } from "./wordList/wordList.component";
import { HomeComponent } from "./home/home.component";
import {DecksComponent} from "~/decks/decks.component";
import {GameSetupComponent} from "~/gameSetup/gameSetup.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "wordList", component: WordListComponent },
    { path: "decks", component: DecksComponent },
    { path: "gameSetup", component: GameSetupComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
