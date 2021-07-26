jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMembershipCategory, MembershipCategory } from '../membership-category.model';
import { MembershipCategoryService } from '../service/membership-category.service';

import { MembershipCategoryRoutingResolveService } from './membership-category-routing-resolve.service';

describe('Service Tests', () => {
  describe('MembershipCategory routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MembershipCategoryRoutingResolveService;
    let service: MembershipCategoryService;
    let resultMembershipCategory: IMembershipCategory | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MembershipCategoryRoutingResolveService);
      service = TestBed.inject(MembershipCategoryService);
      resultMembershipCategory = undefined;
    });

    describe('resolve', () => {
      it('should return IMembershipCategory returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMembershipCategory = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMembershipCategory).toEqual({ id: 123 });
      });

      it('should return new IMembershipCategory if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMembershipCategory = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMembershipCategory).toEqual(new MembershipCategory());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: (null as unknown) as MembershipCategory })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMembershipCategory = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMembershipCategory).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
