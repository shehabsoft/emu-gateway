import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembershipStatus } from '../membership-status.model';

@Component({
  selector: 'jhi-membership-status-detail',
  templateUrl: './membership-status-detail.component.html',
})
export class MembershipStatusDetailComponent implements OnInit {
  membershipStatus: IMembershipStatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membershipStatus }) => {
      this.membershipStatus = membershipStatus;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
