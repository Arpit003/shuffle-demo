import React, { useState, useEffect, useCallback } from "react";
import { LEADER_BOARD_DATA } from "../Constants/Data";
import { DataItem } from "../Constants/Interface";
import { LeaderBoardWrapper } from "./LeaderBoard.style";
import {
  ROW_HEIGHT,
  generateRandomNumberFromInterval,
  pointAnimation,
} from "../Constants/constants";

const FIRST_THREE_ON_BOARD_STYLE_CLASS: string[] = ["first", "second", "third"];

let visibilityChange: string = "";
if (typeof document.hidden !== "undefined") {
  visibilityChange = "visibilitychange";
}

const LeaderBoard: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [leaderBoardInterval, setLeaderBoardInterval] = useState<
    NodeJS.Timeout | number
  >(0);

  const doShuffle = useCallback(() => {
    let newData: DataItem[] = [...LEADER_BOARD_DATA];
    let randomIndex = generateRandomNumberFromInterval(0, newData?.length - 1);
    let updatedBoardNumber = generateRandomNumberFromInterval();

    pointAnimation(
      `point-${newData[randomIndex].displayName}`,
      newData[randomIndex].score,
      updatedBoardNumber
    );
    newData[randomIndex].score = updatedBoardNumber;
    let sortedData = [...newData].sort(
      (last, current) => current?.score - last?.score
    );
    sortedData.forEach((sortedItem, sortedIndex) => {
      let da = newData.findIndex((item) => item.score === sortedItem.score);
      newData[da].top = sortedIndex * ROW_HEIGHT;
    });

    setData(newData);
  }, []);

  const updateBoard = useCallback(() => {
    let timeRef = setInterval(() => {
      doShuffle();
    }, 1000);
    setLeaderBoardInterval(timeRef);
  }, [doShuffle]);

  const setInitSortedPoints: Function = useCallback((boardData: DataItem[]) => {
    let sortByPoint = [...boardData]
      .sort((last, current) => current?.score - last?.score)
      .map((item, index) => ({
        ...item,
        top: ROW_HEIGHT * index,
      }));
    setData(sortByPoint);
  }, []);

  useEffect(() => {
    updateBoard();
  }, [updateBoard]);

  useEffect(() => {
    setInitSortedPoints(LEADER_BOARD_DATA);
  }, [setInitSortedPoints]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document?.hidden) return clearInterval(leaderBoardInterval);
      updateBoard();
    };

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, [leaderBoardInterval, updateBoard]);

  return (
    <LeaderBoardWrapper>
      <div className="parent">
        {data.map((item: DataItem, index: number) => (
          <div
            className={`row`}
            key={index}
            style={{
              transform: `translate(0, ${item?.top}px)`,
            }}
          >
            <div
              className={`data ${
                data?.length - 1 === (item?.top || 0) / ROW_HEIGHT &&
                "remove-border-color"
              }`}
            >
              <div
                className={`sr-no ${
                  FIRST_THREE_ON_BOARD_STYLE_CLASS[
                    (item?.top || 0) / ROW_HEIGHT
                  ]
                }`}
              >
                {(item?.top || 0) / ROW_HEIGHT + 1}
              </div>
              <div className="image" />
              <div className="name">{item?.displayName}</div>
              <div className="points" id={`point-${item?.displayName}`}>
                {item?.score}pt
              </div>
            </div>
          </div>
        ))}
      </div>
    </LeaderBoardWrapper>
  );
};

export default LeaderBoard;
