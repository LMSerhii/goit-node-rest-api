export const bodyValidate = (name, email, phone) => {
  const newObj = {};

  if (name !== undefined) {
    newObj.name = name;
  }
  if (email !== undefined) {
    newObj.email = email;
  }
  if (phone !== undefined) {
    newObj.phone = phone;
  }

  return newObj;
};
