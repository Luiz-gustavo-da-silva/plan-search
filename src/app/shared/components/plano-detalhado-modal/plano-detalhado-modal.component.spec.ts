import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoDetalhadoModalComponent } from './plano-detalhado-modal.component';

describe('PlanoDetalhadoModalComponent', () => {
  let component: PlanoDetalhadoModalComponent;
  let fixture: ComponentFixture<PlanoDetalhadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanoDetalhadoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanoDetalhadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
