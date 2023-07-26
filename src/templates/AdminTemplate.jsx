import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
  // UploadOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { getLocal, removeLocal } from "../utils/localStore";
import "./AdminTemplate.style.scss";

const { Header, Sider, Content } = Layout;

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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <i className="fa-solid fa-house-chimney-user"></i>,
              label: <NavLink to="/admin/user">User</NavLink>,
            },
            {
              key: "2",
              icon: <i className="fa-solid fa-ticket"></i>,
              label: <NavLink to="/admin/movie">Movie</NavLink>,
            },
            {
              key: "3",
              icon: <i className="fa-solid fa-masks-theater"></i>,
              label: <NavLink to="/admin/show-time">Show Time</NavLink>,
            },
          ]}
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
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
