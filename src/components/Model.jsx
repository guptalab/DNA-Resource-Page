import { useEffect } from 'react';
import styles from './../styles/Model.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

const Model = ({ setShow, details }) => {

    const close = (e) => {
        if (e && e.target.id !== 'close') return;
        setShow(false);
    }

    return (
        <div id={'close'} onClick={(e) => close(e)} className={styles['model-component']}>
            <div id={'dialog'} className={styles['model-content']}>
                <div className={styles['model-left']}>
                    <Image src={'/paper.jpg'} width={1954} height={3006} className={styles['card-image']} alt='random image' />
                </div>
                <div className={styles['model-right']}>
                    <div className={styles['model-right-top']}>
                        <div onClick={() => close(setShow(false))} className={styles['close-button']}>
                            <AiOutlineClose />
                        </div>
                        <div className={styles['model-heading']}>
                            {details.Title}
                        </div>

                        <div className={styles['model-priority-high']}>
                            <div className={styles['model-source']}>
                                Source: <b>{details.Source}</b>
                            </div>
                            <div className={styles['model-type']}>
                                Type: <b>{details.Type}</b>
                            </div>
                            <div className={styles['model-topics']}>
                                <div className={styles['model-topic-text']}>
                                    Topics:
                                </div>
                                <ul className={styles['model-topic-list']}>
                                    {details.Topics.split(',').map(
                                        (topic, idx) => <li key={idx} className={styles['model-topic-list-item']}>{topic}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className={styles['model-priority-low']}>
                            <div className={styles['model-authors']}>
                                <div className={styles['model-authors-text']}>
                                    Authors:
                                </div>
                                <ul className={styles['model-authors-list']}>
                                    {details.Authors.split(',').map(
                                        (author, idx) => <li key={idx}>{author}</li>
                                    )}
                                </ul>
                            </div>

                            <div className={styles['model-published-date']}>
                                Published Date: <b>{details['Published Date']}</b>
                            </div>
                        </div>
                    </div>
                    <div className={styles['model-right-bottom']}>
                        <Link href={details.Link} target='new' className={styles['model-button-wrapper']}>
                            <div className={styles['action-button']} >View Article</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model