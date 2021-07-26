import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MembershipStatusDetailComponent } from './membership-status-detail.component';

describe('Component Tests', () => {
  describe('MembershipStatus Management Detail Component', () => {
    let comp: MembershipStatusDetailComponent;
    let fixture: ComponentFixture<MembershipStatusDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MembershipStatusDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ membershipStatus: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MembershipStatusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MembershipStatusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load membershipStatus on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.membershipStatus).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
