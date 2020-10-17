import React from 'react';
import { Frame } from "./Frame";
import renderer from 'react-test-renderer';

describe("Frame Unit Test", function () {
    it('renders correctly with two cells', function () {
        const frame = renderer.create(<Frame cells={[5,5]} footer={10} header={1}/>).toJSON();
        expect(frame).toMatchSnapshot();
    });
    it('renders correctly with three cells', function () {
        const frame = renderer.create(<Frame header={5} cells={['','','']}
                                             footer={10}/>).toJSON();
        expect(frame).toMatchSnapshot();
    });
});
