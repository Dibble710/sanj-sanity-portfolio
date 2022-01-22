function Footer() {
    const footerYear = new Date().getFullYear();
    return (
      <footer className="footer p-5 text-neutral-content footer-center">
        <div>
          <p>Copyright &copy; {footerYear} All rights and lefts reserved</p>
          <p>
            Coded by
            <a
              href="https://www.tylerantoni.com"
              className="text-primary font-bold"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Tyler Antoni
            </a>{" "}
            using daisyUI and React.
          </p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  