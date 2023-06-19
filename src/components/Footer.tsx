

const Footer = () => {
  
  return (
    <footer className="xl:max-w-5xl text-sm text-center opacity-60 pt-2 sm:pt-4 mx-auto xl:my-6">
      <p>&copy;{new Date().getFullYear()} Kim Nguyen - All Rights Reserved.</p>
      <p className="block text-xs mx-1 mt-1 px-2 mb-4">
        Chinese Candlestick by{' '}
        <a
          href="https://www.freepoly.org"
          className="hover:underline underline-offset-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          Freepoly.org
        </a>{' '}
        is licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="hover:underline underline-offset-4"
          rel="noopener noreferrer"
          target="_blank"
        >
          Creative Commons Attribution.
        </a>
      </p>
    </footer>
  );
};

export default Footer;