import React from 'react';
import { NumberButton } from "./NumberButton";
import { mount } from "enzyme";

const mockFunction = () => null;
describe("Number Button Unit Tests", function () {
    it('renders button with value successfully ', function () {
        const wantedResult = "5";
        const wrapper = mount(<NumberButton key={1} number={parseInt(wantedResult)} isSelected={false}
                                            onSelect={mockFunction}/>);
        const value = wrapper.find("div").text();
        expect(value).toEqual(wantedResult);
    })
    it('renders button with value successfully #2', function () {
        const wantedResult = "14";
        const wrapper = mount(<NumberButton key={1} number={parseInt(wantedResult)} isSelected={false}
                                            onSelect={mockFunction}/>);
        const value = wrapper.find("div").text();
        expect(value).toEqual(wantedResult);
    })
    it('renders as selected', function () {
        const wrapper = mount(<NumberButton key={1} number={5} isSelected={true} onSelect={mockFunction}/>);
        expect(wrapper.find("div").get(0).props.className).toBe('button selected');
    })
    it('renders as not selected', function () {
        const wrapper = mount(<NumberButton key={1} number={5} isSelected={false} onSelect={mockFunction}/>);
        expect(wrapper.find("div").get(0).props.className).toBe('button');
    })

});
