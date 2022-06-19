import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss']
})
export class AuthorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthorDialogComponent>) { }

  ngOnInit(): void {
  }

}
