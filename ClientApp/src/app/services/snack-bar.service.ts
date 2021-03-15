import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  public config: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  };

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string) {
    this.snackBar.open(message, undefined, this.config);
  }

  public handleError(err) {
    this.openSnackBar(`An error occurred. (Error Code ${err.status})`);
  }
}
