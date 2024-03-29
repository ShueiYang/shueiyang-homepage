import NextLink from "next/link";

// function to pick Link component or a Html tag depending the route name
export function getLinkAndProps(route: string) {
  const Link =
    route === "/projects" ||
    route === "/contact" ||
    route === "/backoffice/admin"
      ? NextLink
      : "a";

  const prefetchPath = route !== "/contact";

  const linkProps =
    Link === "a"
      ? { rel: "noopener noreferrer", target: "_blank" }
      : { prefetch: prefetchPath, scroll: true }; // set to true since Exit animation not working

  return {
    Link,
    linkProps,
  };
}

export function scrollAfterLoad() {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
}

export function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}
