import { Component, ElementRef, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FormArray, FormGroup, FormBuilder } from "@angular/forms";
import { AlbumService } from "./album.service";
import { UserService } from "./user.service";
import { User } from "./user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  displayedColumns = ["id", "userId", "title", "acoes"];
  constructor(
    private _albumService: AlbumService,
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group({
      albums: this._formBuilder.array([]),
    });
    this._albumService.getAllAsFormArray().subscribe((albums) => {
      this.form.setControl("albums", albums);
    });
    this._userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  get albums(): FormArray {
    return this.form.get("albums") as FormArray;
  }

  onUserChange(event, album: FormGroup) {
    const title = album.get("title");

    title.setValue(null);
    title.markAsUntouched();
  }

  salvar() {
    console.log(this.form.get("albums").invalid);
    if (this.form.get("albums").invalid) {
      return;
    }
  }

  excluir(id: number) {
    this.albums.removeAt(id);
    console.log(this.form.get("albums"));
  }
}
