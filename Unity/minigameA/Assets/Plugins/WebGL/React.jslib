mergeInto(LibraryManager.library, {
  GameOver: function (waveCt,score) {
    try {
      window.dispatchReactUnityEvent("GameOver", waveCt, score);
    } catch (e) {
      console.warn("Failed to dispatch event");
    }
  },
});