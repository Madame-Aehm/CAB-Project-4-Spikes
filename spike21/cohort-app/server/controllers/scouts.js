import { Scout } from "../models/scouts.js";

const test = (req, res) => {
  res.status(200).json('test route....')
}

const getScouts = async (req, res) => {
  try {
    const scouts = await Scout.find();
    res.status(200).json(scouts);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const getScoutById = async(req, res) => {
  try {
    const scout = await Scout.findById(req.params.id).populate("pets");
    res.status(200).json(scout);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const getScoutsByName = async(req, res) => {
  try {
    const scout = await Scout.find({ firstName: req.params.name });
    res.status(200).json(scout);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const getScoutByFullname = async(req, res) => {
  const { fname, lname } = req.params;
  try {
    const scout = await Scout.findOne({ firstName: fname, lastName: lname });
    res.status(200).json(scout);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const createScout = async(req, res) => {
  const newScout = new Scout({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    titan: req.body.titan,
    gender: req.body.gender,
    pets: req.body.pets
  }) 
  try {
    const result = await newScout.save();
    console.log(result);
    res.status(200).json(result);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

const updateScout = async(req, res) => {
  const { id } = req.params;
  try {
    const updatedScout = await Scout.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedScout);
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
}

export { test, getScouts, getScoutById, getScoutsByName, getScoutByFullname, createScout, updateScout }