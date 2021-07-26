import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMembershipStatus } from '../membership-status.model';
import { MembershipStatusService } from '../service/membership-status.service';

@Component({
  templateUrl: './membership-status-delete-dialog.component.html',
})
export class MembershipStatusDeleteDialogComponent {
  membershipStatus?: IMembershipStatus;

  constructor(protected membershipStatusService: MembershipStatusService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.membershipStatusService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
