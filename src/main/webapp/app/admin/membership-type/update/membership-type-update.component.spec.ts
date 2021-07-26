jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MembershipTypeService } from '../service/membership-type.service';
import { IMembershipType, MembershipType } from '../membership-type.model';

import { MembershipTypeUpdateComponent } from './membership-type-update.component';

describe('Component Tests', () => {
  describe('MembershipType Management Update Component', () => {
    let comp: MembershipTypeUpdateComponent;
    let fixture: ComponentFixture<MembershipTypeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let membershipTypeService: MembershipTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MembershipTypeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MembershipTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MembershipTypeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      membershipTypeService = TestBed.inject(MembershipTypeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const membershipType: IMembershipType = { id: 456 };

        activatedRoute.data = of({ membershipType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(membershipType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipType>>();
        const membershipType = { id: 123 };
        jest.spyOn(membershipTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: membershipType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(membershipTypeService.update).toHaveBeenCalledWith(membershipType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipType>>();
        const membershipType = new MembershipType();
        jest.spyOn(membershipTypeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: membershipType }));
        saveSubject.complete();

        // THEN
        expect(membershipTypeService.create).toHaveBeenCalledWith(membershipType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipType>>();
        const membershipType = { id: 123 };
        jest.spyOn(membershipTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(membershipTypeService.update).toHaveBeenCalledWith(membershipType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
