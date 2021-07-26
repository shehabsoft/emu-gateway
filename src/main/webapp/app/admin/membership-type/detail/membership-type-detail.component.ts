import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembershipType } from '../membership-type.model';

@Component({
  selector: 'jhi-membership-type-detail',
  templateUrl: './membership-type-detail.component.html',
})
export class MembershipTypeDetailComponent implements OnInit {
  membershipType: IMembershipType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membershipType }) => {
      this.membershipType = membershipType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
