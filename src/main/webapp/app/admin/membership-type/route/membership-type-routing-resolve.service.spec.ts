jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMembershipType, MembershipType } from '../membership-type.model';
import { MembershipTypeService } from '../service/membership-type.service';

import { MembershipTypeRoutingResolveService } from './membership-type-routing-resolve.service';

describe('Service Tests', () => {
  describe('MembershipType routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MembershipTypeRoutingResolveService;
    let service: MembershipTypeService;
    let resultMembershipType: IMembershipType | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MembershipTypeRoutingResolveService);
      service = TestBed.inject(MembershipTypeService);
      resultMembershipType = undefined;
    });

    describe('resolve', () => {
      it('should return IMembershipType returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMembershipType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMembershipType).toEqual({ id: 123 });
      });

      it('should return new IMembershipType if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMembershipType = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMembershipType).toEqual(new MembershipType());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: (null as unknown) as MembershipType })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMembershipType = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMembershipType).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
