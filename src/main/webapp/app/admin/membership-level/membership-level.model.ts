export interface IMembershipLevel {
  id?: number;
  name?: string;
  description?: string | null;
}

export class MembershipLevel implements IMembershipLevel {
  constructor(public id?: number, public name?: string, public description?: string | null) {}
}

export function getMembershipLevelIdentifier(membershipLevel: IMembershipLevel): number | undefined {
  return membershipLevel.id;
}
