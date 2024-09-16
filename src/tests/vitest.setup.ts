/*
 * Importing this ensures that the matchers from jest-dom are available in Vitest.
 * jest-dom provides custom DOM-related matchers, such as `toBeInTheDocument`,
 * toHaveTextContent`, and more, which are not included by default in Vitest.
 */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
