import { animal } from "./elements/animal";
import { world } from "./elements/world";

export const simulationHandle = {
    width: 0,
    height: 0,
    portrait: false,
    aspectRatio: 1,
    ctx: null,
    start: function(config) {
        var viewportElem = document.getElementById(config.viewportId);
        viewportElem.width = screen.width - 15;
        viewportElem.height = screen.height - 15;

        this.width = viewportElem.width;
        this.height = viewportElem.height;

        if(this.width < this.height) {
            this.portrait = true;
        }

        this.ctx = viewportElem.getContext("2d");

        var w = world(this.width, this.height);
        w.context = this.ctx;
        w.init();
        w.distributeFruits(400);
        w.distributeAnimals(50);

        window.requestAnimationFrame(w.draw.bind(w));
    },
}
