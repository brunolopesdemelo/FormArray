
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormArray } from '@angular/forms';
import { Album } from './album';


@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private _http: HttpClient) {}

  /** Returns 4 Albums from 100 */
  getAll(): Observable<Album[]> {
    const url = 'https://jsonplaceholder.typicode.com/albums';
    return this._http.get<Album[]>(url)
    .pipe(map((albums: Album[]) => {
      return albums.slice(1, 12);
    }));
  }

  getAllAsFormArray(): Observable<FormArray> {
    return this.getAll().pipe(map((albums: Album[]) => {
      const fgs = albums.map(Album.asFormGroup);
      return new FormArray(fgs);
    }));
  }
}

