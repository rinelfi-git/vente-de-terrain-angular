import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DashboardService} from '../../service/dashboard.service';
import {Urls} from '../../utils/urls';

@Component({
  selector   : 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls  : ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  recapitulation: any;
  url: string;

  constructor(private title: Title, private dashboardService: DashboardService) {
    this.url = '';
    this.recapitulation = {
      totalTerrain  : 0,
      totalVente    : 0,
      totalClient   : 0,
      dernierClient : [],
      dernierTerrain: []
    };
  }

  ngOnInit(): void {
    this.title.setTitle('tableau de bord');
    this.url = new Urls().getProfileServerUrl();
    this.dashboardService.load().then(json => this.recapitulation = json);
  }

}
