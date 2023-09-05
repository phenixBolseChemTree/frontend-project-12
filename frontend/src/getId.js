const getId = (() => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
})();

export default getId;
