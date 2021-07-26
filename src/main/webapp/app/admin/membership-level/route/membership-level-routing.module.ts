import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembershipLevelComponent } from '../list/membership-level.component';
import { MembershipLevelDetailComponent } from '../detail/membership-level-detail.component';
import { MembershipLevelUpdateComponent } from '../update/membership-level-update.component';
import { MembershipLevelRoutingResolveService } from './membership-level-routing-resolve.service';

const membershipLevelRoute: Routes = [
  {
    path: '',
    component: MembershipLevelComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':id/view',
    component: MembershipLevelDetailComponent,
    resolve: {
      membershipLevel: MembershipLevelRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: MembershipLevelUpdateComponent,
    resolve: {
      membershipLevel: MembershipLevelRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: MembershipLevelUpdateComponent,
    resolve: {
      membershipLevel: MembershipLevelRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(membershipLevelRoute)],
  exports: [RouterModule],
})
export class MembershipLevelRoutingModule {}
