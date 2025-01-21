import React from 'react';
import styles from './Header.module.css';
import ModalNewVideo from '../ModalNewVideo/ModalNewVideo';

function Header() {
    return (
        <header className={styles.header}>
            <section>
                <img src="../../img/LogoMain.png" alt="Logo aluraflix" />
            </section>

            <div className={styles.headerButtons}>
                <ModalNewVideo/>
            </div>
        </header>
    );
}

export default Header;