export const pointAnimation: Function = (
  elementId: string,
  startNumber: number,
  endNumber: number,
  speed: number = 1
) => {
  const element: HTMLElement | null = document.getElementById(elementId);
  if (!element) return;

  const animationRunning: boolean = JSON.parse(
    element.dataset.animationRunning ?? Boolean(false).toString()
  );

  if (animationRunning) return;

  element.dataset.animationRunning = Boolean(true).toString();

  pointManipulation(
    Math.abs(startNumber - endNumber) > 150 ? endNumber - 150 : startNumber,
    endNumber,
    element,
    speed
  );
};

export const pointManipulation: Function = (
  currentNumber: number,
  endNumber: number,
  element: HTMLElement,
  speed: number
) => {
  element.innerHTML = `${currentNumber}pt`;
  if (currentNumber === endNumber)
    return (element.dataset.animationRunning = Boolean(false).toString());
  if (currentNumber < endNumber) {
    setTimeout(function () {
      pointManipulation(currentNumber + 1, endNumber, element, speed);
    }, speed);
  } else {
    setTimeout(function () {
      pointManipulation(currentNumber - 1, endNumber, element, speed);
    }, speed);
  }
};

export const ROW_HEIGHT: number = 70;
export const generateRandomNumberFromInterval: Function = (
  min: number = 15000,
  max: number = 160000
) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const COLORS = {
  white: "#fff",
  sky_blue: "skyblue",
  dark_orange: "darkorange",
  light_gray: "lightgray",
  hot_pink: "hotpink",
  orange: "orange",
  red: "red",
};
