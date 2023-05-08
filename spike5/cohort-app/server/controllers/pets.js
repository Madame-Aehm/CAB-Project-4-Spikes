import { Pet } from "../models/pets.js";

const test = (req, res) => {
  res.status(200).json('test route....')
}

const getAllPets = async(req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (e) {
    console.log(e);
    res.status(500).send('Server error');
  }
}

const getAllPetsPopulated = async(req, res) => {
  try {
    const pets = await Pet.find().populate('owner', ['username', 'email']);
    res.status(200).json(pets);
  } catch (e) {
    console.log(e);
    res.status(500).send('Server error');
  }
}

export { test, getAllPets, getAllPetsPopulated }