import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DummyComponent, imageListMock } from '../../mocks/mocks';
import { AppResource } from '../../services/app.resource';
import { MainImageSelectorComponent } from './main-image-selector.component';

let fixture: ComponentFixture<MainImageSelectorComponent>;
let appResourceStub: AppResource;
let component: MainImageSelectorComponent;
let componentDE: DebugElement;



describe('MainImageSelectorComponent', () => {
  beforeEach(async(() => {

    // spy setup
    appResourceStub = jasmine.createSpyObj({
      getImageList: of({
        data: imageListMock,
        success: true
      }),
      uploadImage: of({
        data: imageListMock[1],
        success: true
      })
    });

    // testBed configuration
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{
        path: 'imgur-image/:id',
        component: DummyComponent
      }]),
        MatPaginatorModule
      ],
      declarations: [
        MainImageSelectorComponent,
        DummyComponent
      ],
      providers: [
        { provide: AppResource, useValue: appResourceStub }
      ],
      // The NO_ERRORS_SCHEMA tells the Angular compiler to ignore unrecognized elements and attributes.
      // https://angular.io/guide/testing#no_errors_schema
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(MainImageSelectorComponent);
    component = fixture.componentInstance;
    componentDE = fixture.debugElement;
  }));

  it('should request, and set image list on init', async(() => {
    fixture.detectChanges();
    expect(appResourceStub.getImageList).toHaveBeenCalled();
    expect(component.imageList).toBeDefined();
  }));

  it(`should only show image files'`, async(() => {
    fixture.detectChanges();
    const mp4Link = component.imageList.find((imgurGalleryItem) => imgurGalleryItem.link.includes('.mp4'));
    expect(mp4Link).toBeUndefined();
  }));

  it('should navigate to imgur-image route on image click', async(() => {
    fixture.detectChanges();
    const imageSelectorDE = componentDE.query(By.css('img'));
    spyOn(component, 'selectImage').and.returnValue(() => {
    });
    imageSelectorDE.triggerEventHandler('click', null);
    expect(component.selectImage).toHaveBeenCalled();
  }));
});
