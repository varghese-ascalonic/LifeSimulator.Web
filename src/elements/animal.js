import { getRGBString } from "../utilities";

export function animal() {
    return {
        location: {
            x: 120,
            y: 300
        },
        size: {
            width: 5,
            height: 5
        },
        color: {
            r: 0,
            g: 0,
            b: 255
        },
        energy: 1000,
        age: 0,
        alive: true,
        lockedTarget: {
            x: 0,
            y: 0,
            targetType: 'fruit'
        },
        hasLockedTarget: false,
        draw: function(context) {
            context.fillStyle = getRGBString(this.color);
            context.beginPath();
            context.arc(this.location.x, this.location.y, this.size.width, 0, 2 * Math.PI);
            context.fill();
        },
        move(deltaX, deltaY) {
            this.location.x += deltaX;
            this.location.y += deltaY;
            this.energy -= 1;
        },
        reactToSignal(signal) {
            //approach a specific target?
            if(this.hasLockedTarget) {
                var vectorX = 0, vectorY = 0;
                if(this.lockedTarget.x < this.location.x) {
                    vectorX = -1;
                }
                else {
                    vectorX = 1;
                }
                if(this.lockedTarget.y < this.location.y) {
                    vectorY = -1;
                }
                else {
                    vectorY = 1;
                }
                this.move(vectorX, vectorY);
                return;
            }
            //follow intuition
            if(signal.left > signal.right) {
                this.move(-1, 0);
            }
            else {
                this.move(1, 0);
            }
            if(signal.top > signal.bottom) {
                this.move(0, -1);
            }
            else {
                this.move(0, 1);
            }
        },
        incrementAge() {
            this.age += 1;
            this.size.width = 5 + this.age/100;
        },
        triggerFocus(target) {
            if(target.isFruit) {
                this.hasLockedTarget = true;
                this.lockedTarget.x = target.x;
                this.lockedTarget.y = target.y;
                this.lockedTarget.targetType = 'fruit';
            }
        }
    };
}