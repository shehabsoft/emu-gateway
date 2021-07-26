import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MembershipTypeDetailComponent } from './membership-type-detail.component';

describe('Component Tests', () => {
  describe('MembershipType Management Detail Component', () => {
    let comp: MembershipTypeDetailComponent;
    let fixture: ComponentFixture<MembershipTypeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MembershipTypeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ membershipType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MembershipTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MembershipTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load membershipType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.membershipType).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
