import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMembershipCategory } from '../membership-category.model';
import { MembershipCategoryService } from '../service/membership-category.service';

@Component({
  templateUrl: './membership-category-delete-dialog.component.html',
})
export class MembershipCategoryDeleteDialogComponent {
  membershipCategory?: IMembershipCategory;

  constructor(protected membershipCategoryService: MembershipCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.membershipCategoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
