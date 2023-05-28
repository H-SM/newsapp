import React from "react";

const Footer = () => {
    return (
      <div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="social-icon col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      </a>
      <span className="mb-3 mb-md-0 text-muted" style={{fontFamily:"Poppins",fontSize:"15px",marginLeft:"7px"}}>By HSM © 2023 </span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex social-bar">
    <a href="https://www.linkedin.com/in/harman-singh-hsm/" target="_blank"><i className="fa fa-linkedin"></i></a>
    <a href="https://instagram.com/hsmpaaji" target="_blank"><i className="fa fa-instagram"></i></a>
    <a href="https://github.com/H-SM" target="_blank"><i className="fa fa-github"></i></a>
    </ul>
     </footer>
      </div>
    );
}
export default Footer;