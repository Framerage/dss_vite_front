import React from "react";
import {RegisterOptions, UseFormRegister, useForm} from "react-hook-form";

import ImageAdder from "components/imageAdder";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import cn from "classnames";
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
const requiredErrText = "Данное поле необходимо заполнить";
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

  const nameRequiredError = formState.errors.name?.type === "required";
  const emailRequiredError = formState.errors.email?.type === "required";
  const phoneNumRequiredError = formState.errors.phoneNum?.type === "required";

  const currentImgs = watch("images");

  const onCreateIndivOrder = (data: IndivOrderFormData) => {
    // orderType:'custom'
    console.log(data, "form data");
  };
  const descripError = orderDescripRequiredError
    ? "Обязательно заполните это поле"
    : `Минимальное количество символов ${minDescripTextLength}`;
  return (
    <div className={classes.indivOrderContainer}>
      <form
        onSubmit={handleSubmit(onCreateIndivOrder)}
        className={classes.orderForm}
      >
        <div className={classes.formHeadWrapper}>
          <div className={classes.formHeadColumn}>
            <IndivOrderFormItem
              itemName="name"
              defaultValue={curUser?.name}
              itemPlaceHolder="введите свой ник"
              register={register}
              registerOprions={{required: true}}
              parentStyle={classes.formInputWrapper}
              childStyle={classes.formHeadInputItem}
              errorText={nameRequiredError ? requiredErrText : ""}
            />
            <IndivOrderFormItem
              itemName="email"
              defaultValue={curUser?.email}
              itemPlaceHolder="введите свою почту"
              register={register}
              registerOprions={{required: true}}
              childStyle={classes.formHeadInputItem}
              parentStyle={classes.formInputWrapper}
              errorText={emailRequiredError ? requiredErrText : ""}
            />
          </div>
          <div className={classes.formHeadColumn}>
            <IndivOrderFormItem
              itemName="phoneNum"
              itemPlaceHolder="+79991239977"
              register={register}
              childStyle={classes.formHeadInputItem}
              parentStyle={classes.formInputWrapper}
              registerOprions={{required: true}}
              errorText={phoneNumRequiredError ? requiredErrText : ""}
            />
            <IndivOrderFormItem
              itemName="city"
              itemPlaceHolder="введите свой город"
              register={register}
              childStyle={classes.formHeadInputItem}
              parentStyle={classes.formInputWrapper}
            />
          </div>
        </div>
        <div className={classes.formOrderDescripSection}>
          <span>Описание заказа</span>
          <textarea
            {...register("orderDescrip", {
              minLength: minDescripTextLength,
              required: true,
            })}
            name="orderDescrip"
            id="orderDescrip"
            className={cn(classes.formHeadInputItem, classes.orderDescripArea)}
          />
          <span className={classes.errorReqText}>
            {!!orderDescripRequiredError || !!orderDescripLittleTextError
              ? descripError
              : ""}
          </span>
        </div>

        <ImageAdder
          images={currentImgs}
          changeImages={(v: ImageType[]) => setValue("images", v)}
        />
        <button type="submit" className={classes.completeBtn}>
          Отправить пожелания
        </button>
      </form>
    </div>
  );
};
export default IndivOrderPage;
