import styled from "styled-components";
import { COLORS, ROW_HEIGHT } from "../Constants/constants";

export const LeaderBoardWrapper = styled.div`
  .parent {
    position: relative;
    height: 80vh;
    overflow: hidden;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 90%;
    border-radius: 15px;
    padding: 10px 0 0;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);

    @media only screen and (max-width: 600px) {
      width: 95%;
    }

    .row {
      background-color: ${COLORS.white};
      transition: 0.6s all;
      height: ${ROW_HEIGHT - 1}px;
      position: absolute;
      width: 100%;
      z-index: 10;

      .data {
        border-bottom: 1px solid ${COLORS.light_gray};
        gap: 10px;
        display: flex;
        align-items: center;
        margin: 0 80px;
        height: 100%;

        @media only screen and (max-width: 600px) {
          margin: 0 20px;
        }

        &.remove-border-color {
          border-bottom-color: transparent;
        }

        .sr-no {
          height: 30px;
          width: 30px;
          background-color: ${COLORS.sky_blue};
          color: ${COLORS.white};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;

          &.first {
            background-color: ${COLORS.red};
          }
          &.second {
            background-color: ${COLORS.dark_orange};
          }
          &.third {
            background-color: ${COLORS.orange};
          }
        }
      }
      .image {
        background-color: ${COLORS.light_gray};
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: 2px solid white;
      }
      .name {
        font-size: 18px;
      }
      .points {
        margin: 0 0 0 auto;
        color: ${COLORS.hot_pink};
        font-size: 18px;
      }
    }
  }
`;
