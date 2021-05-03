import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from '../../../entity/client';
import {ClientService} from '../../../service/client.service';

@Component({
  selector   : 'app-client-presentation-card',
  templateUrl: './client-presentation-card.component.html',
  styleUrls  : ['./client-presentation-card.component.scss']
})
export class ClientPresentationCardComponent implements OnInit {
  @Input() client: Client;
  @Input() clientHost = '';
  @Output() modifierPhoto: EventEmitter<any>;
  @Output() modifierClick: EventEmitter<Client>;
  @Output() miseAJourListe: EventEmitter<void>;

  constructor(private clientService: ClientService) {
    this.client = new Client();
    this.modifierPhoto = new EventEmitter<any>();
    this.modifierClick = new EventEmitter<Client>();
    this.miseAJourListe = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  initialiserFormulairePhoto(): void {
    this.modifierPhoto.emit({
      id   : this.client.getId(),
      photos: this.client.getPhoto()
    });
  }

  initialiserModifier(): void {
    this.modifierClick.emit(this.client);
  }

  supprimer(): void {
    this.clientService.delete(this.client.getCin()).then(() => this.miseAJourListe.emit());
  }
}
