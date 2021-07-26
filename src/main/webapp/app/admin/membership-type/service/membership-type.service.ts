import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMembershipType, getMembershipTypeIdentifier } from '../membership-type.model';

export type EntityResponseType = HttpResponse<IMembershipType>;
export type EntityArrayResponseType = HttpResponse<IMembershipType[]>;

@Injectable({ providedIn: 'root' })
export class MembershipTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/membership-types', 'membership');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(membershipType: IMembershipType): Observable<EntityResponseType> {
    return this.http.post<IMembershipType>(this.resourceUrl, membershipType, { observe: 'response' });
  }

  update(membershipType: IMembershipType): Observable<EntityResponseType> {
    return this.http.put<IMembershipType>(`${this.resourceUrl}/${getMembershipTypeIdentifier(membershipType) as number}`, membershipType, {
      observe: 'response',
    });
  }

  partialUpdate(membershipType: IMembershipType): Observable<EntityResponseType> {
    return this.http.patch<IMembershipType>(
      `${this.resourceUrl}/${getMembershipTypeIdentifier(membershipType) as number}`,
      membershipType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembershipType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembershipType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMembershipTypeToCollectionIfMissing(
    membershipTypeCollection: IMembershipType[],
    ...membershipTypesToCheck: (IMembershipType | null | undefined)[]
  ): IMembershipType[] {
    const membershipTypes: IMembershipType[] = membershipTypesToCheck.filter(isPresent);
    if (membershipTypes.length > 0) {
      const membershipTypeCollectionIdentifiers = membershipTypeCollection.map(
        membershipTypeItem => getMembershipTypeIdentifier(membershipTypeItem)!
      );
      const membershipTypesToAdd = membershipTypes.filter(membershipTypeItem => {
        const membershipTypeIdentifier = getMembershipTypeIdentifier(membershipTypeItem);
        if (membershipTypeIdentifier == null || membershipTypeCollectionIdentifiers.includes(membershipTypeIdentifier)) {
          return false;
        }
        membershipTypeCollectionIdentifiers.push(membershipTypeIdentifier);
        return true;
      });
      return [...membershipTypesToAdd, ...membershipTypeCollection];
    }
    return membershipTypeCollection;
  }
}
