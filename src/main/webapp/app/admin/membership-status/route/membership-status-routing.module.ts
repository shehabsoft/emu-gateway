import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembershipStatusComponent } from '../list/membership-status.component';
import { MembershipStatusDetailComponent } from '../detail/membership-status-detail.component';
import { MembershipStatusUpdateComponent } from '../update/membership-status-update.component';
import { MembershipStatusRoutingResolveService } from './membership-status-routing-resolve.service';

const membershipStatusRoute: Routes = [
  {
    path: '',
    component: MembershipStatusComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':id/view',
    component: MembershipStatusDetailComponent,
    resolve: {
      membershipStatus: MembershipStatusRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: MembershipStatusUpdateComponent,
    resolve: {
      membershipStatus: MembershipStatusRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: MembershipStatusUpdateComponent,
    resolve: {
      membershipStatus: MembershipStatusRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(membershipStatusRoute)],
  exports: [RouterModule],
})
export class MembershipStatusRoutingModule {}
