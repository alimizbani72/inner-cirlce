const windowAvailable = () => {
  if (typeof window !== "undefined" && window.document && !!window.document.createElement) {
    return true;
  }
  return false;
};

export default windowAvailable;
