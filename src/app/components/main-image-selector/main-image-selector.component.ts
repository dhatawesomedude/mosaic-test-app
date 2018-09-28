import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { app } from '../../models/app.model';
import { AppResource } from '../../services/app.resource';

@Component({
  selector: 'app-main-image-selector',
  templateUrl: './main-image-selector.component.html',
  styleUrls: ['./main-image-selector.component.css']
})

export class MainImageSelectorComponent implements OnInit, OnDestroy {
  public imageList: app.ImgurGalleryItem [];
  public imageListForCurrentPage: app.ImgurGalleryItem [];
  public isLoading: boolean;
  public loadingError: boolean;
  public destroy$: Subject<void> = new Subject<void>();

  // pagination
  public pageLength = 100;
  public readonly pageSize = 10;

  constructor(private appResource: AppResource,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.appResource.getImageList({subreddit: 'aww', pageId: 1})
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result) => result.success ? of(result) : throwError(result)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(result => {
        this.imageList = result.data.filter(this.imageFilter);
        this.pageLength = this.imageList.length;
        this.imageListForCurrentPage = this.imageList.slice(0, 10);
      }, error => this.loadingError = true);
  }

  private imageFilter(galleryItem: app.ImgurGalleryItem): boolean {
    return (/\.(gif|jpe?g|png)$/i).test(galleryItem.link);
  }

  public onPageChange(page: app.MatPage): void {
    const startIndex = page.pageIndex * page.pageSize;
    // endIndex cannot be larger than the array length
    const endIndex = startIndex + page.pageSize > this.imageList.length ?
      this.imageList.length : startIndex + page.pageSize;
    this.imageListForCurrentPage = this.imageList.slice(startIndex, endIndex);
  }

  public selectImage (image: app.ImgurGalleryItem): void {
    this.router.navigate(['/imgur-image', image.link]);
  }

  public ngOnDestroy (): void {
    this.destroy$.next();
  }
}
