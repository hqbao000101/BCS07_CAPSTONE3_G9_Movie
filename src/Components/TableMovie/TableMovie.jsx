import React, { useEffect, useState } from "react";
import { Popconfirm, Space, Table, message, Input } from "antd";
import { movieServ } from "../../services/movieServices";
import "./TableMovie.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import removeAccents from "../../utils/formatWord";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovies,
  setMovies,
  setSelectedMovie,
} from "../../redux/slices/movieSlice";

const TableMovie = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [initialList, setInitialList] = useState([]);
  const navigate = useNavigate();
  const allMovies = useSelector((state) => state.movie.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { Search } = Input;
  const onSearch = (value) => {
    setInitialList(allMovies);
    if (value !== "") {
      let formattedValue = removeAccents(value);
      let searchMovies = initialList.filter((item) => {
        let formattedName = removeAccents(item.tenPhim);
        return formattedName.includes(formattedValue);
      });
      dispatch(setMovies(searchMovies));
    }
  };

  const onChange = (e) => {
    if (e.target.value === "") {
      dispatch(setMovies(initialList));
    }
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
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
      render: (text) => (
        <p className="whitespace-normal line-clamp-5">{text}</p>
      ),
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      ellipsis: true,
      render: (_, record) => (
        <Space size="small">
          <EditOutlined
            className="mr-4 text-2xl text-blue-400 duration-500 cursor-pointer hover:text-blue-600"
            onClick={async () => {
              try {
                const details = await movieServ.getMovieDetails(record.maPhim);
                dispatch(setSelectedMovie(details.data.content));
                navigate(`/admin/movie/edit/${record.maPhim}`);
              } catch (err) {}
            }}
          />
          <Popconfirm
            title="Delete Movie"
            description="Are you sure to delete this movie?"
            onConfirm={async () => {
              try {
                await movieServ.deleteMovies(record.maPhim);
                message.success("Deleted successfully");
                dispatch(getAllMovies());
              } catch (err) {
                message.error(err.response.data.content);
              }
            }}
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

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <button
          className="px-5 py-2 mb-3 text-white duration-500 bg-green-500 rounded-lg hover:bg-green-600"
          onClick={() => {
            navigate("/admin/movie/add");
          }}
        >
          Add movies
        </button>
      </Space>
      <Search
        id="movie__search"
        placeholder="Input search movies..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        className="mb-3"
        onChange={onChange}
      />
      <Table
        id="movie__table"
        rowKey="maPhim"
        columns={columns}
        dataSource={allMovies}
        onChange={handleChange}
        scroll={{ x: 1150 }}
      />
    </>
  );
};

export default TableMovie;
