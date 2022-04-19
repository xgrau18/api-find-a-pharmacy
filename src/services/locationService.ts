
export function arrayToGeoJSON(features: any[]) {

    return {
        type: "FeatureCollection",
        features: features
    }
}