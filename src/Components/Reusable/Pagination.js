import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types'

const Pagination = props => {
    // let classname="page-item";
    const { itemsCount, PageSize, onPageChange,currentPage } = props;
    const pagesCount = Math.ceil(itemsCount / PageSize);
    const pages = _.range(1, pagesCount + 1); //creating an array from 1->pagescount
    if (pagesCount === 1) return null;
    else

        return (
            <nav>
                <ul className="pagination">
                    {pages.map(page => (
                        <li key={page} className={(page===currentPage)?"page-item active cur":"page-item cur"}
                        >
                            <a
                                className="page-link fontify"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
};

Pagination.propTypes={
    itemsCount:PropTypes.number.isRequired,
    PageSize:PropTypes.number.isRequired,
    onPageChange:PropTypes.func.isRequired
    ,currentPage:PropTypes.number.isRequired
};
export default Pagination;