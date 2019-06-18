// @flow

export default (callback: () => any) => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      callback();
    }
  });
  window.addEventListener("focus", callback);
};
