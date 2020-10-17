import React from 'react';
import { NumberButton } from "./NumberButton";


interface SelectableNumberRowArguments {
    numbers: number[],
    selected: number,
    onSelect: Function
}

/**
 * a row of numbers that allow for the selection of a number from the row
 * @param numbersLeft : number[]
 * @param selected : number
 * @param onSelect : Function
 * @constructor
 */
export function SelectableNumberRow({numbers, selected, onSelect}: SelectableNumberRowArguments) {
    return (
        <div style={{display: "flex"}}>
            {
                // iterate over the numbers we have left and render a NumberButton
                numbers.map((number: number, i: number) => NumberButton({
                    number,
                    isSelected: i === selected,
                    key: i,
                    onSelect: () => onSelect(i)
                }))
            }
        </div>
    );
}
