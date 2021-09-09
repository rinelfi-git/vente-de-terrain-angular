import {EventEmitter, Input, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Client} from '../../../entity/client';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../service/client.service';
import {ClientSteps} from '../../../utils/client-steps';
import {Files} from '../../../utils/files';
import {Adresse} from '../../../entity/adresse';

@Component({
  selector   : 'app-client-insert',
  templateUrl: './client-insert.component.html',
  styleUrls  : ['./client-insert.component.scss']
})
export class ClientInsertComponent implements OnInit {
  @Input() states: any;
  client: Client | undefined;
  @Input() personalInformationGroup: FormGroup | any;
  @Input() telephoneGroup: FormGroup | any;
  @Input() addressGroup: FormGroup | any;
  @Output() operationFini: EventEmitter<boolean>;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.operationFini = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.states = {
      titreEtape: 'Information personnel',
      etatEtape : new ClientSteps(),
      rangEtape : 0
    };
    this.states.rangEtape = this.states.etatEtape.informationPersonnel;
    this.client = new Client();
    this.client.setPhoto(Files.DEFAULT_PROFILE);
    this.initPersonalInformation();
    this.initTelephone();
    this.initAddress();
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
      telephones: this.formBuilder.array([
        this.formBuilder.control('', [
          Validators.required,
          Validators.pattern('(03){1}[1-9]{1}[0-9]{7}')
        ])
      ])
    });
  }

  initAddress(): void {
    this.addressGroup = this.formBuilder.group({
      lot       : this.formBuilder.control(''),
      codePostal: this.formBuilder.control('', Validators.required),
      ville     : this.formBuilder.control('', Validators.required),
    });
  }

  soumettre(rangEtape: number): void {
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
          adresse.setLot(this.addressGroup && this.addressGroup.value.lot);
          adresse.setCodePostal(this.addressGroup && this.addressGroup.value.codePostal);
          adresse.setVille(this.addressGroup && this.addressGroup.value.ville);
          this.client.setAdresse(adresse);
          this.clientService.insert(this.client).then(() => {
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
