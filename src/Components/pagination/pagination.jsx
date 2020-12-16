import React, {Component} from 'react'
import {onPageChangedAction} from "../../actions/usersActions";
import {connect} from "react-redux";
import './style.css'
import classNames from 'classnames'
import {range} from "../../utils";


const PaginationItem = ({page, currentPage,  handleClick}) => {
    const liClasses = classNames({
        'page-item': true,
        active: currentPage === page
    })
    return (
        <li
            onClick={(e) => handleClick(page, e)}
            className={liClasses}>
            {page}
        </li>
    )
}

class Pagination extends Component {

    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage = page => {
        this.props.dispatch(onPageChangedAction(page));
    };

    handleClick = (page, evt) => {
        evt.preventDefault();
        this.gotoPage(page);
    };


    fetchPageNumbers = () => {
        const {totalPages, currentPage, pageNeighbours} = this.props;

        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPage - pageNeighbours;
            const rightBound = currentPage + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = range(startPage, endPage);


            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    render() {
        const {currentPage, totalUsers, totalPages} = this.props

        if (!totalUsers) return null;
        if (totalPages === 1) return null;

        const pages = this.fetchPageNumbers();

        return (
            <nav className='pagination_users'>
                <ul>
                    {pages.map((page, index) => {
                        return (
                            <PaginationItem
                                key={index}
                                index={index}
                                page={page}
                                handleClick={this.handleClick}
                                currentPage={currentPage}
                            />
                        )
                    })}
                </ul>

            </nav>
        )
    }

}

const mapStateToProps = state => ({
    currentPage: state.users.currentPage,
    pageNeighbours: state.users.pageNeighbours,
    totalUsers: state.users.totalUsers,
    totalPages: state.users.totalPages
});

export default connect(mapStateToProps)(Pagination);
