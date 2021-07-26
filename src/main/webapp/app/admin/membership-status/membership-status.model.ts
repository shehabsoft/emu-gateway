export interface IMembershipStatus {
  id?: number;
  name?: string;
  description?: string | null;
}

export class MembershipStatus implements IMembershipStatus {
  constructor(public id?: number, public name?: string, public description?: string | null) {}
}

export function getMembershipStatusIdentifier(membershipStatus: IMembershipStatus): number | undefined {
  return membershipStatus.id;
}
