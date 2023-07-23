const mongoose = require("mongoose");
const { Schema } = mongoose;
const Bread = require("./breads.js");

const bakerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Monica", "Rachel", "Ross", "Joey", "Phoebe", "Chandler"],
    },
    startDate: { type: Date, required: true },
    bio: { type: String },
  },
  { toJSON: { virtuals: true } }
);

// Virtuals:
//equal to saying Bread.find({baker: this ParticularBaker.id})
bakerSchema.virtual("breads", {
  ref: "Bread", // look to bread model in Mongodb
  localField: "_id", // look to id (in Mongodb)
  foreignField: "baker", // link baker object id to bread id
});

//HOOKS
bakerSchema.pre("findOneAndDelete", function () {
  Bread.deleteMany({ id: this._conditions._id }).then((deletedBreads) => {
    console.log(deletedBreads);
  });
});

const Baker = mongoose.model("Baker", bakerSchema);

module.exports = Baker;
