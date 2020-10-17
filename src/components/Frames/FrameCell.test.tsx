import React from 'react';
import { FrameCell } from "./FrameCell";
import { mount } from "enzyme";

const mockFunction = () => null;
describe("Number Button Unit Tests", function () {
    it('renders button with value successfully ', function () {
        const wantedResult = "5";
        const wrapper = mount(<FrameCell contents={"5"}/>);
        const value = wrapper.find("div").text();
        expect(value).toEqual(wantedResult);
    })
});
