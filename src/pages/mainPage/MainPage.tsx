import React from "react";
import SvgFrame from "assets/images/svgFrame.svg";
// import PreviewCard from "components/previewCard/PreviewCard";
// import PreviewMainBlock from "components/previewMainBlock/PreviewMainBlock";

import PrintHisImg1 from "assets/images/printerHistory/print1.jpg";
import PrintHisImg3 from "assets/images/printerHistory/print3.jpg";

import NeonHisImg1 from "assets/images/neonHistory/neon1.jpeg";
import NeonHisImg2 from "assets/images/neonHistory/neon2.jpg";
import NeonHisImg3 from "assets/images/neonHistory/neon3.jpg";

import FurnHisImg1 from "assets/images/furnitureHistory/furn1.jpg";
import FurnHisImg2 from "assets/images/furnitureHistory/furn2.jpg";
import FurnHisImg3 from "assets/images/furnitureHistory/furn3.jpg";
import FurnHisImg4 from "assets/images/furnitureHistory/furn4.jpg";
import FurnHisImg5 from "assets/images/furnitureHistory/furn5.jpg";

import classes from "./mainPage.module.css";
import {
  FURNITURE_HISTORY,
  NEON_HISTORY,
  VOL_PRINTERS_HISTORY,
} from "./constants";

const previewCards = [
  {
    img: SvgFrame,
    text: "Домашний комфорт, полезная и необычная фурнитура/мебель",
    link: "art-furniture",
  },

  {
    img: SvgFrame,
    text: "Креативный неоновый декор, DIY, неоновые лампы",
    link: "art-neon",
    isCircle: true,
  },
  {
    img: SvgFrame,
    text: "Креативные 3D модели",
    link: "art-printers",
  },
];
const previewContent = [
  {
    text: FURNITURE_HISTORY,
    id: "art-furniture",
    images: [FurnHisImg1, FurnHisImg2, FurnHisImg3, FurnHisImg4, FurnHisImg5],
  },
  {
    text: NEON_HISTORY,
    id: "art-neon",
    images: [NeonHisImg1, NeonHisImg2, NeonHisImg3],
    reverse: true,
  },
  {
    text: VOL_PRINTERS_HISTORY,
    id: "art-printers",
    images: [PrintHisImg1, PrintHisImg3],
  },
];
const MainPage: React.FC = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainContent}>
        <div className={classes.appPreview}>
          {/* {previewCards.map(card => (
            <PreviewCard
              key={card.text}
              imgUrl={card.img}
              contentText={card.text}
              isCircle={card.isCircle}
              link={card.link}
            />
          ))} */}
        </div>
        <div className={classes.appPreviewBlocks}>
          {/* {previewContent.map(block => (
            <PreviewMainBlock
              text={block.text}
              id={block.id}
              key={block.id}
              images={block.images}
              reverse={block.reverse}
            />
          ))} */}
        </div>

        <div
          onClick={() => window.scrollTo(0, 0)}
          className={classes.scrollBtn}
        >
          Вверх&nbsp;&#8593;
        </div>
      </div>
    </div>
  );
};
export default MainPage;
