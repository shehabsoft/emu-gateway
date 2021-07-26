import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMembershipType, MembershipType } from '../membership-type.model';

import { MembershipTypeService } from './membership-type.service';

describe('Service Tests', () => {
  describe('MembershipType Service', () => {
    let service: MembershipTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: IMembershipType;
    let expectedResult: IMembershipType | IMembershipType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MembershipTypeService);
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

      it('should create a MembershipType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MembershipType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MembershipType', () => {
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

      it('should partial update a MembershipType', () => {
        const patchObject = Object.assign({}, new MembershipType());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MembershipType', () => {
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

      it('should delete a MembershipType', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMembershipTypeToCollectionIfMissing', () => {
        it('should add a MembershipType to an empty array', () => {
          const membershipType: IMembershipType = { id: 123 };
          expectedResult = service.addMembershipTypeToCollectionIfMissing([], membershipType);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(membershipType);
        });

        it('should not add a MembershipType to an array that contains it', () => {
          const membershipType: IMembershipType = { id: 123 };
          const membershipTypeCollection: IMembershipType[] = [
            {
              ...membershipType,
            },
            { id: 456 },
          ];
          expectedResult = service.addMembershipTypeToCollectionIfMissing(membershipTypeCollection, membershipType);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MembershipType to an array that doesn't contain it", () => {
          const membershipType: IMembershipType = { id: 123 };
          const membershipTypeCollection: IMembershipType[] = [{ id: 456 }];
          expectedResult = service.addMembershipTypeToCollectionIfMissing(membershipTypeCollection, membershipType);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(membershipType);
        });

        it('should add only unique MembershipType to an array', () => {
          const membershipTypeArray: IMembershipType[] = [{ id: 123 }, { id: 456 }, { id: 59634 }];
          const membershipTypeCollection: IMembershipType[] = [{ id: 123 }];
          expectedResult = service.addMembershipTypeToCollectionIfMissing(membershipTypeCollection, ...membershipTypeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const membershipType: IMembershipType = { id: 123 };
          const membershipType2: IMembershipType = { id: 456 };
          expectedResult = service.addMembershipTypeToCollectionIfMissing([], membershipType, membershipType2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(membershipType);
          expect(expectedResult).toContain(membershipType2);
        });

        it('should accept null and undefined values', () => {
          const membershipType: IMembershipType = { id: 123 };
          expectedResult = service.addMembershipTypeToCollectionIfMissing([], null, membershipType, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(membershipType);
        });

        it('should return initial array if no MembershipType is added', () => {
          const membershipTypeCollection: IMembershipType[] = [{ id: 123 }];
          expectedResult = service.addMembershipTypeToCollectionIfMissing(membershipTypeCollection, undefined, null);
          expect(expectedResult).toEqual(membershipTypeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
