import {Component, OnInit} from '@angular/core';

@Component({
  selector   : 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls  : ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  dernierLien = document.referrer;

  constructor() { }

  ngOnInit(): void {
  }

}
