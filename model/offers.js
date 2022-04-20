import { Schema, model } from "mongoose";

const OfferSchema = new Schema(
  {
    account: {
      ref: users,
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      required: false,
    },
  },
  { timestamps: true }
);

const Offer = model("offers", OfferSchema);

export default Offer;
