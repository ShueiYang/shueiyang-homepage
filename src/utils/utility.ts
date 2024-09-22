export function scrollAfterLoad() {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
}

export function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}
