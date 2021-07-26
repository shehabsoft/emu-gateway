import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'audits',
        loadChildren: () => import('./audits/audits.module').then(m => m.AuditsModule),
      },
      {
        path: 'configuration',
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
      },
      {
        path: 'docs',
        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
      },
      {
        path: 'gateway',
        loadChildren: () => import('./gateway/gateway.module').then(m => m.GatewayModule),
      },
      {
        path: 'health',
        loadChildren: () => import('./health/health.module').then(m => m.HealthModule),
      },
      {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
      },
      {
        path: 'metrics',
        loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
      },
      {
        path: 'member',
        data: { pageTitle: 'membershipApp.member.home.title' },
        loadChildren: () => import('./member/member.module').then(m => m.MemberModule),
      },
      {
        path: 'membership-status',
        data: { pageTitle: 'membershipApp.membershipStatus.home.title' },
        loadChildren: () => import('./membership-status/membership-status.module').then(m => m.MembershipStatusModule),
      },
      {
        path: 'membership-category',
        data: { pageTitle: 'membershipApp.membershipCategory.home.title' },
        loadChildren: () => import('./membership-category/membership-category.module').then(m => m.MembershipCategoryModule),
      },
      {
        path: 'membership-type',
        data: { pageTitle: 'membershipApp.membershipType.home.title' },
        loadChildren: () => import('./membership-type/membership-type.module').then(m => m.MembershipTypeModule),
      },
      {
        path: 'membership-level',
        data: { pageTitle: 'membershipApp.membershipLevel.home.title' },
        loadChildren: () => import('./membership-level/membership-level.module').then(m => m.MembershipLevelModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class AdminRoutingModule {}
