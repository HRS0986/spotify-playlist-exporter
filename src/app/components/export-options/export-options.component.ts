import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css']
})
export class ExportOptionsComponent implements OnInit {

  selectedFields: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ExportOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) { }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
