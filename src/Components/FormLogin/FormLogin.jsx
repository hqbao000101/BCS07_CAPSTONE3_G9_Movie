import { Input, message } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { userServ } from "../../services/userServices";
import { saveLocal } from "../../utils/localStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/userSlice";

const FormLogin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    validationSchema: yup.object({
      taiKhoan: yup.string().required("This field is required"),
      matKhau: yup
        .string()
        .required("This field is required")
        .min(3, "The length must be at least 3 letters"),
    }),

    onSubmit: (values) => {
      // console.log(values);
      userServ
        .login(values)
        .then((res) => {
          // ! check maLoaiKhachHang
          if (res.data.content.maLoaiNguoiDung === "KhachHang") {
            // console.log(res);
            // ! if logining successfully, save local and navigate user to the home page
            saveLocal("user", res.data.content);
            // ! when successfully calling data, we will send data to the redux as well
            dispatch(setUserData(res.data.content));

            // messageApi.success("Login successfully");
            // setTimeout(() => {
            //   res.data.content.maLoaiNguoiDung === "KhachHang"
            //     ? navigate("/")
            //     : navigate("/admin");
            // }, 1000);
            messageApi.success("Login successfully");
            setTimeout(() => {
              navigate("/");
            }, [1000]);
          } else {
            messageApi.error("This account is not suitable here");
          }
        })
        .catch((err) => {
          // console.log(err);
          messageApi.error(err.response.data.content);
        });
    },
  });

  return (
    <div>
      {contextHolder}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your account
          </label>
          {/* <input
          type="text"
          id="taiKhoan"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
          placeholder="Type your account..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        /> */}
          {/* <Input status="error" placeholder="Error" /> */}
          <Input
            type="text"
            id="taiKhoan"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            placeholder="Type your account..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={
              formik.errors.taiKhoan && formik.touched.taiKhoan ? "error" : ""
            }
          />
          {/* !!! vấn đề là ngay cả khi chưa đụng đến thẻ input khác thì nó vẫn check và hiện lỗi trên các input khác nên ở đây cần check xem người dùng có đang nhập input này dùng formik.touched */}
          {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
            <p className="mt-2 text-sm italic text-red-500">
              {formik.errors.taiKhoan}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <Input
            type="password"
            id="matKhau"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            onChange={formik.handleChange}
            placeholder="Type your password..."
            onBlur={formik.handleBlur}
            status={
              formik.errors.matKhau && formik.touched.matKhau ? "error" : ""
            }
          />
          {formik.errors.matKhau && formik.touched.matKhau ? (
            <p className="mt-2 text-sm italic text-red-500">
              {formik.errors.matKhau}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
