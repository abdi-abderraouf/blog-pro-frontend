import React from 'react'

const Footer = () => {
    return (
        <footer style={styles}>
        Copyright 2023  &copy All Rights Reserved  ® Abdi Abderraouf ®
        
        </footer>
    )
}

const styles = {
    color:"var(--white-color)",
    fontSize:"12px",
    backgroundColor:"var(--blue-color)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"50px"
}

export default Footer;
