export function getRGBString(rgbObject) {
    return "rgb(" + rgbObject.r + "," + rgbObject.g + "," + rgbObject.b + ")";
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function vectorDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}