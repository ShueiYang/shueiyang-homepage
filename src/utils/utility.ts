import NextLink from "next/link";

// function to pick Link component or a Html tag depending the route name
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


export function convertToBase64 (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); 
        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = (error) => {
            reject(error)
        }
    })
  }


// export function convertToBase64(file) {
//     return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
// }
