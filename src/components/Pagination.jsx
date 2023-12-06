import { DOTS, usePagination } from '@/hooks/usePagination';
import styles from './../styles/Pagination.module.css';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount, currentPage, pageSize } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if (currentPage === paginationRange.length + 2) return;
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        if (currentPage === 1) return;
        onPageChange(currentPage - 1);
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={styles['pagination-container']}>
            <li
                className={styles['pagination-item']}
                onClick={onPrevious}
            >
                <div className={`${styles["arrow"]} ${styles['left']}`} >
                    <BsFillCaretLeftFill />
                </div>
            </li>

            {paginationRange.map((pageNumber, idx) => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li key={idx} className={`${styles["pagination-item"]}`}>
                        <div className={styles['dots']}>...</div>
                    </li>;
                }

                // Render our Page Pills
                return (
                    <li
                        key={idx}
                        className={`${styles['pagination-item']} ${styles['text']} ${currentPage === pageNumber ? styles['active'] : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            <li
                className={styles['pagination-item']}
                onClick={onNext}
            >
                <div className={`${styles["arrow"]} ${styles['right']}`} >
                    <BsFillCaretRightFill />
                </div>
            </li>
        </ul>
    )
}

export default Pagination