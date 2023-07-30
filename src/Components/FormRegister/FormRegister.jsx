import { Input, message } from "antd";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { userServ } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      maNhom: "GP01",
      email: "",
      soDt: "",
    },
    onSubmit: async (values) => {
      try {
        await userServ.register(values);
        message.success("Registered successfully");
        setTimeout(() => {
          navigate("/login");
        }, [2000]);
      } catch (err) {
        message.error(err.response.data.content);
      }
    },
    validationSchema: yup.object({
      hoTen: yup.string().required("This field is required"),
      taiKhoan: yup.string().required("This field is required"),
      matKhau: yup
        .string()
        .required("This field is required")
        .min(3, "The length must be at least 3 letters"),
      nhapLaiMatKhau: yup
        .string()
        .required("This field is required")
        .oneOf([yup.ref("matKhau"), null], "Passwords must match"),
      email: yup
        .string()
        .required("This field is required")
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "The email is not valid"),
      soDt: yup
        .string()
        .required("This field is required")
        .matches(/^[0-9\-+]{9,15}$/, "The phone is not valid"),
    }),
  });
  return (
    <div>
      <h1 className="mb-10 text-3xl font-medium uppercase">
        <span className="font-semibold text-blue-500">Create </span>
        Account
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 grid-rows-3 gap-6 mb-10">
          <div>
            <label
              htmlFor="hoTen"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Full Name
            </label>
            <Input
              type="text"
              id="hoTen"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="Type your fullname..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={
                formik.errors.hoTen && formik.touched.hoTen ? "error" : ""
              }
            />
            {formik.errors.hoTen && formik.touched.hoTen ? (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.hoTen}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label
              htmlFor="taiKhoan"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Account Name
            </label>
            <Input
              type="text"
              id="taiKhoan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              onChange={formik.handleChange}
              placeholder="Type your account..."
              onBlur={formik.handleBlur}
              status={
                formik.errors.taiKhoan && formik.touched.taiKhoan ? "error" : ""
              }
            />
            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.taiKhoan}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <Input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="Type your email..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={
                formik.errors.email && formik.touched.email ? "error" : ""
              }
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.email}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <label
              htmlFor="soDt"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone Number
            </label>
            <Input
              type="text"
              id="soDt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              onChange={formik.handleChange}
              placeholder="Type your phone..."
              onBlur={formik.handleBlur}
              status={formik.errors.soDt && formik.touched.soDt ? "error" : ""}
            />
            {formik.errors.soDt && formik.touched.soDt ? (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.soDt}
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
              Your Password
            </label>
            <Input
              type="password"
              id="matKhau"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="Type your password..."
              onChange={formik.handleChange}
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
          <div>
            <label
              htmlFor="nhapLaiMatKhau"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Your Password
            </label>
            <Input
              type="password"
              id="nhapLaiMatKhau"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              onChange={formik.handleChange}
              placeholder="Retype your password..."
              onBlur={formik.handleBlur}
              status={
                formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau
                  ? "error"
                  : ""
              }
            />
            {formik.errors.nhapLaiMatKhau && formik.touched.nhapLaiMatKhau ? (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.nhapLaiMatKhau}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
