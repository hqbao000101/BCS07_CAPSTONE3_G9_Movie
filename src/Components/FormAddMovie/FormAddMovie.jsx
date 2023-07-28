import React from "react";
import { DatePicker, Form, Input, InputNumber, Switch } from "antd";

const FormAddMovie = () => {
  return (
    <Form
      labelCol={{
        span: 4,
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
    >
      <Form.Item label="Movie Name">
        <Input name="tenPhim" />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" />
      </Form.Item>
      <Form.Item label="Description">
        <Input name="moTa" />
      </Form.Item>
      <Form.Item label="Premiere">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Now Showing">
        <Switch />
      </Form.Item>
      <Form.Item label="Coming Soon">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Rating">
        <InputNumber min="0" max="5" />
      </Form.Item>
      <Form.Item label="Image">
        <input type="file" name="hinhAnh" />
      </Form.Item>
      <Form.Item
        label={
          <button
            type="button"
            className="px-5 py-2 text-white duration-500 bg-red-400 rounded-md hover:bg-red-500"
            onClick={() => {
              console.log("Reset form...");
            }}
          >
            Reset
          </button>
        }
        colon={false}
        className="mt-8"
      >
        <button
          type="submit"
          className="px-5 py-2 mb-3 text-white duration-500 bg-[#70a1ff] rounded-lg hover:bg-[#1e90ff]"
        >
          Create
        </button>
      </Form.Item>
    </Form>
  );
};

export default FormAddMovie;
