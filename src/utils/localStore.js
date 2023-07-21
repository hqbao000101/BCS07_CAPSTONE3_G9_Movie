export const saveLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

export const getLocal = (key) => {
  const value = localStorage.getItem(key);
  // ! Khi parse xong co 2 truong hop xay ra, mot la co du lieu, hai se la null neu khong co du lieu
  let userData = JSON.parse(value) ? JSON.parse(value) : "";
  return userData;
}