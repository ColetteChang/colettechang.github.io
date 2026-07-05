// ============================================================
//  賓客名單 — RSVP 姓名查詢（GitHub Pages 靜態站會打包進 JS）
//  建議 repo 設為 Private；密碼門仍建議保留
// ============================================================

export type Party = {
  id: string;
  members: string[];
  plusOnesAllowed: number;
};

export const guestList: Party[] = [
  {
    id: "aggarwal-sunkalp",
    members: ["Sunkalp Aggarwal", "Coco C"],
    plusOnesAllowed: 0,
  },
  {
    id: "aggarwal-family",
    members: ["Rashmi Aggarwal", "Vikas Aggarwal", "Vaani Aggarwal"],
    plusOnesAllowed: 0,
  },
  {
    id: "lee-family",
    members: ["Jordan Lee", "Taylor Lee"],
    plusOnesAllowed: 0,
  },
  {
    id: "morgan-kim",
    members: ["Morgan Kim"],
    plusOnesAllowed: 1,
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function memberMatchesQuery(member: string, query: string) {
  const memberNorm = normalize(member);
  const queryNorm = normalize(query);
  if (!queryNorm) return false;
  if (memberNorm === queryNorm) return true;
  if (memberNorm.includes(queryNorm)) return true;

  const tokens = memberNorm.split(" ");
  return tokens.some(
    (token) =>
      token === queryNorm ||
      token.startsWith(queryNorm) ||
      queryNorm.startsWith(token)
  );
}

export function partyMatchesQuery(party: Party, query: string) {
  return party.members.some((member) => memberMatchesQuery(member, query));
}

export function searchParties(query: string): Party[] {
  const queryNorm = normalize(query);
  if (queryNorm.length < 2) return [];
  return guestList.filter((party) => partyMatchesQuery(party, queryNorm));
}

export function isExactPartyMatch(party: Party, query: string) {
  const queryNorm = normalize(query);
  return party.members.some((member) => normalize(member) === queryNorm);
}

// 完整姓名精確比對（保留給單一結果直接進入表單）
export function findParty(name: string): Party | undefined {
  const normalized = normalize(name);
  if (!normalized) return undefined;
  return guestList.find((party) =>
    party.members.some((member) => normalize(member) === normalized)
  );
}
