const CATEGORY_HUES = {
  technology: 222,
  academic: 165,
  culture: 292,
  arts: 322,
  sports: 140,
  social: 190,
};

export function getClubHue(club) {
  const hue = Number(club.hue);
  if (Number.isFinite(hue) && hue >= 0 && hue <= 360) return hue;
  return CATEGORY_HUES[(club.category || "").toLowerCase()] ?? 262;
}
