import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { DummyComponent, imageListMock } from '../../mocks/mocks';
import { AppResource } from '../../services/app.resource';
import { PhotoMosaicService } from '../../services/mosaic-photo.service';
import { MosaicImageComponent } from './mosaic-image.component';

let fixture: ComponentFixture<MosaicImageComponent>;
let photoMosaicServiceStub: PhotoMosaicService;
let appResourceStub: AppResource;
let component: MosaicImageComponent;
let componentDE: DebugElement;
let routerStub: any;

describe('AppComponent', () => {
  beforeEach(async(() => {

    // spy setup
    appResourceStub = jasmine.createSpyObj({
      uploadImage: of({
        data: imageListMock[2],
        success: true
      })
    });

    photoMosaicServiceStub = jasmine.createSpyObj({
      setupMosaic: EMPTY // setupMosaic returns an eventEmitter that emits an event when setup is done.
    });

    // routerStub = jasmine.createSpy('params');
    routerStub = {
      params: of({id: imageListMock[1].link})
    };

    TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule
      ],
      declarations: [
        DummyComponent,
        MosaicImageComponent
      ],
      providers: [
        { provide: AppResource, useValue: appResourceStub },
        { provide: PhotoMosaicService, useValue: photoMosaicServiceStub },
        { provide: ActivatedRoute, useValue: routerStub }
      ],
      // The NO_ERRORS_SCHEMA tells the Angular compiler to ignore unrecognized elements and attributes.
      // https://angular.io/guide/testing#no_errors_schema
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(MosaicImageComponent);
    component = fixture.componentInstance;
    componentDE = fixture.debugElement;
  }));

  it('should setup mosaic on init', async(() => {
    fixture.detectChanges();
    expect(component.imageUrl).toEqual(imageListMock[1].link);
  }));

  it(`should upload image`, async(() => {
    fixture.detectChanges();
    const btnSelectorDE = componentDE.query(By.css('.btn'));
    btnSelectorDE.triggerEventHandler('click', null);
    expect(appResourceStub.uploadImage).toHaveBeenCalled();
  }));

  it('it should set image url with the link returned from imgur', async(() => {
    fixture.detectChanges();
    const btnSelectorDE = componentDE.query(By.css('.btn'));
    btnSelectorDE.triggerEventHandler('click', null);
    expect(component.uploadedImageUrl).toEqual(imageListMock[2].link);
  }));
});
