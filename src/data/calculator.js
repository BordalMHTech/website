import formula from "./formula.js"

function getAdvancedValue(carType, buttons, advancedValue) {
    if (formula[carType] && formula[carType][advancedValue]) {
        let buttonValues = formula[carType][advancedValue]
        if (typeof buttonValues === 'number') {
            return buttonValues
        } else {
            let basic = buttonValues["basis"]
            buttons.forEach(button => {
                if (buttonValues[button]) {
                    basic += buttonValues[button]
                }
            })
            return basic
        }
    } else {
        return null
    }
}



export default function (carType, buttons, advancedValues) {
    let values = {}
    advancedValues.forEach(advancedValue => {
        values[`${carType}${advancedValue}`] = getAdvancedValue(carType, buttons, advancedValue)
    })
    return values
}