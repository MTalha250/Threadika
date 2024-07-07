import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      required: true,
      default: [],
    },
    sizes: {
      type: Array,
      required: true,
      default: [],
    },
    colors: {
      type: Array,
      required: true,
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
    },
    fabric: {
      type: String,
    },
    trouser: {
      type: String,
    },
    inner: {
      type: String,
    },
    dopatta: {
      type: String,
    },
    embroidery: {
      type: String,
    },
    weight: {
      type: Number,
    },
    reviews: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
