import React, { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Switch, message } from "antd";
import { useFormik } from "formik";
import {
  FolderViewOutlined,
  EllipsisOutlined,
  CaretRightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import * as yup from "yup";
import { movieServ } from "../../services/movieServices";
import { useNavigate } from "react-router-dom";

const FormAddMovie = () => {
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 5,
      hinhAnh: {},
    },
    onSubmit: async (values) => {
      setAdd(true);
      try {
        let formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        await movieServ.addMovies(formData);
        message.success("Added a new movie");
        setAdd(false);
        setTimeout(() => {
          navigate("/admin/movie");
        }, [2000]);
      } catch (error) {
        message.error(error.response.data);
      }
    },
    validationSchema: yup.object({
      tenPhim: yup.string().required("This field is required"),
      trailer: yup.string().required("This field is required"),
      moTa: yup.string().required("This field is required"),
    }),
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = value.format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImg(e.target.result);
    };
    formik.setFieldValue("hinhAnh", file);
  };

  const { handleSubmit, handleChange, values, handleBlur } = formik;

  return (
    <Form
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      size="large"
      style={{
        maxWidth: 600,
        margin: "auto",
      }}
      onSubmitCapture={handleSubmit}
    >
      <Form.Item label="Movie Name">
        <Input
          onChange={handleChange}
          value={values.tenPhim}
          name="tenPhim"
          status={
            formik.errors.tenPhim && formik.touched.tenPhim ? "error" : ""
          }
          onBlur={handleBlur}
        />
        {formik.errors.tenPhim && formik.touched.tenPhim ? (
          <p className="mt-2 text-sm italic text-red-500">
            {formik.errors.tenPhim}
          </p>
        ) : (
          ""
        )}
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          onChange={handleChange}
          value={values.trailer}
          name="trailer"
          status={
            formik.errors.trailer && formik.touched.trailer ? "error" : ""
          }
          onBlur={handleBlur}
        />
        {formik.errors.trailer && formik.touched.trailer ? (
          <p className="mt-2 text-sm italic text-red-500">
            {formik.errors.trailer}
          </p>
        ) : (
          ""
        )}
      </Form.Item>
      <Form.Item label="Description">
        <Input
          onChange={handleChange}
          value={values.moTa}
          name="moTa"
          status={formik.errors.moTa && formik.touched.moTa ? "error" : ""}
          onBlur={handleBlur}
        />
        {formik.errors.moTa && formik.touched.moTa ? (
          <p className="mt-2 text-sm italic text-red-500">
            {formik.errors.moTa}
          </p>
        ) : (
          ""
        )}
      </Form.Item>
      <Form.Item label="Premiere">
        <DatePicker onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Showing Now">
        <Switch onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Coming Soon">
        <Switch onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch onChange={handleChangeSwitch("hot")} />
      </Form.Item>
      <Form.Item label="Rating">
        <InputNumber
          min="0"
          max="10"
          onChange={(value) => {
            formik.setFieldValue("danhGia", value);
          }}
          value={formik.values.danhGia}
        />
        <p className="mt-2 text-sm italic text-gray-400">
          * Rating should be between 0 and 10
        </p>
      </Form.Item>
      <Form.Item label="Image">
        <input
          id="inputFile"
          type="file"
          name="hinhAnh"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleChangeFile}
          style={{ display: "none" }}
        />
        <label
          htmlFor="inputFile"
          className="flex justify-center items-center cursor-pointer p-2 border rounded-lg  hover:border-blue-500 duration-500 hover:text-blue-500 w-[50%]"
        >
          <UploadOutlined />
          <span className="ml-2">Click to Upload</span>
        </label>
      </Form.Item>
      <Form.Item label={<FolderViewOutlined />}>
        {img ? (
          <img
            src={img}
            alt="Movie Banner"
            className="object-cover"
            style={{ width: "400px", height: "300px" }}
          />
        ) : (
          <EllipsisOutlined />
        )}
      </Form.Item>
      <Form.Item label={<CaretRightOutlined />} colon={false} className="mt-8">
        <button
          type="submit"
          className="px-5 py-2 mb-3 text-white duration-500 bg-[#70a1ff] rounded-lg hover:bg-[#1e90ff] disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={add ? true : false}
        >
          Create
        </button>
      </Form.Item>
    </Form>
  );
};

export default FormAddMovie;
