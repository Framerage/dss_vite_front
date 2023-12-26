import React from "react";
import {RegisterOptions, UseFormRegister, useForm} from "react-hook-form";

import ImageAdder from "components/imageAdder";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import classes from "./indivOrderPage.module.css";

type ImageType = {fileBody: string; fileName: string; id: number};
interface IndivOrderFormData {
  orderDescrip: string | null;
  images: ImageType[];
  email: string;
  name: string;
  phoneNum: string;
  city: string;
}
interface IndivOrderFormItemProps {
  itemName: keyof IndivOrderFormData;
  inputType?: string;
  itemPlaceHolder?: string;
  parentStyle?: string;
  childStyle?: string;
  errorText?: string;
  defaultValue?: string;
  register: UseFormRegister<IndivOrderFormData>;
  registerOprions?:
    | RegisterOptions<IndivOrderFormData, keyof IndivOrderFormData>
    | undefined;
}
const IndivOrderFormItem: React.FC<IndivOrderFormItemProps> = ({
  register,
  itemName,
  itemPlaceHolder,
  parentStyle,
  childStyle,
  errorText,
  defaultValue,
  registerOprions,
  inputType = "text",
}) => {
  return (
    <div className={parentStyle}>
      <input
        className={childStyle}
        type={inputType}
        {...register(itemName, {...registerOprions})}
        name={itemName}
        placeholder={itemPlaceHolder || ""}
        defaultValue={defaultValue}
      />
      {errorText && <span>{errorText}</span>}
    </div>
  );
};
const minDescripTextLength = 20;

const IndivOrderPage: React.FC = () => {
  const curUser = useSelector(selectUserData);
  const {register, handleSubmit, setValue, formState, watch} =
    useForm<IndivOrderFormData>({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      shouldFocusError: true,
      values: {
        orderDescrip: null,
        images: [],
        email: curUser?.email || "",
        name: curUser?.name || "",
        phoneNum: "",
        city: "",
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
        <div>
          <div>
            <IndivOrderFormItem
              itemName="name"
              defaultValue={curUser?.name}
              itemPlaceHolder="введите свой ник"
              register={register}
            />
            <IndivOrderFormItem
              itemName="email"
              defaultValue={curUser?.email}
              itemPlaceHolder="введите свою почту"
              register={register}
            />
          </div>
          <div>
            <IndivOrderFormItem
              itemName="phoneNum"
              itemPlaceHolder="введите номер телефона"
              register={register}
            />
            <IndivOrderFormItem
              itemName="city"
              itemPlaceHolder="введите свой город"
              register={register}
            />
          </div>
        </div>
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
