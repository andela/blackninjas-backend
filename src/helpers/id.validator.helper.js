const idValidation = (id) => {
  if (!/[0-9]/g.test(id)) {
    return false;
  }
  return true;
};

export default idValidation;
