export default [
  {
    id: "ntpGoal",
    label: "NTP mål",
    value: 0,
    showButton: ["varebiler", "personbiler"],
    calculation: (x) => x,
  },
  {
    id: "growthRate",
    label: "Bil vekst",
    value: 0,
    showButton: ["varebiler", "personbiler", "letteLastebiler", "tyngreLastebiler"],
    calculation: (x) => x,
  },
  {
    id: "percentElRenewable",
    label: "Prosent El Fornybar",
    value: 0,
    showButton: ["varebiler", "personbiler", "letteLastebiler", "tyngreLastebiler"],
    calculation: (x) => x
  },
  {
    id: "prosentElIFornybar",
    label: "Prosent El i fornybar",
    value: 0,
    showButton: ["letteLastebiler"],
    calculation: (x) => x,
  },
  {
    id: "prosentTeknologiIFornybar",
    label: "Prosent teknologi i fornybar",
    value: 0,
    showButton: ["tyngreLastebiler"],
    calculation: (x) => x,
  },
  {
    id: "vekstAvTellinger",
    label: "Vekst av tellinger",
    value: 0,
    showButton: ["varebiler", "personbiler", "letteLastebiler", "tyngreLastebiler"],
    calculation: (x) => x
  },

];
