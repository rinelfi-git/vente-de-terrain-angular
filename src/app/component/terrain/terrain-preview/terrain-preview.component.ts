import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Urls} from '../../../utils/urls';
import {HttpClient} from '@angular/common/http';

@Component({
  selector   : 'app-terrain-preview',
  templateUrl: './terrain-preview.component.html',
  styleUrls  : ['./terrain-preview.component.scss']
})
export class TerrainPreviewComponent implements OnInit {

  @Input() componentIndex: number;
  @Input() states: any;
  @Input() backgrounds: string[];
  @Input() temporaries: string[];
  @Input() forTrash: string[];
  @Output() uploadDone: EventEmitter<boolean>;

  constructor(private http: HttpClient) {
    this.componentIndex = -1;
    this.backgrounds = [];
    this.temporaries = [];
    this.forTrash = [];
    this.uploadDone = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.initDomEvents();
  }

  deleteAction(index: number): void {
    this.forTrash.push(this.backgrounds[index]);
    this.backgrounds.splice(index, 1);
  }

  upload(event: Event): void {
    const fichier = event.currentTarget as HTMLInputElement;
    if (fichier.files) {
      const formData = new FormData();
      formData.append('uploadFichier', fichier.files[0]);
      this.http.post<any>(new Urls().getBackendUrl() + 'terrain/upload.action', formData).subscribe((reponse) => {
        if (reponse.status) {
          this.backgrounds.push(reponse.image);
          this.temporaries.push(reponse.image);
        }
      });
    }
    fichier.value = '';
  }

  private deleteRemporaries(): void {
    for (const image of this.temporaries) {
      this.http.get(new Urls().getBackendUrl() + 'terrain/dropload.action?fichierTemporaire=' + image).subscribe();
    }
  }

  private initDomEvents(): void {
    $('#modifier-apercu' + this.componentIndex).on('hide.bs.modal', () => {
      this.deleteRemporaries();
    });
  }

  saveAction(): void {
    for (const image of this.forTrash) {
      this.http.get(new Urls().getBackendUrl() + 'terrain/dropload.action?fichierTemporaire=' + image).subscribe();
    }
    const formData = new FormData();
    formData.append('id', this.states.terrain);
    formData.append('apercues', JSON.stringify(this.backgrounds));
    this.http.post(new Urls().getBackendUrl() + 'terrain/confirm_upload.action', formData).subscribe((reponse: any) => {
      if (reponse.status) {
        this.temporaries = [];
        this.uploadDone.emit(true);
      }
    });
  }

}
