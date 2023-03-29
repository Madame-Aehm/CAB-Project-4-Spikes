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
    res.status(500).json({ error: e })
  }
}

const getScoutById = async(req, res) => {
  try {
    const scout = await Scout.findById(req.params.id);
    res.status(200).json(scout);
  } catch(e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}

const getScoutsByName = async(req, res) => {
  try {
    const scout = await Scout.find({ firstName: req.params.name });
    res.status(200).json(scout);
  } catch(e) {
    console.log(e);
    res.status(500).json({ error: e.message })
  }
}

export { test, getScouts, getScoutById, getScoutsByName }