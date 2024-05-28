import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopcornBackgroundComponent } from './popcorn-background.component';

describe('PopcornBackgroundComponent', () => {
  let component: PopcornBackgroundComponent;
  let fixture: ComponentFixture<PopcornBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopcornBackgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopcornBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
