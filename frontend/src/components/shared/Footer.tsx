const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center gap-4 bg-red-50 pr-4 pl-4 leading-10">
      <p>&copy; {new Date().getFullYear()} Wallaclone</p>
      <p>All rights reserved.</p>
    </footer>
  );
};

export default Footer;
