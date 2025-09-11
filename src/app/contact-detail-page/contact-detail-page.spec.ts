import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailPage } from './contact-detail-page';

describe('ContactDetailPage', () => {
  let component: ContactDetailPage;
  let fixture: ComponentFixture<ContactDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
