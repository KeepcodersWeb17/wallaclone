import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex w-full flex-row items-center justify-center gap-4 border-t border-t-gray-400 bg-gray-300 pr-4 pl-4 text-sm leading-10 sm:text-base">
      <Link to="https://github.com/KeepcodersWeb17 " target="_blank">
        <p>&copy; {new Date().getFullYear()} Wallaclone</p>
      </Link>
      <p>All rights reserved.</p>
    </footer>
  );
};

export default Footer;
