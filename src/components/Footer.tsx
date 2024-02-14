export default function Footer() {
  return (
    <footer className="mx-auto pt-2 text-center text-sm opacity-60 sm:pt-4 xl:my-6 xl:max-w-5xl">
      <p>&copy;{new Date().getFullYear()} Kim Nguyen - All Rights Reserved.</p>
      <p className="mx-1 mb-4 mt-1 block px-2 text-xs">
        Chinese Candlestick by{" "}
        <a
          href="https://www.freepoly.org"
          className="underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Freepoly.org
        </a>{" "}
        is licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          Creative Commons Attribution.
        </a>
      </p>
    </footer>
  );
}
