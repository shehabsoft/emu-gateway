jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MemberService } from '../service/member.service';
import { IMember, Member } from '../member.model';
import { IMembershipStatus } from 'app/entities/membership-status/membership-status.model';
import { MembershipStatusService } from 'app/entities/membership-status/service/membership-status.service';
import { IMembershipCategory } from 'app/entities/membership-category/membership-category.model';
import { MembershipCategoryService } from 'app/entities/membership-category/service/membership-category.service';
import { IMembershipType } from 'app/entities/membership-type/membership-type.model';
import { MembershipTypeService } from 'app/entities/membership-type/service/membership-type.service';
import { IMembershipLevel } from 'app/entities/membership-level/membership-level.model';
import { MembershipLevelService } from 'app/entities/membership-level/service/membership-level.service';

import { MemberUpdateComponent } from './member-update.component';

describe('Component Tests', () => {
  describe('Member Management Update Component', () => {
    let comp: MemberUpdateComponent;
    let fixture: ComponentFixture<MemberUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let memberService: MemberService;
    let membershipStatusService: MembershipStatusService;
    let membershipCategoryService: MembershipCategoryService;
    let membershipTypeService: MembershipTypeService;
    let membershipLevelService: MembershipLevelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MemberUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MemberUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MemberUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      memberService = TestBed.inject(MemberService);
      membershipStatusService = TestBed.inject(MembershipStatusService);
      membershipCategoryService = TestBed.inject(MembershipCategoryService);
      membershipTypeService = TestBed.inject(MembershipTypeService);
      membershipLevelService = TestBed.inject(MembershipLevelService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call MembershipStatus query and add missing value', () => {
        const member: IMember = { id: 456 };
        const membershipStatus: IMembershipStatus = { id: 71325 };
        member.membershipStatus = membershipStatus;

        const membershipStatusCollection: IMembershipStatus[] = [{ id: 34181 }];
        jest.spyOn(membershipStatusService, 'query').mockReturnValue(of(new HttpResponse({ body: membershipStatusCollection })));
        const additionalMembershipStatuses = [membershipStatus];
        const expectedCollection: IMembershipStatus[] = [...additionalMembershipStatuses, ...membershipStatusCollection];
        jest.spyOn(membershipStatusService, 'addMembershipStatusToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ member });
        comp.ngOnInit();

        expect(membershipStatusService.query).toHaveBeenCalled();
        expect(membershipStatusService.addMembershipStatusToCollectionIfMissing).toHaveBeenCalledWith(
          membershipStatusCollection,
          ...additionalMembershipStatuses
        );
        expect(comp.membershipStatusesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MembershipCategory query and add missing value', () => {
        const member: IMember = { id: 456 };
        const membershipCategory: IMembershipCategory = { id: 98106 };
        member.membershipCategory = membershipCategory;

        const membershipCategoryCollection: IMembershipCategory[] = [{ id: 79166 }];
        jest.spyOn(membershipCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: membershipCategoryCollection })));
        const additionalMembershipCategories = [membershipCategory];
        const expectedCollection: IMembershipCategory[] = [...additionalMembershipCategories, ...membershipCategoryCollection];
        jest.spyOn(membershipCategoryService, 'addMembershipCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ member });
        comp.ngOnInit();

        expect(membershipCategoryService.query).toHaveBeenCalled();
        expect(membershipCategoryService.addMembershipCategoryToCollectionIfMissing).toHaveBeenCalledWith(
          membershipCategoryCollection,
          ...additionalMembershipCategories
        );
        expect(comp.membershipCategoriesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MembershipType query and add missing value', () => {
        const member: IMember = { id: 456 };
        const membershipType: IMembershipType = { id: 67538 };
        member.membershipType = membershipType;

        const membershipTypeCollection: IMembershipType[] = [{ id: 84661 }];
        jest.spyOn(membershipTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: membershipTypeCollection })));
        const additionalMembershipTypes = [membershipType];
        const expectedCollection: IMembershipType[] = [...additionalMembershipTypes, ...membershipTypeCollection];
        jest.spyOn(membershipTypeService, 'addMembershipTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ member });
        comp.ngOnInit();

        expect(membershipTypeService.query).toHaveBeenCalled();
        expect(membershipTypeService.addMembershipTypeToCollectionIfMissing).toHaveBeenCalledWith(
          membershipTypeCollection,
          ...additionalMembershipTypes
        );
        expect(comp.membershipTypesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MembershipLevel query and add missing value', () => {
        const member: IMember = { id: 456 };
        const membershipLevel: IMembershipLevel = { id: 17048 };
        member.membershipLevel = membershipLevel;

        const membershipLevelCollection: IMembershipLevel[] = [{ id: 314 }];
        jest.spyOn(membershipLevelService, 'query').mockReturnValue(of(new HttpResponse({ body: membershipLevelCollection })));
        const additionalMembershipLevels = [membershipLevel];
        const expectedCollection: IMembershipLevel[] = [...additionalMembershipLevels, ...membershipLevelCollection];
        jest.spyOn(membershipLevelService, 'addMembershipLevelToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ member });
        comp.ngOnInit();

        expect(membershipLevelService.query).toHaveBeenCalled();
        expect(membershipLevelService.addMembershipLevelToCollectionIfMissing).toHaveBeenCalledWith(
          membershipLevelCollection,
          ...additionalMembershipLevels
        );
        expect(comp.membershipLevelsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const member: IMember = { id: 456 };
        const membershipStatus: IMembershipStatus = { id: 94954 };
        member.membershipStatus = membershipStatus;
        const membershipCategory: IMembershipCategory = { id: 46260 };
        member.membershipCategory = membershipCategory;
        const membershipType: IMembershipType = { id: 88793 };
        member.membershipType = membershipType;
        const membershipLevel: IMembershipLevel = { id: 40183 };
        member.membershipLevel = membershipLevel;

        activatedRoute.data = of({ member });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(member));
        expect(comp.membershipStatusesSharedCollection).toContain(membershipStatus);
        expect(comp.membershipCategoriesSharedCollection).toContain(membershipCategory);
        expect(comp.membershipTypesSharedCollection).toContain(membershipType);
        expect(comp.membershipLevelsSharedCollection).toContain(membershipLevel);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Member>>();
        const member = { id: 123 };
        jest.spyOn(memberService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ member });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: member }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(memberService.update).toHaveBeenCalledWith(member);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Member>>();
        const member = new Member();
        jest.spyOn(memberService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ member });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: member }));
        saveSubject.complete();

        // THEN
        expect(memberService.create).toHaveBeenCalledWith(member);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Member>>();
        const member = { id: 123 };
        jest.spyOn(memberService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ member });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(memberService.update).toHaveBeenCalledWith(member);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMembershipStatusById', () => {
        it('Should return tracked MembershipStatus primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMembershipStatusById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMembershipCategoryById', () => {
        it('Should return tracked MembershipCategory primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMembershipCategoryById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMembershipTypeById', () => {
        it('Should return tracked MembershipType primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMembershipTypeById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackMembershipLevelById', () => {
        it('Should return tracked MembershipLevel primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMembershipLevelById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
