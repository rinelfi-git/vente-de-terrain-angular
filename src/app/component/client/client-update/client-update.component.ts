import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from '../../../entity/client';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../service/client.service';
import {ClientSteps} from '../../../utils/client-steps';
import {Urls} from '../../../utils/urls';
import {Adresse} from '../../../entity/adresse';

@Component({
  selector   : 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls  : ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {
  @Input() states: any;
  @Input() client: Client | any;
  @Input() personalInformationGroup: FormGroup | any;
  @Input() telephoneGroup: FormGroup | any;
  @Input() adresseGroup: FormGroup | any;
  @Output() operationFini: EventEmitter<boolean>;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.operationFini = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.initPersonalInformation();
    this.initTelephone();
    this.initAddress();
    this.states = {
      titreEtape: 'Information personnel',
      etatEtape : new ClientSteps(),
      rangEtape : 0
    };
    this.states.rangEtape = this.states.etatEtape.informationPersonnel;
    this.client = new Client();
    this.client.setPhoto(new Urls().getProfileServerUrl() + 'profile_par_defaut.png');
  }

  initPersonalInformation(): void {
    this.personalInformationGroup = this.formBuilder.group({
      cin   : this.formBuilder.control('', [Validators.pattern('[0-9]{5}(1|2){1}[0-9]{6}'), Validators.required]),
      nom   : this.formBuilder.control('', Validators.required),
      prenom: this.formBuilder.control(''),
    });
  }

  initTelephone(): void {
    this.telephoneGroup = this.formBuilder.group({
      telephones: this.formBuilder.array(
        [
          this.formBuilder.control('', [
            Validators.required, Validators.pattern('(03){1}[1-9]{1}[0-9]{7}')
          ])
        ]
      )
    });
  }

  initAddress(): void {
    this.adresseGroup = this.formBuilder.group({
      lot       : this.formBuilder.control(''),
      codePostal: this.formBuilder.control('', Validators.required),
      ville     : this.formBuilder.control('', Validators.required),
    });
  }

  formulaireAction(rangEtape: number): void {
    switch (rangEtape) {
      case this.states.etatEtape.informationPersonnel:
        if (this.client) {
          this.client.setCin(this.personalInformationGroup && this.personalInformationGroup.value.cin);
          this.client.setNom(this.personalInformationGroup && this.personalInformationGroup.value.nom);
          this.client.setPrenom(this.personalInformationGroup && this.personalInformationGroup.value.prenom);
          this.states.rangEtape = this.states.etatEtape.telephone;
          this.states.titreEtape = 'Numéros de téléphone';
        }
        break;
      case this.states.etatEtape.telephone:
        if (this.client) {
          this.client.setTelephone([]);
          for (const champTemp of this.getTelephone().controls) {
            const champ: FormControl = champTemp as FormControl;
            this.client.getTelephones().push(champ.value);
          }
          this.states.rangEtape = this.states.etatEtape.adresse;
          this.states.titreEtape = 'Adresse';
        }
        break;
      case this.states.etatEtape.adresse:
        if (this.client) {
          const adresse = new Adresse();
          adresse.setLot(this.adresseGroup && this.adresseGroup.value.lot);
          adresse.setCodePostal(this.adresseGroup && this.adresseGroup.value.codePostal);
          adresse.setVille(this.adresseGroup && this.adresseGroup.value.ville);
          this.client.setAdresse(adresse);
          this.clientService.update(this.client).then(() => {
            this.operationFini.emit(true);
          });
        }
        break;
    }
  }

  formulairePrecedent(rangEtape: number): void {
    switch (rangEtape) {
      case this.states.etatEtape.telephone:
        this.states.rangEtape = this.states.etatEtape.informationPersonnel;
        this.states.titreEtape = 'Information personnel';
        break;
      case this.states.etatEtape.adresse:
        this.states.rangEtape = this.states.etatEtape.telephone;
        this.states.titreEtape = 'Numéros de téléphone';
        break;
    }
  }

  getTelephone(): FormArray {
    return this.telephoneGroup && this.telephoneGroup.controls.telephones as FormArray || this.formBuilder.array([]);
  }

  supprimerTelephone(i: number): void {
    this.getTelephone().removeAt(i);
  }

  ajouterTelephone(): void {
    this.getTelephone().push(this.formBuilder.control('', [Validators.required, Validators.pattern('(03){1}[1-9]{1}[0-9]{7}')]));
  }
}
