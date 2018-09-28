import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomImageSelectorComponent } from './custom-image-selector.component';

let fixture: ComponentFixture<CustomImageSelectorComponent>;
let component: CustomImageSelectorComponent;
let componentDE: DebugElement;

describe('AppComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CustomImageSelectorComponent
      ],
      providers: [],
      // The NO_ERRORS_SCHEMA tells the Angular compiler to ignore unrecognized elements and attributes.
      // https://angular.io/guide/testing#no_errors_schema
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(CustomImageSelectorComponent);
    component = fixture.componentInstance;
    componentDE = fixture.debugElement;
  }));

  it('should call onFileChange when file input is received', async(() => {
    spyOn(component, 'onFileChange');
    fixture.detectChanges();
    const inputSelectorDE = fixture.debugElement.query(By.css('input[type=file]'));
    inputSelectorDE.nativeElement.dispatchEvent(new Event('change'));
    expect(component.onFileChange).toHaveBeenCalled();
  }));
});
