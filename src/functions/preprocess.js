import constants from "../data/constants.js";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



export default function (carTypes, policiesCheck) {
  function getAdvancedValue(carType, policies, outputName) {
    if (constants[carType]) {
      let policyObject = constants[carType][outputName];
      if (typeof policyObject === "number") {
        return policyObject;
      } else {
        let basis = policyObject["basis"];
        let calculation = policyObject["calculation"];
        let result = basis;
        policies.forEach((policy) => {
          if (policiesCheck[carType][policy]) {
            if (calculation === "percent") {
              if (policyObject[policy]) {
                result = result + result * (policyObject[policy] / 100);
              }
            } else if (calculation === "sum") {
              if (policyObject[policy]) {
                result += policyObject[policy];
              }
            }
          }
        });
        return Math.floor(result + 0.5);
      }
    } else {
      return constants[carType][outputName]["basis"];
    }
  }

  let values = {};

  function math(carType) {
    Object.keys(constants[carType]).forEach((valueName) => {
      let value = getAdvancedValue(
        carType,
        Object.keys(policiesCheck[carType]),
        valueName
      );
      values[`${valueName}${capitalizeFirstLetter(carType)}`] = String(value);
    });
  }

  carTypes.forEach((carType) => {
    math(carType);
  });

  return values;
}
