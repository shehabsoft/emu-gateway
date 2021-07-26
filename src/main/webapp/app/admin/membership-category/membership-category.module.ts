import { NgModule } from '@angular/core';
import { GatewaySharedModule } from 'app/shared/shared.module';
import { MembershipCategoryComponent } from './list/membership-category.component';
import { MembershipCategoryDetailComponent } from './detail/membership-category-detail.component';
import { MembershipCategoryUpdateComponent } from './update/membership-category-update.component';
import { MembershipCategoryDeleteDialogComponent } from './delete/membership-category-delete-dialog.component';
import { MembershipCategoryRoutingModule } from './route/membership-category-routing.module';

@NgModule({
  imports: [GatewaySharedModule, MembershipCategoryRoutingModule],
  declarations: [
    MembershipCategoryComponent,
    MembershipCategoryDetailComponent,
    MembershipCategoryUpdateComponent,
    MembershipCategoryDeleteDialogComponent,
  ],
  entryComponents: [MembershipCategoryDeleteDialogComponent],
})
export class MembershipCategoryModule {}
