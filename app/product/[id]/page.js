import ProductDetails from "@/app/containers/product-page/product.container";
import React from "react";

export const metadata = {
  title: "Chi tiết sản phẩm",
  description: "Generated by create next app",
};

const ProductDetailsPage = ({ params }) => {
  return (
    <div className="w-full">
      <ProductDetails data={params.id} />
    </div>
  );
};

export default ProductDetailsPage;
