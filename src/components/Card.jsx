import Link from 'next/link';
import styles from './../styles/Card.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Model from './Model';

const Card = ({ details }) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <div onClick={() => setShow(true)} className={styles['card-component']}>
                <div className={styles['card-image-wrapper']}>
                    <Image src={'/paper.jpg'} width={1954} height={3006} className={styles['card-image']} alt='random image' />
                </div>
                <div className={styles['card-details']}>
                    <div className={styles['card-title']}>
                        {details.Title.slice(0, 50)}{details.Title.length > 50 ? '...' : ''}
                    </div>
                    <div className={styles['card-bottom']}>
                        <div className={styles['card-author']}>
                            {details.Authors.split(',').map((author, idx) => {
                                if (idx > 2) return;
                                return <div key={idx} className={styles['card-author-item']}> {author} </div>;
                            }
                            )}
                        </div>
                        <div className={styles['card-date']}>
                            {
                                typeof (details['Published Date'].toISOString) == 'function' ?
                                    details['Published Date'].toDateString().split(' ').slice(1).join(' ') :
                                    details['Published Date'].toString()
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                show
                    ? <Model details={details} setShow={setShow} />
                    : ''
            }
        </>
    )
}

export default Card