import Image from 'next/image';
import styles from './../styles/Header.module.css';
import { AiFillCaretDown } from 'react-icons/ai';
import { GoBell } from 'react-icons/go';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Header = () => {
    const currentDate = `${new Date().getDate()} ${months[new Date().getMonth()]}`;

    return (
        <div className={styles['header']}>
            <div className={styles['date-wrapper']}>
                <h3 className={styles['date-style']}>Today, {currentDate}</h3>
            </div>
            <div className={styles['profile-wrapper']}>
                <div className={styles['bell-wrapper']}>
                    <GoBell className={styles['bell-logo']} />
                </div>
                <div className={styles['user-wrapper']}>
                    <div className={styles['user-photo']}>
                        <Image
                            src={'https://i.pinimg.com/1200x/74/a1/f3/74a1f33a855e12746ba9cd1738840fa5.jpg'}
                            width={1200} height={1498} alt={'Dani Rojas'}
                            loading='lazy'
                            className={styles['image']}
                        />
                    </div>
                    <div className={styles['user-details']}>
                        <div className={styles['user-name']}>
                            Dani Rojas
                        </div>
                        <div className={styles['user-status']}>
                            🥰DNA
                        </div>
                    </div>
                    <div className={styles['more-wrapper']}>
                        <AiFillCaretDown className={styles['more-icon']} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header