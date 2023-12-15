import {CatalogCardNesting} from "typings/catalogCards";
import instance from "./api";

export const getCatalogCards = async () => {
  const response = await instance("/cards");
  if (response.status !== 200) {
    console.error(response, "resp");
    return null;
  }
  return response.data;
};
export const createNewCatalogCard = async ({
  card,
  auth,
}: {
  card: CatalogCardNesting;
  auth: string;
}) => {
  const response = await instance.post(
    "/cards",
    {...card},
    {headers: {Authorization: auth}},
  );
  if (response.status !== 200) {
    console.error(response, "resp");
    return response.data;
  }
  return response.data;
};

export const getCardFullDescrip = async (id: string) => {
  const response = await instance(`/cards/${id}`);
  if (response.status !== 200) {
    console.error(response, "resp");
    return null;
  }
  return response.data;
};

export const editCatalogCard = async (card: CatalogCardNesting) => {
  const response = await instance.patch(`/cards/${card._id}`, card);
  if (response.status !== 200) {
    console.error(response, "resp");
    return null;
  }
  return response.data;
};
export const deleteCatalogCard = async ({
  id,
  auth,
}: {
  id: string;
  auth: string;
}) => {
  const response = await instance.delete(`/cards/${id}`, {
    headers: {Authorization: auth},
  });
  if (response.status !== 200) {
    console.error(response, "resp");
    return response.data;
  }
  return response.data;
};
