import { Typography } from '@mui/material';
import styles from './CardReco.module.css';


function CardReco() {
    return (
        <>
            <section className={styles.cardreco} style={{ backgroundImage: `url("../../img/banner.png")` }} >
                <div className={styles.description} >
                    <Typography variant='h2' sx={{
                        color: '#F5F5F5',
                        padding: '15px',
                        fontWeight: 'bold',
                        fontSize: '48px',
                        border: '1px solid #F5F5F5',
                        boxSizing: 'border-box',
                        borderRadius: '15px',
                        width: 'fit-content',
                        backgroundColor: "#6BD1FF",
                        justifyContent: 'center',
                    }}>
                        Recomendado
                    </Typography>

                    <Typography variant='h4'>
                        Tu plataforma de programación, al alcance de un click
                    </Typography>

                    <Typography variant='body1' className={styles.descriptionChallenge}>
                    Registra, organiza y comparte tus proyectos de programación de forma fácil y rápida. ¡La comunidad de programadores te espera!
                    </Typography>
                </div>

                <div className={styles.video} >
                    <iframe  src="https://www.youtube.com/embed/ov7vA5HFe6w?si=gUION_x9n9HfNDGF" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </section>
        </>
    )

}

export default CardReco;   