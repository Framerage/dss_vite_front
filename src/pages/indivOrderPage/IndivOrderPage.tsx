import React, {useEffect} from "react";
import {RegisterOptions, UseFormRegister, useForm} from "react-hook-form";
import Cookies from "js-cookie";

import ImageAdder from "components/imageAdder";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import cn from "classnames";
import {useAppDispatch} from "store/index";
import {fetchToCreateOrderRequest} from "store/modules/order/async-actions";
import {
  selectOrderCreating,
  selectOrderCreatingError,
  selectOrderCreatingIsLoading,
} from "store/modules/order/selectors";
import {resetOrderCreatingResult} from "store/modules/order/actions";
import classes from "./indivOrderPage.module.css";

type ImageType = {fileBody: string; fileName: string; id: number};
interface IndivOrderFormData {
  orderDescrip: string | null;
  specImgsOrder: ImageType[];
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
  const dispatch = useAppDispatch();
  const accS = Cookies.get("perAcTkn");
  const curUser = useSelector(selectUserData);

  const orderRequestResult = useSelector(selectOrderCreating);
  const orderRequestResultIsLoading = useSelector(selectOrderCreatingIsLoading);
  const orderRequestResultError = useSelector(selectOrderCreatingError);
  const isOrderSuccess = !!orderRequestResult?.success;

  const {register, handleSubmit, setValue, formState, watch} =
    useForm<IndivOrderFormData>({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      shouldFocusError: true,
      values: {
        orderDescrip: null,
        specImgsOrder: [],
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

  const currentImgs = watch("specImgsOrder");

  useEffect(() => {
    (isOrderSuccess || orderRequestResultError) &&
      dispatch(resetOrderCreatingResult());
    return () => {
      dispatch(resetOrderCreatingResult());
    };
  }, []);

  const onCreateIndivOrder = (data: IndivOrderFormData) => {
    const images = currentImgs.map(file => file.fileBody);
    const resultOrder = {
      ...data,
      userCart: [],
      totalPrice: 0,
      specImgsOrder: images,
      orderType: "custom",
    };
    if (accS) {
      dispatch(fetchToCreateOrderRequest({order: resultOrder, auth: accS}));
      setValue("city", "");
      setValue("name", "");
      setValue("email", "");
      setValue("orderDescrip", "");
      setValue("phoneNum", "");
      setValue("specImgsOrder", []);
    }
  };
  const descripError = orderDescripRequiredError
    ? "Обязательно заполните это поле"
    : `Минимальное количество символов ${minDescripTextLength}`;
  if (orderRequestResultError) {
    return (
      <div className={classes.successMessageBlock}>
        {orderRequestResultError}
      </div>
    );
  }
  if (isOrderSuccess) {
    return (
      <div className={classes.successMessageBlock}>
        {orderRequestResult.message}
      </div>
    );
  }
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
          changeImages={(v: ImageType[]) => setValue("specImgsOrder", v)}
        />
        <button type="submit" className={classes.completeBtn}>
          {orderRequestResultIsLoading ? "Loading ..." : "Отправить пожелания"}
        </button>
      </form>
    </div>
  );
};
export default IndivOrderPage;
