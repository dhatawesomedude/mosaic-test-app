import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import randomWords from 'random-words';
import { finalize } from 'rxjs/operators';
import { AppResource } from '../../services/app.resource';
import { PhotoMosaicService } from '../../services/mosaic-photo.service';

interface Color {
  r: number;
  g: number;
  b: number;
}


@Component({
  selector: 'app-mosaic-image',
  templateUrl: './mosaic-image.component.html',
  styleUrls: ['./mosaic-image.component.css']
})

export class MosaicImageComponent implements OnInit, AfterViewInit {

  @ViewChild('mosaicCanvas') readonly canvasRef: ElementRef;
  @Input() tileShape: 'circle' | 'rect' = 'circle';
  @Input() opacity = 1;
  // TODO: complete
  // image src can either be url or base64 | defaults to base64.
  imageUrl: string;
  @Input() base64ImageData: string;
  @Output() mosaicGenerated = new EventEmitter<void>();
  public imageUploadClicked = false;
  public isLoading = false;
  public uploadError = false;
  public uploadedImageUrl: string;
  private photoMosaicService: PhotoMosaicService;

  constructor(private route: ActivatedRoute, private appResource: AppResource) {
  }
  public ngOnInit (): void {
    // get image-url from url params.
    if (!this.base64ImageData) {
      this.route.params.subscribe(params => this.imageUrl = params.id);
    }
  }
  public ngAfterViewInit (): void {
    this.photoMosaicService = new PhotoMosaicService({
      imageUrl: this.imageUrl || this.base64ImageData,
      iWidth: 500,
      iHeight: 500,
      tileHeight: 10,
      tileWidth: 10,
      noOfVerticalTiles: 1,
      noOfHorizontalTiles: 1,
      canvasRef: this.canvasRef
    });
    this.photoMosaicService.setupMosaic();
    this.photoMosaicService.onComplete.subscribe((event) => this.mosaicGenerated.emit());
  }
  public convertCanvasToImage (): void {
    this.imageUploadClicked = true;
    this.isLoading = true;
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.canvasRef.nativeElement.toDataURL();
    const imageTitle = randomWords(3).join(' ');
    this.appResource.uploadImage(imageTitle, image.src.replace(/^data:image\/(png|jpg);base64,/, ''))
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((res) => {
        this.uploadError = false;
        this.uploadedImageUrl = res.data.link;
        }, error => this.uploadError = true);
  }
}
