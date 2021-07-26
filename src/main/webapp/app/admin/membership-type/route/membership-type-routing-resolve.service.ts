import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMembershipType, MembershipType } from '../membership-type.model';
import { MembershipTypeService } from '../service/membership-type.service';

@Injectable({ providedIn: 'root' })
export class MembershipTypeRoutingResolveService implements Resolve<IMembershipType> {
  constructor(protected service: MembershipTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMembershipType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((membershipType: HttpResponse<MembershipType>) => {
          if (membershipType.body) {
            return of(membershipType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MembershipType());
  }
}
