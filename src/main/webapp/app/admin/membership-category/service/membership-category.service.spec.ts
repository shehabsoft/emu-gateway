import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMembershipCategory, MembershipCategory } from '../membership-category.model';

import { MembershipCategoryService } from './membership-category.service';

describe('Service Tests', () => {
  describe('MembershipCategory Service', () => {
    let service: MembershipCategoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IMembershipCategory;
    let expectedResult: IMembershipCategory | IMembershipCategory[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MembershipCategoryService);
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

      it('should create a MembershipCategory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MembershipCategory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MembershipCategory', () => {
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

      it('should partial update a MembershipCategory', () => {
        const patchObject = Object.assign(
          {
            description: 'BBBBBB',
          },
          new MembershipCategory()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MembershipCategory', () => {
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

      it('should delete a MembershipCategory', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMembershipCategoryToCollectionIfMissing', () => {
        it('should add a MembershipCategory to an empty array', () => {
          const membershipCategory: IMembershipCategory = { id: 123 };
          expectedResult = service.addMembershipCategoryToCollectionIfMissing([], membershipCategory);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(membershipCategory);
        });

        it('should not add a MembershipCategory to an array that contains it', () => {
          const membershipCategory: IMembershipCategory = { id: 123 };
          const membershipCategoryCollection: IMembershipCategory[] = [
            {
              ...membershipCategory,
            },
            { id: 456 },
          ];
          expectedResult = service.addMembershipCategoryToCollectionIfMissing(membershipCategoryCollection, membershipCategory);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MembershipCategory to an array that doesn't contain it", () => {
          const membershipCategory: IMembershipCategory = { id: 123 };
          const membershipCategoryCollection: IMembershipCategory[] = [{ id: 456 }];
          expectedResult = service.addMembershipCategoryToCollectionIfMissing(membershipCategoryCollection, membershipCategory);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(membershipCategory);
        });

        it('should add only unique MembershipCategory to an array', () => {
          const membershipCategoryArray: IMembershipCategory[] = [{ id: 123 }, { id: 456 }, { id: 25225 }];
          const membershipCategoryCollection: IMembershipCategory[] = [{ id: 123 }];
          expectedResult = service.addMembershipCategoryToCollectionIfMissing(membershipCategoryCollection, ...membershipCategoryArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const membershipCategory: IMembershipCategory = { id: 123 };
          const membershipCategory2: IMembershipCategory = { id: 456 };
          expectedResult = service.addMembershipCategoryToCollectionIfMissing([], membershipCategory, membershipCategory2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(membershipCategory);
          expect(expectedResult).toContain(membershipCategory2);
        });

        it('should accept null and undefined values', () => {
          const membershipCategory: IMembershipCategory = { id: 123 };
          expectedResult = service.addMembershipCategoryToCollectionIfMissing([], null, membershipCategory, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(membershipCategory);
        });

        it('should return initial array if no MembershipCategory is added', () => {
          const membershipCategoryCollection: IMembershipCategory[] = [{ id: 123 }];
          expectedResult = service.addMembershipCategoryToCollectionIfMissing(membershipCategoryCollection, undefined, null);
          expect(expectedResult).toEqual(membershipCategoryCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
