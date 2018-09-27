import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainImageSelectorComponent } from './main-image-selector.component';
describe('MainImageSelectorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MainImageSelectorComponent
      ],
    }).compileComponents();
  }));
  it('should request image list on init', async(() => {

  }));
  it(`should only show image files'`, async(() => {

  }));
  it('should navigate to imgur-image route on image click', async(() => {

  }));
});
