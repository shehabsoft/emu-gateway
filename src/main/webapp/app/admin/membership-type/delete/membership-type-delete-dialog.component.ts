import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMembershipType } from '../membership-type.model';
import { MembershipTypeService } from '../service/membership-type.service';

@Component({
  templateUrl: './membership-type-delete-dialog.component.html',
})
export class MembershipTypeDeleteDialogComponent {
  membershipType?: IMembershipType;

  constructor(protected membershipTypeService: MembershipTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.membershipTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
