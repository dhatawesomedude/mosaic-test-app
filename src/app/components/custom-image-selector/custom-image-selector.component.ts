import { Component } from '@angular/core';
import { app } from '../../models/app.model';

@Component({
  selector: 'app-custom-image-selector',
  templateUrl: './custom-image-selector.component.html',
  styleUrls: ['./custom-image-selector.component.css']
})

export class CustomImageSelectorComponent {
  public imageSrc: string;
  public mosaicGenerated = false;

  public onFileChange(file: app.HTMLInputEvent): void {
    if (file.target.files && file.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = ((e) => {
        if (e.target && e.target.result) {
          this.imageSrc = e.target.result;
        }
      });
      reader.readAsDataURL(file.target.files[0]);
    }
  }

  public onMosaicGenerated(): void {
    this.mosaicGenerated = true;
  }
}
