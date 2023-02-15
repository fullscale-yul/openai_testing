const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const app = express();
app.use(express.json());


const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  physicalAddress: { type: String, required: true },
  billingAddress: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// Connect to MongoDB
mongoose.connect("mongodb://localhost/contacts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
});

app.get("/contacts/:name", async (req, res) => {
  const { name } = req.params;
  const contacts = await Contact.find({
    $or: [
      { firstName: { $regex: name, $options: "i" } },
      { lastName: { $regex: name, $options: "i" } },
    ],
  });
  res.json(contacts);
});

app.post("/contacts", async (req, res) => {
  const contact = req.body;
  const existingContact = await Contact.findOne({
    emailAddress: contact.emailAddress,
  });
  if (existingContact) {
    return res.status(409).json({ error: "Contact already exists" });
  }
  const newContact = await Contact.create(contact);
  res.status(201).json(newContact);
});

app.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const contact = req.body;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.json(updatedContact);
});

app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.json(deletedContact);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
