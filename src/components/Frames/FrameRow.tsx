import React from "react";
import { Frame, IFrame } from "./Frame";

interface FrameRowArguments {
    frames: IFrame[];
}

const prepareLastFrame = (frame: IFrame) => {
    return {...frame, cells: [frame.cells[0], frame.cells[1], frame.cells[2] ? frame.cells[2] : '']}

}

export function FrameRow({frames}: FrameRowArguments) {
    let lastFrame = frames.pop();
    if (!lastFrame) throw new Error("no frames")
    lastFrame = prepareLastFrame(lastFrame);
    return (
        <div className={"frame-row"}>
            {
                frames.map((frame: IFrame, i: number) => {
                    if (i < frames.length)
                        return <Frame key={i} cells={frame.cells} header={frame.header} footer={frame.footer}/>
                    }
                )
            }
            <Frame key={frames.length+1} cells={lastFrame.cells} footer={lastFrame.footer} header={lastFrame.header}/>
        </div>
    );
}
