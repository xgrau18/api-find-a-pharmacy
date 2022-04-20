import { Request, Response } from "express";
import Feature from "../models/Feature";
import { arrayToGeoJSON } from "../services/locationService";

export function getFeatures(req: Request, res: Response) {

     Feature.find({ "properties.location": req.params.location }, function (err, results) {
        if (err) {
            return res.status(500).send( { message: `Error getting locations ${err.message}` });
        }

        if (results.length === 0) {
            return res.status(404).send( { message: 'No results found' });
        }

        res.status(200).send(arrayToGeoJSON(results));
    });

}

export function getAllFeatures(req: Request, res: Response) {

    Feature.find({}, function (err, results) {
        if (err) {
            return res.status(500).send( { message: `Error getting locations ${err.message}` });
        }

        if (results.length === 0) {
            return res.status(404).send( { message: 'No results found' });
        }

        res.status(200).send(arrayToGeoJSON(results));
    });

}


