import { getRGBString } from "../utilities";

export function fruit() {
    return {
        location: {
            x: 10,
            y: 10
        },
        size: {
            width: 5,
            height: 5
        },
        color: {
            r: 0,
            g: 255,
            b: 0
        },
        consumed: false,
        energy: 10,
        draw: function(context) {
            context.fillStyle = getRGBString(this.color);
            context.beginPath();
            context.arc(this.location.x, this.location.y, this.size.width, 0, 2 * Math.PI);
            context.fill();
        },
    };
}