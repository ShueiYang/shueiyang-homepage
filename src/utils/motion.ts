
//Framer motion animation

export function transit(direction?: string) {
    return {
        hidden: {
            opacity: 0,
            x: 0,
            y: 25
        },
        enter: {
            opacity: 1,
            x: 0,
            y: 0 
        },
        exit: { 
            opacity: 0,
            x: 0,
            y: direction === "up"? "-20%" : 25  
        }
    }
}


export function letterAnimate() {
    return {
        hidden: {
            opacity: 0,
            x: 200, 
            y: 0 
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0 
        } 
    }
}


export function slideIn (direction: string, type: string, delay: number) {
    return {
        hidden: {
            opacity: 0,
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
        },
        enter: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: 0.5,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
            transition: {
                type: type,
                delay: delay,
                duration: 0.5,
                ease: "easeIn",
            },
        },
    };
};