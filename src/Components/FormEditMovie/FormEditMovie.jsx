import React, { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Switch, message } from "antd";
import { useFormik } from "formik";
import { CaretRightOutlined, UploadOutlined } from "@ant-design/icons";
import * as yup from "yup";
import moment from "moment/moment";
import dayjs from "dayjs";
import { movieServ } from "../../services/movieServices";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../redux/slices/movieSlice";
import { useDispatch } from "react-redux";

const FormEditMovie = ({ selectedMovie }) => {
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const currentDate = moment(selectedMovie.ngayKhoiChieu).format("DD/MM/YYYY");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      maPhim: selectedMovie.maPhim,
      tenPhim: selectedMovie.tenPhim,
      trailer: selectedMovie.trailer,
      moTa: selectedMovie.moTa,
      ngayKhoiChieu: dayjs(currentDate, "DD/MM/YYYY"),
      sapChieu: selectedMovie.sapChieu,
      dangChieu: selectedMovie.dangChieu,
      hot: selectedMovie.hot,
      maNhom: "GP01",
      danhGia: selectedMovie.danhGia,
      hinhAnh: selectedMovie.hinhAnh,
    },
    onSubmit: async (values) => {
      try {
        let formData = new FormData();
        for (let key in values) {
          formData.append(key, values[key]);
        }
        await movieServ.updateMovies(formData);
        message.success("Updated successfully");
        dispatch(getAllMovies());
        setTimeout(() => {
          navigate("/admin/movie");
          setAdd(false);
        }, [1000]);
      } catch (err) {
        message.error(err.response.data.content);
        setAdd(false);
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
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2">
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
          initialValues={values}
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
          <Form.Item label="Premiere" name="ngayKhoiChieu">
            <DatePicker onChange={handleChangeDatePicker} />
          </Form.Item>
          <Form.Item label="Showing Now">
            <Switch
              onChange={handleChangeSwitch("dangChieu")}
              defaultChecked={values.dangChieu}
            />
          </Form.Item>
          <Form.Item label="Coming Soon">
            <Switch
              onChange={handleChangeSwitch("sapChieu")}
              defaultChecked={values.sapChieu}
            />
          </Form.Item>
          <Form.Item label="Hot">
            <Switch
              onChange={handleChangeSwitch("hot")}
              defaultChecked={values.hot}
            />
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
          <Form.Item
            label={<CaretRightOutlined />}
            colon={false}
            className="mt-8"
          >
            <button
              type="submit"
              className="px-5 py-2 mb-3 text-white duration-500 bg-[#70a1ff] rounded-lg hover:bg-[#1e90ff] disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={add ? true : false}
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-full lg:w-1/2">
        <img
          src={img === "" ? values.hinhAnh : img}
          alt="Current Movie Pic"
          width={"80%"}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default FormEditMovie;
