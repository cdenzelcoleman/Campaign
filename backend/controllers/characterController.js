import Character from '../models/Character.js';
import { CHARACTERS } from '../constants/characters.js';

export const createCharacters = async (req, res, next) => {
  try {

    const characters = await Character.insertMany(CHARACTERS);
       console.log({characters});

    res.status(201).json({ characters });
  } catch (error) {
    next(error);
  }
};

export const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find({});
    res.status(200).json( characters);
  } catch (error) {
    next(error);
  }
};
