import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { userServ } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { saveLocal } from "../../utils/localStore";
import { message } from "antd";

const FormLoginAdmin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      userServ
        .login(values)
        .then((res) => {
          // ! check condition maLoaiNguoiDung before logging into the admin page
          if (res.data.content.maLoaiNguoiDung === "QuanTri") {
            messageApi.success("Login successfully");
            saveLocal("user", res.data.content);
            setTimeout(() => {
              navigate("/admin");
            }, [1000]);
          } else {
            messageApi.error("You are not allowed to access this page !");
            localStorage.removeItem("user");
            setTimeout(() => {
              window.location.href = "http://localhost:3000";
            }, [1000]);
          }
        })
        .catch((err) => {
          messageApi.error(err.response.data.content);
          formik.resetForm({
            values: {
              taiKhoan: "",
              matKhau: "",
            },
          });
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("This field is required"),
      matKhau: Yup.string().required("This field is required"),
    }),
  });

  return (
    <div>
      {contextHolder}
      <h2 className="text-2xl font-bold">Login Admin</h2>
      <form className="w-2/3 space-y-5" onSubmit={formik.handleSubmit}>
        <div className="mt-5">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tài khoản
          </label>
          <input
            type="text"
            id="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập họ tên"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taiKhoan}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="text-sm italic text-red-500">
              {formik.errors.taiKhoan}
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="matKhau"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nhập mật khẩu"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matKhau}
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="text-sm italic text-red-500">
              {formik.errors.matKhau}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white uppercase bg-green-700 rounded"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default FormLoginAdmin;
