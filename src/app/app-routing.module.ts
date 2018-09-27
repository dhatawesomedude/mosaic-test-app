import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomImageSelectorComponent } from './components/custom-image-selector/custom-image-selector.component';
import { MainImageSelectorComponent } from './components/main-image-selector/main-image-selector.component';
import { MosaicImageComponent } from './components/mosaic-image/mosaic-image.component';


const routes: Routes = [
  {path: '', redirectTo: 'imgur-image-list', pathMatch: 'full'},
  {path: 'imgur-image-list', component: MainImageSelectorComponent},
  {path: 'imgur-image/:id', component: MosaicImageComponent},
  {path: 'custom-image', component: CustomImageSelectorComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
