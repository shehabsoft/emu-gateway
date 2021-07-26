import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMembershipStatus, MembershipStatus } from '../membership-status.model';
import { MembershipStatusService } from '../service/membership-status.service';

@Component({
  selector: 'jhi-membership-status-update',
  templateUrl: './membership-status-update.component.html',
})
export class MembershipStatusUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
  });

  constructor(
    protected membershipStatusService: MembershipStatusService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membershipStatus }) => {
      this.updateForm(membershipStatus);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const membershipStatus = this.createFromForm();
    if (membershipStatus.id !== undefined) {
      this.subscribeToSaveResponse(this.membershipStatusService.update(membershipStatus));
    } else {
      this.subscribeToSaveResponse(this.membershipStatusService.create(membershipStatus));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembershipStatus>>): void {
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

  protected updateForm(membershipStatus: IMembershipStatus): void {
    this.editForm.patchValue({
      id: membershipStatus.id,
      name: membershipStatus.name,
      description: membershipStatus.description,
    });
  }

  protected createFromForm(): IMembershipStatus {
    return {
      ...new MembershipStatus(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
