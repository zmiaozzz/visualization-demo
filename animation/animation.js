import {Timing} from './timing.js';

export class Animator {
    constructor({duration, iterations}) {
        this.timing = {duration, iterations};
    }

    animate(target, update) {
        let frameIndex = 0;
        const timing = new Timing(this.timing);

        return new Promise(resolve => {
            function next() {
                if (update({target, frameIndex, timing}) !== false && !timing.isFinished) {
                    requestAnimationFrame(next);
                }
                else {
                    resolve(timing);
                }
                frameIndex++;
            }
            next();
        })
    }
}
