import { Request, Response } from "express";
import { type } from "os";
import { send } from "process";



const feature = require("../models/modelJson");



export function mataro_ph(req: Request, res: Response) {
   
   const aux=feature.find({},);
   res.send("hola");

}