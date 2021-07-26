import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberComponent } from '../list/member.component';
import { MemberDetailComponent } from '../detail/member-detail.component';
import { MemberUpdateComponent } from '../update/member-update.component';
import { MemberRoutingResolveService } from './member-routing-resolve.service';

const memberRoute: Routes = [
  {
    path: '',
    component: MemberComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':id/view',
    component: MemberDetailComponent,
    resolve: {
      member: MemberRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: MemberUpdateComponent,
    resolve: {
      member: MemberRoutingResolveService,
    },
  },
  {
    path: ':id/edit',
    component: MemberUpdateComponent,
    resolve: {
      member: MemberRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(memberRoute)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
