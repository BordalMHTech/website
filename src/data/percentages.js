export default [
  {
    id: "percentage1",
    label: "Andel fornybar energi",
    value: 0,
    min: 0,
    max: 100,
    calculation: (x) => x,
  },
  {
    id: "percentage2",
    label: "Andel hybrid med fossilt",
    value: 0,
    min: 0,
    max: 100,
    calculation: (x) => x,
  },
  {
    id: "percentage3",
    label: "Oppnåelsesgrad",
    value: 0,
    min: 0,
    max: 100,
    calculation: (x) => x,
  },
  { id: "percentage4", label: "Vekst", value: 0, calculation: (x) => x },
];
