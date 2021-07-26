jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MembershipCategoryService } from '../service/membership-category.service';
import { IMembershipCategory, MembershipCategory } from '../membership-category.model';

import { MembershipCategoryUpdateComponent } from './membership-category-update.component';

describe('Component Tests', () => {
  describe('MembershipCategory Management Update Component', () => {
    let comp: MembershipCategoryUpdateComponent;
    let fixture: ComponentFixture<MembershipCategoryUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let membershipCategoryService: MembershipCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MembershipCategoryUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MembershipCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MembershipCategoryUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      membershipCategoryService = TestBed.inject(MembershipCategoryService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const membershipCategory: IMembershipCategory = { id: 456 };

        activatedRoute.data = of({ membershipCategory });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(membershipCategory));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipCategory>>();
        const membershipCategory = { id: 123 };
        jest.spyOn(membershipCategoryService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipCategory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: membershipCategory }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(membershipCategoryService.update).toHaveBeenCalledWith(membershipCategory);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipCategory>>();
        const membershipCategory = new MembershipCategory();
        jest.spyOn(membershipCategoryService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipCategory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: membershipCategory }));
        saveSubject.complete();

        // THEN
        expect(membershipCategoryService.create).toHaveBeenCalledWith(membershipCategory);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipCategory>>();
        const membershipCategory = { id: 123 };
        jest.spyOn(membershipCategoryService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipCategory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(membershipCategoryService.update).toHaveBeenCalledWith(membershipCategory);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
