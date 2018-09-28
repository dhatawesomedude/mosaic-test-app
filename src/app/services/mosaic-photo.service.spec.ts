import { DebugElement, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MockMosaicComponent } from '../../mocks/mocks';
import { PhotoMosaicService } from './mosaic-photo.service';

let fixture: ComponentFixture<MockMosaicComponent>;
let component: MockMosaicComponent;
let componentDE: DebugElement;



describe('MosaicPhotoService', () => {
  beforeEach(async(() => {
    // testBed configuration
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        MockMosaicComponent
      ],
      providers: [PhotoMosaicService],
      // The NO_ERRORS_SCHEMA tells the Angular compiler to ignore unrecognized elements and attributes.
      // https://angular.io/guide/testing#no_errors_schema
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(MockMosaicComponent);
    component = fixture.componentInstance;
    componentDE = fixture.debugElement;
  }));

  it('should return an event emitter on initialisation', async(() => {
    fixture.detectChanges();
    const serviceSubscription = component.photoMosaicService.setupMosaic({
      imageUrl: 'https://i.imgur.com/wNz6n4s.jpg',
      iWidth: 500,
      iHeight: 500,
      tileHeight: 10,
      tileWidth: 10,
      noOfVerticalTiles: 1,
      noOfHorizontalTiles: 1,
      canvasRef: component.canvasRef
    });
    expect(serviceSubscription instanceof EventEmitter).toBeTruthy();
  }));

  it('should draw mosaic image on canvas', async( () => {
    fixture.detectChanges();
    component.photoMosaicService.setupMosaic({
      imageUrl: 'https://i.imgur.com/wNz6n4s.jpg',
      iWidth: 500,
      iHeight: 500,
      tileHeight: 10,
      tileWidth: 10,
      noOfVerticalTiles: 1,
      noOfHorizontalTiles: 1,
      canvasRef: component.canvasRef
    });
    expect(component.canvasRef.nativeElement.toDataURL()).toContain('base64');
  }));
});
