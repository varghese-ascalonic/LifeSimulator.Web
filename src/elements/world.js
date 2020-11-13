import { animal } from "./animal";
import { fruit } from "./fruit";
import { getRandomInt, vectorDistance } from "../utilities";

export function world(width, height) {
    return {
        animals: [],
        fruits: [],
        init: function () {
            this.animals.push(animal());
            this.fruits.push(fruit());
        },
        size: {
            width: width,
            height: height
        },
        distributeFruits: function (maxCount) {
            for (var i = 0; i < maxCount; i++) {
                var newFruit = fruit();
                newFruit.location.x = getRandomInt(this.size.width);
                newFruit.location.y = getRandomInt(this.size.height);
                this.fruits.push(newFruit);
            }
        },
        distributeAnimals: function (maxCount) {
            for (var i = 0; i < maxCount; i++) {
                var newAnimal = animal();
                newAnimal.location.x = getRandomInt(this.size.width);
                newAnimal.location.y = getRandomInt(this.size.height);
                this.animals.push(newAnimal);
            }
        },
        context: null,
        draw: function () {

            this.context.clearRect(0, 0, this.size.width, this.size.height);

            //draw fruits
            for (var i = 0; i < this.fruits.length; i++) {
                this.fruits[i].draw(this.context);
            }

            //apply signal, draw animals & check for energy exhaustion
            for (var i = 0; i < this.animals.length; i++) {
                this.animals[i].incrementAge();

                //find the closest fruit if any, present within 50 units
                var minDist = this.size.width * this.size.height; var minDistFruit = -1;
                for (var j = 0; j < this.fruits.length; j++) {
                    if (Math.abs(this.fruits[j].location.x - this.animals[i].location.x) < 50 &&
                        Math.abs(this.fruits[j].location.y - this.animals[i].location.y) < 50) {
                        var dist = vectorDistance(this.fruits[j].location.x, this.fruits[j].location.y,
                            this.animals[i].location.x, this.animals[i].location.y);
                        if (dist < minDist) {
                            minDist = dist;
                            minDistFruit = j;
                        }
                    }
                }
                if (minDistFruit > -1) {
                    this.animals[i].triggerFocus({
                        isFruit: true,
                        x: this.fruits[minDistFruit].location.x,
                        y: this.fruits[minDistFruit].location.y,
                    });
                }

                //let animal react to stimuli and take a decision
                this.animals[i].reactToSignal(this.generateSignal(this.animals[i].location.x, this.animals[i].location.y));

                //check whether animal can eat fruit now
                if (this.animals[i].hasLockedTarget && this.animals[i].lockedTarget.targetType == 'fruit') {
                    if (vectorDistance(this.animals[i].location.x, this.animals[i].location.y,
                        this.animals[i].lockedTarget.x, this.animals[i].lockedTarget.y) < 10) {
                        for (var j = 0; j < this.fruits.length; j++) {
                            if (Math.abs(this.fruits[j].location.x - this.animals[i].location.x) < 5 &&
                                Math.abs(this.fruits[j].location.y - this.animals[i].location.y) < 5) {
                                this.fruits[j].consumed = true;
                                this.animals[i].energy += this.fruits[j].size * this.fruits[j].size;
                                this.animals[i].hasLockedTarget = false;
                                break;
                            }
                        }
                    }
                }
                //remove consumed fruits
                this.fruits = this.fruits.filter(function (fruit) {
                    return !fruit.consumed;
                });

                if (this.animals[i].energy <= 0) {
                    this.animals[i].alive = 0;
                }
                this.animals[i].draw(this.context);
            }

            //remove dead animals
            this.animals = this.animals.filter(function (animal) {
                return animal.alive;
            });

            window.requestAnimationFrame(this.draw.bind(this));
        },
        generateSignal: function (x, y) {
            var right = 0, left = 0, top = 0, bottom = 0;
            for (var i = 0; i < this.fruits.length; i++) {
                if (this.fruits[i].location.x > x) {
                    right += (Math.abs(this.fruits[i].location.x - x) / this.size.width);
                }
                else {
                    left += (Math.abs(this.fruits[i].location.x - x) / this.size.width);
                }
                if (this.fruits[i].location.y > y) {
                    bottom += (Math.abs(this.fruits[i].location.y - y) / this.size.height);
                }
                else {
                    top += (Math.abs(this.fruits[i].location.y - y) / this.size.height);
                }
            }

            var sum = left + right + top + bottom;
            return { left: left / sum, right: right / sum, top: top / sum, bottom: bottom / sum };
        }
    };
}