import React from 'react';

interface NumberButtonArguments {
    number: number,
    key: number,
    isSelected: boolean,
    onSelect: React.MouseEventHandler,
}

export function NumberButton({number, isSelected, key, onSelect}: NumberButtonArguments) {
    let classes = ["button"]
    if (isSelected) {
        classes.push('selected')
    }
    return (
        <div className={classes.join(' ')}  onClick={onSelect} key={key}>
            {number}
        </div>
    );
}
