const translateCardThemes = {
  neon: "Неоновый декор",
  plywood: "Резка по дереву",
  laserEngr: "Лазерная гравировка",
  furniture: "Фурнитура/мебель",
  volPrinter: "3D-принтер",
  reliefPics: "Рельефные картины",
  some: "прочие",
};

export const translateCardTheme = (theme: string) =>
  translateCardThemes[theme as keyof typeof translateCardThemes];
