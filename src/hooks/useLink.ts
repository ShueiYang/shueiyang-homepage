import NextLink from "next/link";

/**
 * Custom hook to select either the Next.js `Link` component or a standard "a" tag
 * based on the given route. This allows for conditional behavior depending on
 * whether the route is internal or external, and manages properties accordingly.
 *
 * @param route - The route path to determine whether to use `NextLink` or "a" tag.
 */
export function useLink(route: string) {
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
      : { prefetch: prefetchPath, scroll: false };

  return {
    Link,
    linkProps,
  };
}
