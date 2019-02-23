import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { WordListComponent } from "./wordList/wordList.component";
import {DecksComponent} from "~/decks/decks.component";
import {Database} from "~/models/database.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        WordListComponent,
        DecksComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        Database
    ]
})
export class AppModule { }
