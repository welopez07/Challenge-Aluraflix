import React from 'react';
import styles from './Footer.module.css';
import { GitHub, LinkedIn, Instagram } from '@mui/icons-material';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                <img src="../../img/LogoMain.png" alt="Logo alura" className={styles.logoImage} />
            </div>
            
            <div className={styles.developerInfo}>
                <h3>Desarrollado por Wilson López</h3>
            <div className={styles.socialLinks}>
                <a 
                    href="https://github.com/welopez07" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <GitHub />
                </a>
                <a 
                    href="https://www.linkedin.com/in/wilson-lopez-galvis/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <LinkedIn />
                </a>
                <a 
                    href="https://www.instagram.com/wilsonlopezgalvis?igsh=MXNpZTY2YTYxZjRjNg==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Instagram />
                </a>
            </div>
                <p> Alura Latam - ONE Oracle Next Education </p>
            </div>
            
        </footer>
    );
}

export default Footer;