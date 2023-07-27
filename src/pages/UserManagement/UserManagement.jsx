import React, { useEffect, useState } from "react";
// import { userServ } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, setCurrentUser } from "../../redux/slices/userSlice";
import TableUser from "../../Components/TableUser/TableUser";
import { Drawer } from "antd";
import FormAddUser from "../../Components/FormAddUser/FormAddUser";

const UserManagement = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // userServ
    //   .getAllUsers()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ! một hàm vừa gọi dữ liệu vừa dispatch lên store
  // ! redux không cho phép gọi bất đồng bộ trên reducer
  // ! redux-thunk là một middleware cho phép xử lý trước khi dispatch tới store
  // ! redux-sage
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium uppercase">
        <span className="text-blue-500">User </span>
        Management
      </h1>
      <button
        className="px-5 py-2 mb-3 text-white duration-500 bg-green-500 rounded-lg hover:bg-green-600"
        onClick={() => {
          showDrawer();
          dispatch(setCurrentUser());
        }}
      >
        Add new users
      </button>
      <TableUser showDrawer={showDrawer} />
      <Drawer
        title={currentUser ? "Edit the user" : "Add new users"}
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
      >
        <FormAddUser closeDrawer={onClose} />
      </Drawer>
    </>
  );
};

export default UserManagement;
