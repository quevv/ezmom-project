"use client";
import { brandApi, productApi } from "@/services";
import { Drawer, Select, notification } from "antd";
import React, { useEffect, useState } from "react";

export const ProductForm = ({ title, data }) => {
  const [openDrawer, SetOpenDrawer] = useState(false);
  const [brand, setBrand] = useState(null);
  const [monthDevelopment, setMonthDevelopment] = useState(null);
  const [noti, setNoti] = useState({
    successMsg: {
      msg: "Thêm sản phẩm thành công!",
      descript:
        "Đã thêm sản phẩm thành công, vui lòng kiểm tra tại trang quản lý sản phẩm.",
    },
    errorMsg: {
      msg: "Thêm sản phẩm thất bại!",
      descript: "Vui lòng kiểm tra lại các thông tin trước khi thêm sản phẩm.",
    },
  });
  const [newProduct, setNewProduct] = useState({
    Name: "",
    File: "",
    Description: "",
    Status: "Còn hàng",
    Price: 0,
    BrandId: 0,
    ProductBabyDevelopmentId: 0,
    Quantity: 0,
  });
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    GetSuportData();
  }, []);

  const GetSuportData = async () => {
    const res = (await brandApi.getBrands()).data;
    if (res.isSuccess) {
      setBrand(res.result);
    }
    const milestonesRes = (await brandApi.getMilestones()).data;
    if (milestonesRes.isSuccess) {
      setMonthDevelopment(milestonesRes.result);
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (notiMsg) => {
    api.info({
      message: notiMsg.msg,
      description: notiMsg.descript,
      duration: 0,
    });
  };

  const handleCloseDrawer = () => {
    SetOpenDrawer(false);
  };
  const handleOpenDrawer = () => {
    SetOpenDrawer(true);
  };

  const handleChangeBrand = async (value) => {
    setNewProduct((prevInfor) => ({
      ...prevInfor,
      BrandId: value,
    }));
  };

  const handleChangeMonth = async (value) => {
    setNewProduct((prevInfor) => ({
      ...prevInfor,
      ProductBabyDevelopmentId: value,
    }));
  };

  const handleChangeStatus = async (value) => {
    console.log(value);
    setNewProduct((prevInfor) => ({
      ...prevInfor,
      Status: value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevInfor) => ({
      ...prevInfor,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    setNewProduct((prevInfor) => ({
      ...prevInfor,
      File: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newProduct.Name ||
      !newProduct.File ||
      !newProduct.Description ||
      !newProduct.Status ||
      !newProduct.Price != 0 ||
      !newProduct.BrandId ||
      !newProduct.ProductBabyDevelopmentId ||
      !newProduct.Quantity != 0
    ) {
      setErrors(true);
      return;
    } else {
      const res = (await productApi.addProduct(newProduct)).data;
      if (res.isSuccess) {
        openNotification(noti.successMsg);
      }
    }
    setErrors(false);
  };

  const inputCss =
    "w-full rounded-lg p-1 border-2 border-gray-200 hover:border-pink-400 mt-2 mb-3";
  return (
    <div className="w-full my-2">
      <button
        onClick={handleOpenDrawer}
        className="bg-blue-400 m-1 hover:bg-blue-500 active:bg-blue-300 rounded-lg px-2 py-1 text-white"
      >
        {title}
      </button>
      <Drawer
        title={title}
        placement={"right"}
        closable={true}
        onClose={handleCloseDrawer}
        open={openDrawer}
      >
        {contextHolder}
        <div className="flex flex-col justify-center items-center">
          <form onSubmit={handleSubmit} className="w-[60%]">
            <label>Tên sản phẩm</label>
            <br />
            <input
              onChange={handleChange}
              name="Name"
              value={newProduct.Name}
              className={inputCss}
              type="text"
              placeholder="Nhập tên sản phẩm"
            />

            <label>Ảnh sản phẩm</label>
            <br />
            <input
              onChange={handleImageChange}
              name="File"
              className={inputCss}
              type="file"
            />

            <Select
              name="BrandId"
              className="rounded-lg border-2 border-gray-200 hover:border-pink-400 mt-2 mb-3"
              style={{
                width: 200,
              }}
              onChange={handleChangeBrand}
              options={
                brand
                  ? brand.map((item) => ({
                      value: item.brandId,
                      label: item.brandName,
                    }))
                  : ""
              }
            />
            <br />
            <label>Mô tả sản phẩm</label>
            <br />
            <textarea
              rows="4"
              onChange={handleChange}
              name="Description"
              value={newProduct.Description}
              className={inputCss}
            />

            <label>Tình trạng</label>
            <br />
            <Select
              name="Status"
              defaultValue={newProduct.Status}
              className="rounded-lg border-2 border-gray-200 hover:border-pink-400 mt-2 mb-3"
              style={{
                width: 200,
              }}
              onChange={handleChangeStatus}
              options={statusItems.map((item) => ({
                value: item.label,
                label: item.label,
              }))}
            />
            <br />
            <label>Sản phẩm dành cho bé từ:</label>
            <br />
            <Select
              name="Status"
              className="rounded-lg border-2 border-gray-200 hover:border-pink-400 mt-2 mb-3"
              style={{
                width: 200,
              }}
              onChange={handleChangeMonth}
              options={
                monthDevelopment
                  ? monthDevelopment.map((item) => ({
                      value: item.milestonesByMonthId,
                      label:
                        "Từ " +
                        item.minMonth +
                        "-" +
                        item.maxMonth +
                        " tháng tuổi",
                    }))
                  : ""
              }
            />
            <br />
            <label>Giá sản phẩm</label>
            <br />
            <input
              onChange={handleChange}
              name="Price"
              value={newProduct.Price}
              className="rounded-lg p-1 border-2 border-gray-200 hover:border-pink-400 mt-2 mb-3"
              style={{
                width: 200,
              }}
              type="number"
              placeholder="Nhập giá sản phẩm"
              min={0}
              max={10000000}
            />
            <br />
            <label>Số lượng</label>
            <br />
            <input
              onChange={handleChange}
              name="Quantity"
              value={newProduct.Quantity}
              className="rounded-lg p-1 border-2 border-gray-200 hover:border-pink-400 mt-2 mb-3"
              style={{
                width: 200,
              }}
              type="number"
              placeholder="Nhập giá sản phẩm"
              min={0}
              max={100}
            />
            <div className="w-full flex flex-col items-center justify-center my-2">
              {errors ? (
                <i className="text-red-500">Vui lòng nhập đầy đủ thông tin</i>
              ) : (
                <></>
              )}
              <button
                className="rounded-lg active:bg-pink-300 bg-[#FA5A96] text-white w-[30%] p-2 mt-3"
                type="submit"
              >
                Hoàn Thành
              </button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

const statusItems = [
  {
    label: "Còn hàng",
    key: "0",
  },
  {
    label: "Hết hàng",
    key: "1",
  },
  {
    label: "Dừng bán",
    key: "2",
  },
];
