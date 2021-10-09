import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  constructor() { }
  okToDisplay = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.okToDisplay = true;
    }, 3000);
  }

}
