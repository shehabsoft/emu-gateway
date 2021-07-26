export interface IMembershipCategory {
  id?: number;
  name?: string;
  description?: string | null;
}

export class MembershipCategory implements IMembershipCategory {
  constructor(public id?: number, public name?: string, public description?: string | null) {}
}

export function getMembershipCategoryIdentifier(membershipCategory: IMembershipCategory): number | undefined {
  return membershipCategory.id;
}
