import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FormArray, FormGroup, FormBuilder } from "@angular/forms";
import { AlbumService } from "./album.service";
import { UserService } from "./user.service";
import { User } from "./user";
import { MatTable, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
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
    console.log(this.albums);
    // this.form.markAsTouched();
    this.albums.controls.forEach(el => el.get('title').markAsTouched())
    if (this.form.get("albums").invalid) {
      return;
    }
  }

  excluir(id: number) {
    this.albums.removeAt(id);
    this.table.renderRows();
    console.log(this.form.get("albums"));
  }
}
