import React from 'react'
import { Link } from '@inertiajs/react'

const Pagination = ({links}) => {
    return (
        <div>
            <ul className="pagination pagination-sm m-0 float-right">
                {links.map((link, index) => {
                    return (
                        <li className={`page-item ${link.url === null && 'disabled'} ${link.active && 'active'}`}>
                            <Link className="page-link" href={link.url || '#'}>
                                {link.label === "&laquo; Previous" ? '«' : link.label === "Next &raquo;" ? '»': link.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Pagination
