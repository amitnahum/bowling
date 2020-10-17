import React from 'react';
import { SelectableNumberRow } from "./SelectableNumberRow";
import renderer from "react-test-renderer";

describe("Selectable Number Row Unit Tests", function () {
    it('renders buttons with value successfully ', function () {
        const selectableNumberRow = renderer.create(<SelectableNumberRow numbers={[4,3,2,1]} selected={1} onSelect={()=>{}}/>).toJSON();
        expect(selectableNumberRow).toMatchSnapshot();
    })
    it('renders buttons with value successfully #2', function () {
        const selectableNumberRow = renderer.create(<SelectableNumberRow numbers={[4]} selected={1} onSelect={()=>{}}/>).toJSON();
        expect(selectableNumberRow).toMatchSnapshot();
    })
    it('renders buttons with value successfully #3', function () {
        const selectableNumberRow = renderer.create(<SelectableNumberRow numbers={[4,2,1]} selected={2} onSelect={()=>{}}/>).toJSON();
        expect(selectableNumberRow).toMatchSnapshot();
    })

});
