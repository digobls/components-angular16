import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { FormResetEventBus } from '../components/input-type/events/form-group-reset-event';

@Injectable({
  providedIn: 'root',
})

export class SystemUtils {

  constructor(
    private formResetEventBus: FormResetEventBus
  ) { }

  public console(name: string, value: any) {
    if (!environment.production){
      console.log('------------------------ Console --------------------------');
      console.log(name, value);
      console.log('-----------------------------------------------------------');
    }
  }

  public validForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.validForm(control);
      }
    });
  }

  public resetForm(formGroup: FormGroup) {
    this.formResetEventBus.emitFormReset(formGroup);
  }

  public downloadFileByUrl(urlFile: string, fileName?: string) {
    fetch(urlFile)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro ao baixar o arquivo: ${response.status} ${response.statusText}`);
          }
          return response.blob();
        })
        .then(blob => {
          const date = new Date();
          const genericName = `download_${date}`;

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName ? fileName : genericName;
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error(error);
        });
  }

  // Base64 to file
  base64toBlob(base64: string): Promise<Blob> {
    return fetch(`${base64}`).then(response => response.blob());
    // Example usage
    // this.systemUtils.base64toBlob(signatureBase64).then(blob => {
    //  console.log([new File([blob], 'example.png', { type: 'image/png' })]);
    // });
  }

  public base64toFile(base64String: string, fileName: string) {
    let mimeType = '';
    if (fileName?.includes('png') || fileName?.includes('jpeg') || fileName?.includes('jpg') || fileName?.includes('gif')) {
      mimeType = 'image/png';
    } else if (fileName?.includes('pdf')) {
      mimeType = 'application/pdf';
    } else if (fileName?.includes('pdf')) {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else {
      mimeType = 'application/octet-stream';
    }

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
