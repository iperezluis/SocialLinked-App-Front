import { animateScroll } from "react-scroll";

export const ScrollToBottom = (id: string) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
  });
};
export const ScrollToBottomAnimation = (id: string) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 250,
  });
};
