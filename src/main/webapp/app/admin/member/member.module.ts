import { NgModule } from '@angular/core';
import { GatewaySharedModule } from 'app/shared/shared.module';
import { MemberComponent } from './list/member.component';
import { MemberDetailComponent } from './detail/member-detail.component';
import { MemberUpdateComponent } from './update/member-update.component';
import { MemberDeleteDialogComponent } from './delete/member-delete-dialog.component';
import { MemberRoutingModule } from './route/member-routing.module';

@NgModule({
  imports: [GatewaySharedModule, MemberRoutingModule],
  declarations: [MemberComponent, MemberDetailComponent, MemberUpdateComponent, MemberDeleteDialogComponent],
  entryComponents: [MemberDeleteDialogComponent],
})
export class MemberModule {}
