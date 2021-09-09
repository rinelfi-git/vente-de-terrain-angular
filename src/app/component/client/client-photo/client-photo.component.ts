import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {ScriptLoader} from '../../../utils/script-loader';
import {HttpClient} from '@angular/common/http';

@Component({
  selector   : 'app-client-photo',
  templateUrl: './client-photo.component.html',
  styleUrls  : ['./client-photo.component.scss']
})
export class ClientPhotoComponent implements OnInit, AfterViewInit {
  @Input() states: any;
  @Input() scriptLoader: ScriptLoader | any;
  @Output() uploadTermine: EventEmitter<boolean>;

  // Image cropper
  croppedImage: string;
  imageChangedEvent: Event | undefined;
  transform: ImageTransform = {};

  constructor(private http: HttpClient) {
    this.uploadTermine = new EventEmitter<boolean>();
    this.croppedImage = '';
  }

  ngOnInit(): void {
    this.states = {
      client        : undefined,
      ancienPhoto   : undefined,
      nomDuFichier  : 'Choisir un photo',
      dropZoneActive: false,
      editorMode    : false,
      url           : undefined
    };
  }

  ngAfterViewInit(): void {
    const overlay = document.querySelector('.drop-zone .overlay') as HTMLElement;
    if (overlay) {
      overlay.style.backgroundColor = 'transparent';
    }
  }

  dragend(event: DragEvent): void {
    event.preventDefault();
    this.states.dropZoneActive = false;
  }

  dragleave(event: DragEvent): void {
    event.preventDefault();
    this.states.dropZoneActive = false;
  }

  dragover(event: DragEvent): void {
    event.preventDefault();
    this.states.dropZoneActive = true;
  }

  drop(event: DragEvent): void {
    event.preventDefault();
    this.states.dropZoneActive = false;
    if (event && event.dataTransfer && event.dataTransfer.files.length > 0) {
      const fileInput = document.getElementById('client-photo-file-input') as HTMLInputElement;
      fileInput.files = event.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
    }
  }

  changed(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.states.nomDuFichier = element && element.files && element.files.length ? element.files[0].name : this.states.nomDuFichier;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64 ? event.base64.toString() : '';
  }

  imageLoaded(): void {
    this.states.editorMode = true;
  }

  cropperReady(sourceImageDimensions: Dimensions): void {
  }

  loadImageFailed(): void {
    console.log('Load failed');
  }

  upload(): void {
    const formData = new FormData();
    formData.append('content', this.croppedImage.split(',')[1]);
    formData.append('id', this.states.client);
    formData.append('ancienPhoto', this.states.ancienPhoto);
    this.http.post(this.states.url + 'client/upload.action', formData).subscribe((response: any) => {
      if (response.status === true) {
        this.uploadTermine.emit(true);
      }
    });
  }
}
