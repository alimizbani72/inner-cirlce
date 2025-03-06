const windowAvailable = !!(
  typeof window !== 'undefined' &&
  window.document &&
  !!window.document.createElement
);

export default windowAvailable;
