import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import randomWords from 'random-words';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AppResource } from '../../services/app.resource';
import { PhotoMosaicService } from '../../services/mosaic-photo.service';

@Component({
  selector: 'app-mosaic-image',
  templateUrl: './mosaic-image.component.html',
  styleUrls: ['./mosaic-image.component.css'],
  viewProviders: [PhotoMosaicService]
})

export class MosaicImageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mosaicCanvas') readonly canvasRef: ElementRef;

  // image src can either be image-url passed in as a router param
  // or base64 data Url
  // Defaults to base64 data Url.
  imageUrl: string;
  @Input() base64ImageData: string;

  // eventEmitter - emits on completion of mosaic
  @Output() mosaicGenerated = new EventEmitter<void>();

  public imageUploadClicked = false;
  public isLoading = false;
  public uploadError = false;
  public uploadedImageUrl: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor (private route: ActivatedRoute,
               private appResource: AppResource,
               private photoMosaicService: PhotoMosaicService) {}

  public ngOnInit (): void {
    // get image-url from url params.
    if (!this.base64ImageData) {
      this.route.params.subscribe(params => {
        console.log('params', params);
        this.imageUrl = params.id;
      });
    }
  }

  public ngAfterViewInit (): void {
    this.photoMosaicService
      .setupMosaic({
      imageUrl: this.imageUrl || this.base64ImageData,
      iWidth: 500,
      iHeight: 500,
      tileHeight: 10,
      tileWidth: 10,
      noOfVerticalTiles: 1,
      noOfHorizontalTiles: 1,
      canvasRef: this.canvasRef
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.mosaicGenerated.emit());
  }

  public convertCanvasToImage (): void {
    this.imageUploadClicked = true;
    this.isLoading = true;

    // setup image
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.canvasRef.nativeElement.toDataURL();
    // generate a title/name for the image;
    const imageTitle = randomWords(3).join(' ');

    this.appResource.uploadImage (imageTitle, image.src.replace(/^data:image\/(png|jpg);base64,/, ''))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe((res) => {
        this.uploadError = false;
        this.uploadedImageUrl = res.data.link;
      }, error => this.uploadError = true);
  }

  public ngOnDestroy (): void {
    this.destroy$.next();
  }
}
