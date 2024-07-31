import React from 'react'

const Pagination = ({ pagination, handlePageChange }) => {
    return (
        <div>
            <ul className="pagination pagination-sm m-0 float-right">
                <li className="page-item">
                    <button disabled={pagination.current_page == 1 && 'disabled'} className="page-link" onClick={() => handlePageChange(pagination.current_page - 1)}>
                        «
                    </button>
                </li>
                {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
                    <li className={`page-item ${page == pagination.current_page && 'active'}`} key={page}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button disabled={pagination.current_page == pagination.last_page && 'disabled'} className="page-link" onClick={() => handlePageChange(pagination.current_page + 1)}>
                        »
                    </button>
                </li>
            </ul>

        </div>
    )
}

export default Pagination
