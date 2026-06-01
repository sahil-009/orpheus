export type BankingPartner = {
  name: string;
  src: string;
};

/** UAE banking partners — transparent logos in /public/brands */
export const BANKING_PARTNERS: BankingPartner[] = [
  { name: "First Abu Dhabi Bank", src: "/brands/fab-removebg-preview.png" },
  { name: "Abu Dhabi Commercial Bank", src: "/brands/abc-removebg-preview.png" },
  { name: "Dubai Islamic Bank", src: "/bank-logo-3.png" },
  { name: "RAKBANK", src: "/brands/rak-removebg-preview.png" },
  { name: "Mashreq", src: "/brands/mashreq-removebg-preview.png" },
  { name: "Emirates NBD", src: "/brands/emiretes-removebg-preview.png" },
];
