export interface IMembershipType {
  id?: number;
  name?: string;
  description?: string | null;
}

export class MembershipType implements IMembershipType {
  constructor(public id?: number, public name?: string, public description?: string | null) {}
}

export function getMembershipTypeIdentifier(membershipType: IMembershipType): number | undefined {
  return membershipType.id;
}
