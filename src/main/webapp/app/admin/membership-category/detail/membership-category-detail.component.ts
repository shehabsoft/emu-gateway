import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembershipCategory } from '../membership-category.model';

@Component({
  selector: 'jhi-membership-category-detail',
  templateUrl: './membership-category-detail.component.html',
})
export class MembershipCategoryDetailComponent implements OnInit {
  membershipCategory: IMembershipCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membershipCategory }) => {
      this.membershipCategory = membershipCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
