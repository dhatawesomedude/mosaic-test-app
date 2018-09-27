import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CustomImageSelectorComponent } from './components/custom-image-selector/custom-image-selector.component';
import { MainImageSelectorComponent } from './components/main-image-selector/main-image-selector.component';
import { MosaicImageComponent } from './components/mosaic-image/mosaic-image.component';
import { AppRoutingModule } from './app-routing.module';
import { AppResource } from './services/app.resource';

@NgModule({
  declarations: [
    AppComponent,
    MosaicImageComponent,
    MainImageSelectorComponent,
    CustomImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [AppResource],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatProgressSpinnerModule]
})
export class AppModule { }
