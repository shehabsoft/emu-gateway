import { NgModule } from '@angular/core';
import { GatewaySharedModule } from 'app/shared/shared.module';
import { MembershipTypeComponent } from './list/membership-type.component';
import { MembershipTypeDetailComponent } from './detail/membership-type-detail.component';
import { MembershipTypeUpdateComponent } from './update/membership-type-update.component';
import { MembershipTypeDeleteDialogComponent } from './delete/membership-type-delete-dialog.component';
import { MembershipTypeRoutingModule } from './route/membership-type-routing.module';

@NgModule({
  imports: [GatewaySharedModule, MembershipTypeRoutingModule],
  declarations: [
    MembershipTypeComponent,
    MembershipTypeDetailComponent,
    MembershipTypeUpdateComponent,
    MembershipTypeDeleteDialogComponent,
  ],
  entryComponents: [MembershipTypeDeleteDialogComponent],
})
export class MembershipTypeModule {}
