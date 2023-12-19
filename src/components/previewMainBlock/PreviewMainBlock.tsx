import React from "react";
import ImageSlider from "components/imageSlider/ImageSlider";
import cn from "classnames";
import {useInView} from "react-intersection-observer";
import classes from "./previewMainBlock.module.css";

interface PreaviewBlockProps {
  text: string;
  id: string;
  reverse?: boolean;
  images: string[];
}
const PreviewMainBlock: React.FC<PreaviewBlockProps> = ({
  text,
  id,
  reverse = false,
  images,
}) => {
  const {ref, inView} = useInView({
    threshold: 0,
  });
  return (
    <div id={id} className={classes.previewBlockContainer} ref={ref}>
      <div
        className={cn(classes.descripPoint, {
          [classes.activeLeftPoint]: inView,
        })}
      >
        {reverse ? <ImageSlider images={images} isImgFile /> : text}
      </div>
      <div
        className={cn(classes.examplePoint, {
          [classes.activeRightPoint]: inView,
        })}
      >
        {reverse ? text : <ImageSlider images={images} isImgFile />}
      </div>
    </div>
  );
};
export default PreviewMainBlock;
