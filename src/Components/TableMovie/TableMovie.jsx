import React, { useEffect, useState } from "react";
import { Popconfirm, Space, Table, message, Input } from "antd";
import { movieServ } from "../../services/movieServices";
import "./TableMovie.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const TableMovie = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [movie, setMovie] = useState([]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const confirm = (e) => {
    message.success("Action confirmed");
  };

  const cancel = (e) => {
    message.error("Action canceled");
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, _, index) => (
        <img
          src={text}
          alt={`Movie ${index}`}
          className="object-cover h-48 w-36"
        />
      ),
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "moTa",
      key: "moTa",
      render: (text) => <p className="whitespace-normal line-clamp-5">{text}</p>,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      ellipsis: true,
      render: (_, record) => (
        <Space size="small">
          <EditOutlined className="mr-4 text-2xl text-blue-400 duration-500 cursor-pointer hover:text-blue-600" />
          <Popconfirm
            title="Delete Users"
            description="Are you sure to delete this user?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <DeleteOutlined className="text-2xl text-red-400 duration-500 cursor-pointer hover:text-red-600" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getAllMovies = async () => {
    const movies = await movieServ.getAllMovies();
    setMovie(movies.data.content);
  };

  useEffect(() => {
    getAllMovies();
  }, []);
  console.log(movie);
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <button className="px-5 py-2 mb-3 text-white duration-500 bg-green-500 rounded-lg hover:bg-green-600">
          Add movies
        </button>
      </Space>
      <Search
        id="movie__search"
        placeholder="Input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="mb-3"
      />
      <Table
        id="movie__table"
        rowKey="maPhim"
        columns={columns}
        dataSource={movie}
        onChange={handleChange}
        scroll={{ x: 1150 }}
      />
    </>
  );
};

export default TableMovie;
