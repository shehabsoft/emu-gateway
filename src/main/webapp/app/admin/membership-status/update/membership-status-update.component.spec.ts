jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MembershipStatusService } from '../service/membership-status.service';
import { IMembershipStatus, MembershipStatus } from '../membership-status.model';

import { MembershipStatusUpdateComponent } from './membership-status-update.component';

describe('Component Tests', () => {
  describe('MembershipStatus Management Update Component', () => {
    let comp: MembershipStatusUpdateComponent;
    let fixture: ComponentFixture<MembershipStatusUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let membershipStatusService: MembershipStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MembershipStatusUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MembershipStatusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MembershipStatusUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      membershipStatusService = TestBed.inject(MembershipStatusService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const membershipStatus: IMembershipStatus = { id: 456 };

        activatedRoute.data = of({ membershipStatus });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(membershipStatus));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipStatus>>();
        const membershipStatus = { id: 123 };
        jest.spyOn(membershipStatusService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipStatus });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: membershipStatus }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(membershipStatusService.update).toHaveBeenCalledWith(membershipStatus);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipStatus>>();
        const membershipStatus = new MembershipStatus();
        jest.spyOn(membershipStatusService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipStatus });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: membershipStatus }));
        saveSubject.complete();

        // THEN
        expect(membershipStatusService.create).toHaveBeenCalledWith(membershipStatus);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<MembershipStatus>>();
        const membershipStatus = { id: 123 };
        jest.spyOn(membershipStatusService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ membershipStatus });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(membershipStatusService.update).toHaveBeenCalledWith(membershipStatus);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
