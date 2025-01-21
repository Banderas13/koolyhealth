import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsulineDataComponent } from './insuline-data.component';

describe('InsulineDataComponent', () => {
  let component: InsulineDataComponent;
  let fixture: ComponentFixture<InsulineDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsulineDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsulineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
