import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMembershipStatus, getMembershipStatusIdentifier } from '../membership-status.model';

export type EntityResponseType = HttpResponse<IMembershipStatus>;
export type EntityArrayResponseType = HttpResponse<IMembershipStatus[]>;

@Injectable({ providedIn: 'root' })
export class MembershipStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/membership-statuses', 'membership');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(membershipStatus: IMembershipStatus): Observable<EntityResponseType> {
    return this.http.post<IMembershipStatus>(this.resourceUrl, membershipStatus, { observe: 'response' });
  }

  update(membershipStatus: IMembershipStatus): Observable<EntityResponseType> {
    return this.http.put<IMembershipStatus>(
      `${this.resourceUrl}/${getMembershipStatusIdentifier(membershipStatus) as number}`,
      membershipStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(membershipStatus: IMembershipStatus): Observable<EntityResponseType> {
    return this.http.patch<IMembershipStatus>(
      `${this.resourceUrl}/${getMembershipStatusIdentifier(membershipStatus) as number}`,
      membershipStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembershipStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembershipStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMembershipStatusToCollectionIfMissing(
    membershipStatusCollection: IMembershipStatus[],
    ...membershipStatusesToCheck: (IMembershipStatus | null | undefined)[]
  ): IMembershipStatus[] {
    const membershipStatuses: IMembershipStatus[] = membershipStatusesToCheck.filter(isPresent);
    if (membershipStatuses.length > 0) {
      const membershipStatusCollectionIdentifiers = membershipStatusCollection.map(
        membershipStatusItem => getMembershipStatusIdentifier(membershipStatusItem)!
      );
      const membershipStatusesToAdd = membershipStatuses.filter(membershipStatusItem => {
        const membershipStatusIdentifier = getMembershipStatusIdentifier(membershipStatusItem);
        if (membershipStatusIdentifier == null || membershipStatusCollectionIdentifiers.includes(membershipStatusIdentifier)) {
          return false;
        }
        membershipStatusCollectionIdentifiers.push(membershipStatusIdentifier);
        return true;
      });
      return [...membershipStatusesToAdd, ...membershipStatusCollection];
    }
    return membershipStatusCollection;
  }
}
