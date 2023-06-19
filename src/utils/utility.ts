import NextLink from "next/link";

export function getLinkAndProps (route: string,) {
    const Link = (
        route === "/projects" || route === "/contact"        
    ) ? NextLink : "a"

    const linkProps = Link === "a" ? {rel:"noopener noreferrer", target: "_blank"} : {scroll: false};
    return {
        Link,
        linkProps
    }
}

export function scrollAfterLoad() {
    if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
    }
}

export function easeOutCirc(x: number) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}


// export function isNotEmpty(obj: unknown): obj is PortfolioProps {
//     const record = obj as Record<string, unknown>
//     return typeof obj === "object" 
//         && obj !== null
//         && typeof record.id === "string"
// }

// export function isEmpty(obj: unknown): obj is {} {
//     return typeof obj === "object" 
//         && obj !== null
//         && Object.keys(obj).length === 0;
// }