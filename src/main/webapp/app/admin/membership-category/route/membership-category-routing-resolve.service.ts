import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMembershipCategory, MembershipCategory } from '../membership-category.model';
import { MembershipCategoryService } from '../service/membership-category.service';

@Injectable({ providedIn: 'root' })
export class MembershipCategoryRoutingResolveService implements Resolve<IMembershipCategory> {
  constructor(protected service: MembershipCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMembershipCategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((membershipCategory: HttpResponse<MembershipCategory>) => {
          if (membershipCategory.body) {
            return of(membershipCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MembershipCategory());
  }
}
