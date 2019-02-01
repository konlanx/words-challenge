import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    sayHello(): void {
        alert("Not done yet!");
    }

    editList(): void {
        this.router.navigate["/list"];
    }
}
