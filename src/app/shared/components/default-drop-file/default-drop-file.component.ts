import { Component, Input, OnInit, Output, EventEmitter, OnChanges, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-default-drop-file',
  templateUrl: './default-drop-file.component.html',
  styleUrls: ['./default-drop-file.component.scss'],
})

export class DefaultDropFileComponent implements OnInit, OnChanges {
  @ViewChild('fileDropRef') fileInputRef: ElementRef | undefined;

  @Input() label: string = 'Anexo';
  @Input() showLabel: boolean = true;
  @Input() text: string = 'Adicionar documento';
  @Input() description: string = '';
  @Input() textBtn: string = 'Localizar no disposition';
  @Input() icon: string = 'ri-upload-2-line';
  @Input() showIcon: boolean = true;
  @Input() showFiles: boolean = true;
  @Input() singleFile: boolean = true;
  @Input() directUpload: boolean = true;
  @Input() returnType: string = '';
  @Input() acceptType: string = '';
  @Input() textBtnUpload: string = 'Realizar upload';
  @Input() acceptedExtensions: string = 'jpg,jpeg,png,gif,svg+xml,pdf,gif,docx,doc,msword,xlsx,xls';

  @Output() dataFiles: EventEmitter<any> = new EventEmitter<any>();
  @Output() warningMessage: EventEmitter<any> = new EventEmitter<any>();

  files: any[] = [];
  dataReturn: any[] = [];
  loadingUpload = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: any): void {}

  clearFileInput() {
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  // On file drop handler
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  // Handle file from browsing
  fileBrowseHandler($event: any) {
    const files = $event?.target?.files;
    if (this.singleFile) {
      if (files.length >= 2) {
        this.warningMessage.emit({type: 2, message: 'Select just one file to continue.'});
      } else {
        this.prepareFilesList(files);
      }
    } else {
      this.prepareFilesList(files);
    }
  }

  // Delete file
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.dataFiles.emit(this.files);
  }

  // Convert Files list to normal array list
  prepareFilesList(files: Array<any>) {
    this.files = [];

    for (const item of files) {
      item.progress = 0;
      if (this.acceptedExtensions) {
        const allowedTypes = this.acceptedExtensions.split(',');
        const imageExtension = item.type.split("/")[1];
        if (allowedTypes.includes(imageExtension)) {
          this.files.push(item);
        } else {
          this.warningMessage.emit({type: 2, message: 'Invalid file type.'});
        }
      } else {
        this.files.push(item);
      }
    }
    if (this.directUpload) {
      this.callUploadService(files);
    } else {
      switch (this.returnType) {
        case 'base64':
          this.returnDataBase64();
          break;
        case 'file':
          this.returnDataFile();
          break;
      }
    }
  }

  // Call service upload image
  callUploadService(files: any) {
    this.loadingUpload = true;
    // TODO:: Start upload
    console.log('Start upload files', files);
    this.warningMessage.emit({type: 1, message: 'Start upload files.'});
  }

  // Return data file
  returnDataFile() {
    if (this.singleFile && this.files?.length) {
      this.dataFiles.emit(this.files[0]);
    } else {
      this.dataFiles.emit(this.files);
    }
  }

  // Return data base64
  returnDataBase64() {
    this.dataReturn = [];
    this.files.forEach((file) => {
      this.getBase64(file).then((base64String: string) => {
        this.dataReturn.push({ name: file.name, base64String: base64String, type: 'base64' });
        this.dataFiles.emit(this.dataReturn);
      });
    });
  }

  async getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: number) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  clearFiles(){
    this.files = []
  }

  // Simulate the upload process
  uploadFilesSimulator() {
    this.files.forEach((file, index) => {
      setTimeout(() => {
        const progressInterval = setInterval(() => {
          if (file.progress === 100) {
            console.log(this.files);
            clearInterval(progressInterval);
          } else {
            file.progress += 5;
          }
        }, 200);
      }, index * 1000);
    });
  }
}
