import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMembershipType, MembershipType } from '../membership-type.model';
import { MembershipTypeService } from '../service/membership-type.service';

@Component({
  selector: 'jhi-membership-type-update',
  templateUrl: './membership-type-update.component.html',
})
export class MembershipTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
  });

  constructor(
    protected membershipTypeService: MembershipTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membershipType }) => {
      this.updateForm(membershipType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const membershipType = this.createFromForm();
    if (membershipType.id !== undefined) {
      this.subscribeToSaveResponse(this.membershipTypeService.update(membershipType));
    } else {
      this.subscribeToSaveResponse(this.membershipTypeService.create(membershipType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembershipType>>): void {
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

  protected updateForm(membershipType: IMembershipType): void {
    this.editForm.patchValue({
      id: membershipType.id,
      name: membershipType.name,
      description: membershipType.description,
    });
  }

  protected createFromForm(): IMembershipType {
    return {
      ...new MembershipType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
