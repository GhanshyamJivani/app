import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(messege: string, action:string= 'Ok') {
    this._snackBar.open(messege, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
