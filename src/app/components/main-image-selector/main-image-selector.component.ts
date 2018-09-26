import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
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
  public pageEvent: PageEvent;
  constructor(private appResource: AppResource, private router: Router) {
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.appResource.getImageList({subreddit: 'aww', pageId: 1})
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe(result => {
        if (result.success) {
          this.imageList = result.data.filter(this.imageFilter);
          this.pageLength = this.imageList.length;
          this.imageListForCurrentPage = this.imageList.slice(0, 10);
        }  else {
          this.loadingError = true;
        }
      }, error => this.loadingError = true);
  }

  public imageFilter(galleryItem: app.ImgurGalleryItem): boolean {
    return (/\.(gif|jpe?g|png)$/i).test(galleryItem.link);
  }

  public onPageChange(page: app.MatPage): void {
    const startIndex = page.pageIndex * page.pageSize;
    let endIndex = startIndex + page.pageSize;
    // endIndex cannot be larger than the array length
    if (endIndex > this.imageList.length) {
      endIndex = this.imageList.length;
    }
    this.imageListForCurrentPage = this.imageList.slice(startIndex, endIndex);
  }

  public selectImage(image: app.ImgurGalleryItem): void {
    this.router.navigate(['/imgur-image', image.link]);
  }

  public ngOnDestroy (): void {
    this.destroy$.next();
  }

}
