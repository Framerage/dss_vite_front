import React from "react";
import {useForm} from "react-hook-form";

import ImageAdder from "components/imageAdder";
import classes from "./indivOrderPage.module.css";

type ImageType = {fileBody: string; fileName: string; id: number};
interface IndivOrderFormData {
  orderDescrip: string | null;
  images: ImageType[];
}
const minDescripTextLength = 20;
const IndivOrderPage: React.FC = () => {
  const {register, handleSubmit, setValue, formState, watch} =
    useForm<IndivOrderFormData>({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      shouldFocusError: true,
      values: {
        orderDescrip: null,
        images: [],
      },
    });
  const orderDescripRequiredError =
    formState.errors.orderDescrip?.type === "required";
  const orderDescripLittleTextError =
    formState.errors.orderDescrip?.type === "minLength";

  const currentImgs = watch("images");

  const onCreateIndivOrder = (data: IndivOrderFormData) => {
    console.log(data, "form data");
  };
  const descripError = orderDescripRequiredError
    ? "Обязательно заполните это поле"
    : `Минимальное количество символов ${minDescripTextLength}`;
  return (
    <div className={classes.indivOrderContainer}>
      <form
        onSubmit={handleSubmit(onCreateIndivOrder)}
        style={{display: "flex", flexDirection: "column"}}
      >
        <span>Описание заказа</span>
        <textarea
          {...register("orderDescrip", {
            minLength: minDescripTextLength,
            required: true,
          })}
          name="orderDescrip"
          id="orderDescrip"
        />
        <span className={classes.errorReqText}>
          {!!orderDescripRequiredError || !!orderDescripLittleTextError
            ? descripError
            : ""}
        </span>

        <ImageAdder
          images={currentImgs}
          changeImages={(v: ImageType[]) => setValue("images", v)}
        />
        <button
          type="submit"
          style={{maxWidth: "100px", borderRadius: "10px", margin: "10px"}}
        >
          Отправить пожелания
        </button>
      </form>
    </div>
  );
};
export default IndivOrderPage;
