import exampleData from "data/example.json";

export default (input) => {
  //   const url = [
  //     "http://mhtech.us-west-2.elasticbeanstalk.com/predict",
  //     input.renewablePercentage,
  //     input.hybridFossilePercentage,
  //     input.degreeOfAttainment,
  //     input.growth,
  //     input.municipality,
  //   ].join("/");

  //   fetch(url, { mode: "cors" })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });

  return input && exampleData;
};
