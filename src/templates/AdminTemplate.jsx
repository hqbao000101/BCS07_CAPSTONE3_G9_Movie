import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Divider } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { getLocal, removeLocal } from "../utils/localStore";
import "./AdminTemplate.style.scss";

const { Header, Sider, Content, Footer } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const menuItems = [
  getItem(
    <NavLink to="/admin">User</NavLink>,
    "1",
    <i className="fa-solid fa-house-chimney-user"></i>,
    null
  ),
  getItem("Movie", "2", <i className="fa-solid fa-ticket"></i>, [
    getItem(
      <NavLink to="/admin/movie">Movie List</NavLink>,
      "2.1",
      <i className="fa-solid fa-list"></i>
    ),
    getItem(
      <NavLink to="/admin/movie/add">Add Movie</NavLink>,
      "2.2",
      <i className="fa-regular fa-calendar-plus"></i>
    ),
  ]),
  getItem(
    <NavLink to="/admin/show-time">Show Time</NavLink>,
    "3",
    <i className="fa-solid fa-masks-theater"></i>,
    null
  ),
];

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [admin, setAdmin] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // ! Dropdown list
  const items = [
    {
      icon: <UserOutlined />,
      label: "My account",
      key: "0",
    },
    {
      icon: <SettingOutlined />,
      label: "Setting",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      icon: <LogoutOutlined />,
      label: (
        <NavLink
          to="/admin-login"
          onClick={() => {
            removeLocal("user");
          }}
        >
          Log out
        </NavLink>
      ),
      key: "3",
    },
  ];

  // ! Khi người dùng không phải là quản trị sẽ đá về trang chủ hoặc bất kì trang nào mình muốn
  useEffect(() => {
    // ! gọi dữ liệu từ local lên
    const user = getLocal("user");
    setAdmin(user.hoTen);
    // ! một là không có dữ liệu
    // ! hai là lấy lên mà mã loại khách hàng không phải là quản trị
    if (user) {
      if (user.maLoaiNguoiDung !== "QuanTri") {
        window.location.href = "https://www.google.com.vn";
      }
    } else {
      window.location.href = "https://www.google.com.vn";
    }
  }, []);

  const firstLetter = (string) => {
    if (string) {
      let strArr = string.split("");
      return strArr[0].toUpperCase();
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className={`flex items-center my-3 demo-logo-vertical ${
            collapsed ? "" : "ms-3"
          }`}
        >
          <img
            src="../imgs/favicon.png"
            alt="Logo"
            className={collapsed ? "w-full px-4" : "w-1/3"}
          />
          {collapsed ? <></> : <h1 className="text-2xl text-white">Movie</h1>}
        </div>
        <Divider className="mt-0 mb-4 bg-white bg-opacity-70" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div
                id="admin__user"
                className="flex items-center pr-10 cursor-pointer"
              >
                <div id="admin__logo">{firstLetter(admin)}</div>
                <p className="ml-3">{admin}</p>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{ textAlign: "right" }}
          className="p-6 font-bold uppercase bg-white"
        >
          <span className="text-[#1e90ff]">Cybersoft Movie Project</span> ©2023
          Created by <span>G9 | BCS07</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
