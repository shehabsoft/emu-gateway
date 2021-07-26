import { NgModule } from '@angular/core';
import { GatewaySharedModule } from 'app/shared/shared.module';
import { MembershipStatusComponent } from './list/membership-status.component';
import { MembershipStatusDetailComponent } from './detail/membership-status-detail.component';
import { MembershipStatusUpdateComponent } from './update/membership-status-update.component';
import { MembershipStatusDeleteDialogComponent } from './delete/membership-status-delete-dialog.component';
import { MembershipStatusRoutingModule } from './route/membership-status-routing.module';

@NgModule({
  imports: [GatewaySharedModule, MembershipStatusRoutingModule],
  declarations: [
    MembershipStatusComponent,
    MembershipStatusDetailComponent,
    MembershipStatusUpdateComponent,
    MembershipStatusDeleteDialogComponent,
  ],
  entryComponents: [MembershipStatusDeleteDialogComponent],
})
export class MembershipStatusModule {}
