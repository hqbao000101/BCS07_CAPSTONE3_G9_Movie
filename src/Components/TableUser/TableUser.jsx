import React from "react";
import { Popconfirm, Space, Table, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userServ } from "../../services/userServices";
import { getAllUsers } from "../../redux/slices/userSlice";
import "./TableUser.scss";

// todo: need --> id, name, email, phone number, userType, account, action
const TableUser = ({ showDrawer }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  // console.log(users);

  const cancel = (e) => {
    message.error("Action canceled");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
      align: "center",
    },
    {
      title: "Phone number",
      dataIndex: "soDT",
      key: "soDT",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      align: "center",
      // ! help to custom data in columns
      /*
      ! text chứa giá trị của thuộc tính đó trong data
      ! record chứa các phần tử trong mảng data
      ! index là vị trí của phần tử trong mảng data
      */
      render: (text) =>
        text === "QuanTri" ? (
          <Tag color="volcano">Admin</Tag>
        ) : (
          <Tag color="blue">Customer</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Delete Users"
            description="Are you sure to delete this user?"
            onConfirm={() => {
              userServ
                .deleteUsers(record.taiKhoan)
                .then(() => {
                  message.success("Successfully Delete");
                  dispatch(getAllUsers());
                })
                .catch(() => {
                  message.error("Something is wrong");
                });
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <button
              className="px-5 py-2 text-white duration-500 bg-red-500 rounded-lg hover:bg-red-600"
              // ! sẽ sửa lại thêm một popconfirm vào để hỏi người dùng có muốn xóa hay không và thêm thông báo khi xóa thành công cũng như thất bại
            >
              Del
            </button>
          </Popconfirm>

          <button
            onClick={() => {
              showDrawer();
            }}
            className="px-5 py-2 text-white duration-500 bg-yellow-400 rounded-lg hover:bg-yellow-500"
          >
            Edit
          </button>
        </Space>
      ),
    },
  ];

  let newUsers = users.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  // ! When using the Table component of antd, it should have the "rowKey" attribute which will receive the key name of columns
  return (
    <Table
      columns={columns}
      dataSource={newUsers}
      rowKey="id"
      scroll={{ x: 1150 }}
    />
  );
};

export default TableUser;
