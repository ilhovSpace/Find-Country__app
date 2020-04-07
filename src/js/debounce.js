export default function debounce(f, ms) {
  let isCooldown = false;
  return (...arg) => {
    if (isCooldown) return;
    f.apply(this, arg);
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
}
