import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-image-selector',
  templateUrl: './custom-image-selector.component.html',
  styleUrls: ['./custom-image-selector.component.css']
})

export class CustomImageSelectorComponent {
  public imageSrc: string;
  public mosaicGenerated = false;
  constructor () {}

  public onFileChange(file: any): void {
    if (file.target.files && file.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = ((e) => {
        this.imageSrc = e.target.result;
      });
      reader.readAsDataURL(file.target.files[0]);
    }
  }
}
