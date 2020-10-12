import formula from "../data/formula.js";

function getAdvancedValue(carType, buttons, advancedValue) {
  if (formula[carType] && formula[carType][advancedValue]) {
    let buttonValues = formula[carType][advancedValue];
    if (typeof buttonValues === "number") {
      return buttonValues;
    } else {
      let basic = buttonValues["basis"];
      buttons.forEach((button) => {
        if (buttonValues[button]) {
          basic += buttonValues[button];
        }
      });
      return basic;
    }
  } else {
    return null;
  }
}

export default function (carTypes, policies) {
  let values = {};
  function math(carType) {
    Object.keys(formula[carType]).forEach((advancedValue) => {
      let value = getAdvancedValue(
        carType,
        Object.keys(policies[carType]),
        advancedValue
      );
      if (advancedValue === "2025") {
        values.m2025 = values.m2025 ? values.m2025 + value : value;
      } else {
        values[`${advancedValue}${carType}`] = value;
      }
    });
  }
  carTypes.forEach((carType) => {
    math(carType);
  });
  return values;
}
