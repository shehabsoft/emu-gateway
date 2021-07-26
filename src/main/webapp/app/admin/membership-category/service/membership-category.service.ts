import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMembershipCategory, getMembershipCategoryIdentifier } from '../membership-category.model';

export type EntityResponseType = HttpResponse<IMembershipCategory>;
export type EntityArrayResponseType = HttpResponse<IMembershipCategory[]>;

@Injectable({ providedIn: 'root' })
export class MembershipCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/membership-categories', 'membership');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(membershipCategory: IMembershipCategory): Observable<EntityResponseType> {
    return this.http.post<IMembershipCategory>(this.resourceUrl, membershipCategory, { observe: 'response' });
  }

  update(membershipCategory: IMembershipCategory): Observable<EntityResponseType> {
    return this.http.put<IMembershipCategory>(
      `${this.resourceUrl}/${getMembershipCategoryIdentifier(membershipCategory) as number}`,
      membershipCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(membershipCategory: IMembershipCategory): Observable<EntityResponseType> {
    return this.http.patch<IMembershipCategory>(
      `${this.resourceUrl}/${getMembershipCategoryIdentifier(membershipCategory) as number}`,
      membershipCategory,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembershipCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMembershipCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMembershipCategoryToCollectionIfMissing(
    membershipCategoryCollection: IMembershipCategory[],
    ...membershipCategoriesToCheck: (IMembershipCategory | null | undefined)[]
  ): IMembershipCategory[] {
    const membershipCategories: IMembershipCategory[] = membershipCategoriesToCheck.filter(isPresent);
    if (membershipCategories.length > 0) {
      const membershipCategoryCollectionIdentifiers = membershipCategoryCollection.map(
        membershipCategoryItem => getMembershipCategoryIdentifier(membershipCategoryItem)!
      );
      const membershipCategoriesToAdd = membershipCategories.filter(membershipCategoryItem => {
        const membershipCategoryIdentifier = getMembershipCategoryIdentifier(membershipCategoryItem);
        if (membershipCategoryIdentifier == null || membershipCategoryCollectionIdentifiers.includes(membershipCategoryIdentifier)) {
          return false;
        }
        membershipCategoryCollectionIdentifiers.push(membershipCategoryIdentifier);
        return true;
      });
      return [...membershipCategoriesToAdd, ...membershipCategoryCollection];
    }
    return membershipCategoryCollection;
  }
}
