import React from 'react';
import {
    getAheadScores,
    getCellsFromScoresWithPadding,
    getFramePinsLeft,
    getCellsFromScoresWithNoPadding,
    getLastFramePinsLeft,
    getPinsLeft,
    getScoreUpToFrame,
    initFrames
} from "./BowlingGame";


const mockGame =
    [{
        scores: [0, 5],
        expect: 5
    }, {
        scores: [1, 3],
        expect: 9
    }]

const mockGameWithStrike =
    [{
        scores: [0, 5],
        expect: 5
    }, {
        scores: [10],
        expect: 22
    }, {
        scores: [5, 2],
        expect: 29
    }, {
        scores: [5, 1],
        expect: 35
    }, {
        scores: [9, 0],
        expect: 44
    }]

const mockGameWithSpare =
    [{
        scores: [9, 1],
        expect: 11
    }, {
        scores: [1, 1],
        expect: 13
    }, {
        scores: [2, 3],
        expect: 18
    }]

const mockGameWithStrikeAndSpare =
    [{
        scores: [0, 5],
        expect: 5
    }, {
        scores: [10],
        expect: 22,
    }, {
        scores: [5, 2],
        expect: 29
    }, {
        scores: [5, 1],
        expect: 35
    }, {
        scores: [9, 0],
        expect: 44
    }, {
        scores: [9, 1],
        expect: 64
    }, {
        scores: [10],
        expect: 84
    }, {
        scores: [9, 1],
        expect: 99
    }, {
        scores: [5, 5],
        expect: 114
    },
        {
            scores: [5, 5, 10],
            expect: 134
        }]


const mockPerfectGame =
    [{
        scores: [10],
        expect: 30
    }, {
        scores: [10],
        expect: 60
    }, {
        scores: [10],
        expect: 90
    }, {
        scores: [10],
        expect: 120
    }, {
        scores: [10],
        expect: 150
    }, {
        scores: [10],
        expect: 180
    }, {
        scores: [10],
        expect: 210
    }, {
        scores: [10],
        expect: 240
    }, {
        scores: [10],
        expect: 270
    }, {
        scores: [10, 10, 10],
        expect: 300
    }]


describe("Bowling Game Unit Test", function () {
    describe('"Helper functions', function () {
        it('inits frames successfully ', function () {
            const length = 4;
            const frames = initFrames(length);
            expect(frames.length).toBe(length)
            expect(frames.map(f => f.scores)).not.toBeNull()
        })
        it('should get ahead scores when on first round', function () {
            expect(getAheadScores(mockGame, 0, 1, 2)).toEqual(6);
        })
        it('should get ahead scores when on second round', function () {
            expect(getAheadScores(mockGame, 0, 2, 2)).toEqual(4);
        })
        it('should get ahead scores with one single array', function () {
            expect(getAheadScores(mockGameWithStrike, 0, 2, 2)).toEqual(15);
        })
        it('can get cell contents from scores', function () {
            expect(getCellsFromScoresWithPadding([10])).toEqual(['', 'X']);
            expect(getCellsFromScoresWithPadding([])).toEqual(['', '']);
            expect(getCellsFromScoresWithPadding([4, 3])).toEqual(['4', '3']);
            expect(getCellsFromScoresWithPadding([9, 1])).toEqual(['9', '/']);
            expect(getCellsFromScoresWithPadding([4])).toEqual(['4', '']);
            expect(getCellsFromScoresWithPadding([6, 4])).toEqual(['6', '/']);
        })
        it('can get last cell contents from scores', function () {
            expect(getCellsFromScoresWithNoPadding([10])).toEqual(['X']);
            expect(getCellsFromScoresWithNoPadding([4,3])).toEqual(['4','3']);
            expect(getCellsFromScoresWithNoPadding([5,5,1])).toEqual(['5','/','1']);
            expect(getCellsFromScoresWithNoPadding([10, 2])).toEqual(['X', '2']);
            expect(getCellsFromScoresWithNoPadding([10, 5, 2])).toEqual(['X', '5', '2']);
            expect(getCellsFromScoresWithNoPadding([10, 10, 10])).toEqual(['X', 'X', 'X']);
            expect(getCellsFromScoresWithNoPadding([10, 9, 1])).toEqual(['X', '9', '/']);
            expect(getCellsFromScoresWithNoPadding([10, 4, 2])).toEqual(['X', '4', '2']);
            expect(getCellsFromScoresWithNoPadding([9, 1, 10])).toEqual(['9', '/', 'X']);
        });
        describe("Bowling Game calculator", function () {
            it('calculates simple game score correctly', function () {
                mockGame.forEach((frame, index) => {
                    expect(getScoreUpToFrame(mockGame, index)).toEqual(frame.expect);
                })
            })
            it('calculates game score correctly with a spare', function () {
                mockGameWithSpare.forEach((frame, index) => {
                    expect(getScoreUpToFrame(mockGameWithSpare, index)).toEqual(frame.expect);
                })
            })
            it('calculates game score correctly with a strike', function () {
                mockGameWithStrike.forEach((frame, index) => {
                    expect(getScoreUpToFrame(mockGameWithStrike, index)).toEqual(frame.expect);
                })
            })
            it('calculates game score correctly with a strike and spare', function () {
                mockGameWithStrikeAndSpare.forEach((frame, index) => {
                    expect(getScoreUpToFrame(mockGameWithStrikeAndSpare, index)).toEqual(frame.expect);
                })
            })
            it('calculates perfect game score correctly', function () {
                mockPerfectGame.forEach((frame, index) => {
                    expect(getScoreUpToFrame(mockPerfectGame, index)).toEqual(frame.expect);
                })
            })
            it('calculates frame number of pins correctly', function () {
                expect(getFramePinsLeft([4], 10)).toEqual(6);
                expect(getFramePinsLeft([2], 10)).toEqual(8);
            })
            it('calculates last frame number of pins correctly', function () {
                expect(getLastFramePinsLeft([4], 10)).toEqual(6);
                expect(getLastFramePinsLeft([10], 10)).toEqual(10);
                expect(getLastFramePinsLeft([4, 6], 10)).toEqual(10);
                expect(getLastFramePinsLeft([3, 4], 10)).toEqual(0);
                expect(getLastFramePinsLeft([10, 10], 10)).toEqual(10);
                expect(getLastFramePinsLeft([10, 10, 10], 10)).toEqual(0);
            })
        });

    });
});
