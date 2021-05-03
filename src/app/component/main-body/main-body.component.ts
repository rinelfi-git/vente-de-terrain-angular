import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../../service/utilisateur.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss'],
  providers: [UtilisateurService]
})
export class MainBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
