import React from "react";


interface FrameCellArguments {
    contents?: number | string | null;
    style?: any // todo check docs for style type
}

export function FrameCell({contents, style}: FrameCellArguments) {
    return (
        <div className={"frame-cell"} style={style}>
            {contents !== null && contents !== undefined ? contents : ''}
        </div>
    );
}
