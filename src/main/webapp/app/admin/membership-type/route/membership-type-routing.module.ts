import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MembershipTypeComponent } from '../list/membership-type.component';
import { MembershipTypeDetailComponent } from '../detail/membership-type-detail.component';
import { MembershipTypeUpdateComponent } from '../update/membership-type-update.component';
import { MembershipTypeRoutingResolveService } from './membership-type-routing-resolve.service';

const membershipTypeRoute: Routes = [
  {
    path: '',
    component: MembershipTypeComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':id/view',
    component: MembershipTypeDetailComponent,
    resolve: {
      membershipType: MembershipTypeRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: MembershipTypeUpdateComponent,
    resolve: {
      membershipType: MembershipTypeRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: MembershipTypeUpdateComponent,
    resolve: {
      membershipType: MembershipTypeRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(membershipTypeRoute)],
  exports: [RouterModule],
})
export class MembershipTypeRoutingModule {}
