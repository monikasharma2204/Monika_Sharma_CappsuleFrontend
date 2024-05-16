import React, { useState } from "react";
import ProductCard from "./ProductCard";

const Product = ({ data }) => {
  return (
    <div className="container mt-5">
      {data.saltSuggestions &&
        data.saltSuggestions.map((slt) => (
          <ProductCard key={slt.id} data={slt} />
        ))}
    </div>
  );
};

export default Product;
