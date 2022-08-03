import React from 'react';
export const Pagination = ({postPerPage,totalPage,setCurrentPage,userName}) => {
    const pageNumbers = []
    for(let i=1;i<Math.ceil(totalPage / postPerPage) + 1;i++){
        pageNumbers.push(i)
    }
    return (
        <nav className='pagination-nav'>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                <a onClick={() => setCurrentPage(number)} href={`/${userName}#`} className='page-link'>
                        {number}
                    </a>
                </li>
                ))}
            </ul>
        </nav>
    );
}
