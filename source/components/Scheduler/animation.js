import { TweenMax } from 'gsap';

export default {
    show (target, duration) {
        TweenMax.from(target, duration, {
            opacity: 0,
            scale:   0,
        });
    },
    open (target, duration) {
        TweenMax.from(target, duration, {
            opacity:      0,
            height:       0,
            marginBottom: 0,
            scale:        0,
        });
    },
    close (target, duration) {
        TweenMax.to(target, duration, {
            opacity:      0,
            height:       0,
            marginBottom: 0,
            scale:        0,
        });
    },
};
