import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseResolveComponent } from './case-resolve.component';

describe('CaseResolveComponent', () => {
  let component: CaseResolveComponent;
  let fixture: ComponentFixture<CaseResolveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseResolveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
