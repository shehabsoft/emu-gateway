import { IMembershipStatus } from 'app/entities/membership-status/membership-status.model';
import { IMembershipCategory } from 'app/entities/membership-category/membership-category.model';
import { IMembershipType } from 'app/entities/membership-type/membership-type.model';
import { IMembershipLevel } from 'app/entities/membership-level/membership-level.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface IMember {
  id?: number;
  firstName?: string;
  lastName?: string;
  civilId?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  salary?: number | null;
  gender?: Gender;

  membershipStatus?: IMembershipStatus;
  membershipCategory?: IMembershipCategory;
  membershipType?: IMembershipType;
  membershipLevel?: IMembershipLevel;
}

export class Member implements IMember {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public civilId?: string,
    public birthDate?: string,
    public email?: string,
    public phone?: string,
    public address1?: string,
    public address2?: string | null,
    public city?: string | null,
    public country?: string | null,
    public salary?: number | null,
    public gender?: Gender,

    public membershipStatus?: IMembershipStatus,
    public membershipCategory?: IMembershipCategory,
    public membershipType?: IMembershipType,
    public membershipLevel?: IMembershipLevel
  ) {}
}

export function getMemberIdentifier(member: IMember): number | undefined {
  return member.id;
}
