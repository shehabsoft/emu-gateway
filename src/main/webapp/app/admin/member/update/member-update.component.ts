import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IMember, Member } from '../member.model';
import { MemberService } from '../service/member.service';
import { IMembershipStatus } from './../../membership-status/membership-status.model';
import { MembershipStatusService } from './../../membership-status/service/membership-status.service';
import { IMembershipCategory } from './../../membership-category/membership-category.model';
import { MembershipCategoryService } from './../../membership-category/service/membership-category.service';
import { IMembershipType } from './../../membership-type/membership-type.model';
import { MembershipTypeService } from './../../membership-type/service/membership-type.service';
import { IMembershipLevel } from './../../membership-level/membership-level.model';
import { MembershipLevelService } from './../../membership-level/service/membership-level.service';

@Component({
  selector: 'jhi-member-update',
  templateUrl: './member-update.component.html',
})
export class MemberUpdateComponent implements OnInit {
  isSaving = false;

  membershipStatusesSharedCollection: IMembershipStatus[] = [];
  membershipCategoriesSharedCollection: IMembershipCategory[] = [];
  membershipTypesSharedCollection: IMembershipType[] = [];
  membershipLevelsSharedCollection: IMembershipLevel[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    civilId: [null, [Validators.required]],
    birthDate: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    phone: [null, [Validators.required]],
    address1: [null, [Validators.required]],
    address2: [],
    city: [],
    country: [],
    salary: [],
    gender: [null, [Validators.required]],
    membershipStatus: [null, Validators.required],
    membershipCategory: [null, Validators.required],
    membershipType: [null, Validators.required],
    membershipLevel: [null, Validators.required],
  });

  constructor(
    protected memberService: MemberService,
    protected membershipStatusService: MembershipStatusService,
    protected membershipCategoryService: MembershipCategoryService,
    protected membershipTypeService: MembershipTypeService,
    protected membershipLevelService: MembershipLevelService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ member }) => {
      if (member.id === undefined) {
        //  const today = dayjs().startOf('day');
        //   member.birthDate = today;
      }

      this.updateForm(member);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const member = this.createFromForm();
    if (member.id !== undefined) {
      this.subscribeToSaveResponse(this.memberService.update(member));
    } else {
      this.subscribeToSaveResponse(this.memberService.create(member));
    }
  }

  trackMembershipStatusById(index: number, item: IMembershipStatus): number {
    return item.id!;
  }

  trackMembershipCategoryById(index: number, item: IMembershipCategory): number {
    return item.id!;
  }

  trackMembershipTypeById(index: number, item: IMembershipType): number {
    return item.id!;
  }

  trackMembershipLevelById(index: number, item: IMembershipLevel): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMember>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(member: IMember): void {
    this.editForm.patchValue({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      civilId: member.civilId,
      birthDate: null,
      email: member.email,
      phone: member.phone,
      address1: member.address1,
      address2: member.address2,
      city: member.city,
      country: member.country,
      salary: member.salary,
      gender: member.gender,
      membershipStatus: member.membershipStatus,
      membershipCategory: member.membershipCategory,
      membershipType: member.membershipType,
      membershipLevel: member.membershipLevel,
    });

    this.membershipStatusesSharedCollection = this.membershipStatusService.addMembershipStatusToCollectionIfMissing(
      this.membershipStatusesSharedCollection,
      member.membershipStatus
    );
    this.membershipCategoriesSharedCollection = this.membershipCategoryService.addMembershipCategoryToCollectionIfMissing(
      this.membershipCategoriesSharedCollection,
      member.membershipCategory
    );
    this.membershipTypesSharedCollection = this.membershipTypeService.addMembershipTypeToCollectionIfMissing(
      this.membershipTypesSharedCollection,
      member.membershipType
    );
    this.membershipLevelsSharedCollection = this.membershipLevelService.addMembershipLevelToCollectionIfMissing(
      this.membershipLevelsSharedCollection,
      member.membershipLevel
    );
  }

  protected loadRelationshipsOptions(): void {
    this.membershipStatusService
      .query()
      .pipe(map((res: HttpResponse<IMembershipStatus[]>) => res.body ?? []))
      .pipe(
        map((membershipStatuses: IMembershipStatus[]) =>
          this.membershipStatusService.addMembershipStatusToCollectionIfMissing(
            membershipStatuses,
            this.editForm.get('membershipStatus')!.value
          )
        )
      )
      .subscribe((membershipStatuses: IMembershipStatus[]) => (this.membershipStatusesSharedCollection = membershipStatuses));

    this.membershipCategoryService
      .query()
      .pipe(map((res: HttpResponse<IMembershipCategory[]>) => res.body ?? []))
      .pipe(
        map((membershipCategories: IMembershipCategory[]) =>
          this.membershipCategoryService.addMembershipCategoryToCollectionIfMissing(
            membershipCategories,
            this.editForm.get('membershipCategory')!.value
          )
        )
      )
      .subscribe((membershipCategories: IMembershipCategory[]) => (this.membershipCategoriesSharedCollection = membershipCategories));

    this.membershipTypeService
      .query()
      .pipe(map((res: HttpResponse<IMembershipType[]>) => res.body ?? []))
      .pipe(
        map((membershipTypes: IMembershipType[]) =>
          this.membershipTypeService.addMembershipTypeToCollectionIfMissing(membershipTypes, this.editForm.get('membershipType')!.value)
        )
      )
      .subscribe((membershipTypes: IMembershipType[]) => (this.membershipTypesSharedCollection = membershipTypes));

    this.membershipLevelService
      .query()
      .pipe(map((res: HttpResponse<IMembershipLevel[]>) => res.body ?? []))
      .pipe(
        map((membershipLevels: IMembershipLevel[]) =>
          this.membershipLevelService.addMembershipLevelToCollectionIfMissing(membershipLevels, this.editForm.get('membershipLevel')!.value)
        )
      )
      .subscribe((membershipLevels: IMembershipLevel[]) => (this.membershipLevelsSharedCollection = membershipLevels));
  }

  protected createFromForm(): IMember {
    return {
      ...new Member(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      civilId: this.editForm.get(['civilId'])!.value,
      birthDate: undefined,
      email: this.editForm.get(['email'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      address1: this.editForm.get(['address1'])!.value,
      address2: this.editForm.get(['address2'])!.value,
      city: this.editForm.get(['city'])!.value,
      country: this.editForm.get(['country'])!.value,
      salary: this.editForm.get(['salary'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      membershipStatus: this.editForm.get(['membershipStatus'])!.value,
      membershipCategory: this.editForm.get(['membershipCategory'])!.value,
      membershipType: this.editForm.get(['membershipType'])!.value,
      membershipLevel: this.editForm.get(['membershipLevel'])!.value,
    };
  }
}
