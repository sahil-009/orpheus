export type ClientLogo = {
  name: string;
  src: string;
};

/** Client logos in /public — used in hero bar and services marquee. */
export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "U Remit",    src: "/uremit-removebg-preview.png" },
  { name: "Konsälidön", src: "/konsilodon-removebg-preview.png" },
  { name: "Vantage",    src: "/vantage-removebg-preview.png" },
  { name: "Axiom",      src: "/axiom-removebg-preview.png" },
  { name: "Meridian",   src: "/Meridian%20Logo.gif" },
];
