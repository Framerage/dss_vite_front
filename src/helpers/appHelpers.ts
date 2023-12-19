export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
export const splitBase64String = (str: string) => str.split(";base64,")[1];

export const generateFileData = async ({
  fileBody,
  fileName,
}: {
  fileBody: File;
  fileName: string;
}) => {
  const attachmentFileBody = await fileToBase64(fileBody);
  return {
    fileName,
    fileBody: splitBase64String(String(attachmentFileBody)),
  };
};
export const setBase64Image = (imageFormat: string, imageSrc: string) =>
  `data:image/${imageFormat};base64, ${imageSrc}`;

export const formatDateToLocale = (date: string) => {
  return new Date(date).toLocaleString();
};
