import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMembershipCategory, MembershipCategory } from '../membership-category.model';
import { MembershipCategoryService } from '../service/membership-category.service';

@Component({
  selector: 'jhi-membership-category-update',
  templateUrl: './membership-category-update.component.html',
})
export class MembershipCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
  });

  constructor(
    protected membershipCategoryService: MembershipCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membershipCategory }) => {
      this.updateForm(membershipCategory);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const membershipCategory = this.createFromForm();
    if (membershipCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.membershipCategoryService.update(membershipCategory));
    } else {
      this.subscribeToSaveResponse(this.membershipCategoryService.create(membershipCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembershipCategory>>): void {
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

  protected updateForm(membershipCategory: IMembershipCategory): void {
    this.editForm.patchValue({
      id: membershipCategory.id,
      name: membershipCategory.name,
      description: membershipCategory.description,
    });
  }

  protected createFromForm(): IMembershipCategory {
    return {
      ...new MembershipCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
