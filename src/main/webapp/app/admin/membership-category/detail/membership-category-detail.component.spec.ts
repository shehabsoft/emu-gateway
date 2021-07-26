import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MembershipCategoryDetailComponent } from './membership-category-detail.component';

describe('Component Tests', () => {
  describe('MembershipCategory Management Detail Component', () => {
    let comp: MembershipCategoryDetailComponent;
    let fixture: ComponentFixture<MembershipCategoryDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MembershipCategoryDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ membershipCategory: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MembershipCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MembershipCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load membershipCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.membershipCategory).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
