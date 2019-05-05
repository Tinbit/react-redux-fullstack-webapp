const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],//to make sure Any end user let click on email one time
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User'}, //_ ref ,set up r/ship b/n given schema & user
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
