import React from 'react';
import { FrameCell } from "./FrameCell";


export interface IFrame {
    cells: (string | number)[]
    footer: string | number,
    header: string | number
}

export function Frame({header, footer = '', cells = ['', '']}: IFrame) {
    return (
        <div className={"frame"}>
            <div className={"frame-header"}>{header}</div>
            <div className={"frame-body"}>
                {
                    cells.map((contents: string | number, index) =>
                        <FrameCell key={index} contents={contents}/>)
                }
            </div>
            <div className={"frame-footer"}>{footer}</div>
        </div>
    );
}
