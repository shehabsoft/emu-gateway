import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMembershipStatus, MembershipStatus } from '../membership-status.model';

import { MembershipStatusService } from './membership-status.service';

describe('Service Tests', () => {
  describe('MembershipStatus Service', () => {
    let service: MembershipStatusService;
    let httpMock: HttpTestingController;
    let elemDefault: IMembershipStatus;
    let expectedResult: IMembershipStatus | IMembershipStatus[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MembershipStatusService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        name: 'AAAAAAA',
        description: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MembershipStatus', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MembershipStatus()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MembershipStatus', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MembershipStatus', () => {
        const patchObject = Object.assign({}, new MembershipStatus());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MembershipStatus', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MembershipStatus', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMembershipStatusToCollectionIfMissing', () => {
        it('should add a MembershipStatus to an empty array', () => {
          const membershipStatus: IMembershipStatus = { id: 123 };
          expectedResult = service.addMembershipStatusToCollectionIfMissing([], membershipStatus);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(membershipStatus);
        });

        it('should not add a MembershipStatus to an array that contains it', () => {
          const membershipStatus: IMembershipStatus = { id: 123 };
          const membershipStatusCollection: IMembershipStatus[] = [
            {
              ...membershipStatus,
            },
            { id: 456 },
          ];
          expectedResult = service.addMembershipStatusToCollectionIfMissing(membershipStatusCollection, membershipStatus);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MembershipStatus to an array that doesn't contain it", () => {
          const membershipStatus: IMembershipStatus = { id: 123 };
          const membershipStatusCollection: IMembershipStatus[] = [{ id: 456 }];
          expectedResult = service.addMembershipStatusToCollectionIfMissing(membershipStatusCollection, membershipStatus);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(membershipStatus);
        });

        it('should add only unique MembershipStatus to an array', () => {
          const membershipStatusArray: IMembershipStatus[] = [{ id: 123 }, { id: 456 }, { id: 45636 }];
          const membershipStatusCollection: IMembershipStatus[] = [{ id: 123 }];
          expectedResult = service.addMembershipStatusToCollectionIfMissing(membershipStatusCollection, ...membershipStatusArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const membershipStatus: IMembershipStatus = { id: 123 };
          const membershipStatus2: IMembershipStatus = { id: 456 };
          expectedResult = service.addMembershipStatusToCollectionIfMissing([], membershipStatus, membershipStatus2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(membershipStatus);
          expect(expectedResult).toContain(membershipStatus2);
        });

        it('should accept null and undefined values', () => {
          const membershipStatus: IMembershipStatus = { id: 123 };
          expectedResult = service.addMembershipStatusToCollectionIfMissing([], null, membershipStatus, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(membershipStatus);
        });

        it('should return initial array if no MembershipStatus is added', () => {
          const membershipStatusCollection: IMembershipStatus[] = [{ id: 123 }];
          expectedResult = service.addMembershipStatusToCollectionIfMissing(membershipStatusCollection, undefined, null);
          expect(expectedResult).toEqual(membershipStatusCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
