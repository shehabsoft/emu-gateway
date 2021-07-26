import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembershipCategoryComponent } from '../list/membership-category.component';
import { MembershipCategoryDetailComponent } from '../detail/membership-category-detail.component';
import { MembershipCategoryUpdateComponent } from '../update/membership-category-update.component';
import { MembershipCategoryRoutingResolveService } from './membership-category-routing-resolve.service';

const membershipCategoryRoute: Routes = [
  {
    path: '',
    component: MembershipCategoryComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':id/view',
    component: MembershipCategoryDetailComponent,
    resolve: {
      membershipCategory: MembershipCategoryRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: MembershipCategoryUpdateComponent,
    resolve: {
      membershipCategory: MembershipCategoryRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: MembershipCategoryUpdateComponent,
    resolve: {
      membershipCategory: MembershipCategoryRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(membershipCategoryRoute)],
  exports: [RouterModule],
})
export class MembershipCategoryRoutingModule {}
