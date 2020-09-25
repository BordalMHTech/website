export default [
  {
    id: "renewablePercentage",
    label: "Andel fornybar energi",
    value: 0,
    min: 0,
    max: 100,
    calculation: (x) => x,
  },
  {
    id: "hybridFossilePercentage",
    label: "Andel hybrid med fossilt",
    value: 0,
    min: 0,
    max: 100,
    calculation: (x) => x,
  },
  {
    id: "degreeOfAttainment",
    label: "Oppnåelsesgrad",
    value: 0,
    min: 0,
    max: 100,
    calculation: (x) => x,
  },
  { id: "growth", label: "Vekst", value: 0, calculation: (x) => x },
];
