import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {fetchUsers} from "../../actions/usersActions";
import {connect} from "react-redux";
import UserDetails from "../userdetails/userdetail";
import './style.css'
import Pagination from "../pagination/pagination";


class UsersList extends Component {


    componentDidMount() {
        this.props.dispatch(fetchUsers());
        this.randomUser()
    }
    randomUser = () => {
        const {
            currentUsers,
        } = this.props;
        this.timeout = setInterval(() => {
            let random = currentUsers[Math.floor(Math.random()* currentUsers.length)]
            let elem = document.getElementById('get_random');
            if(random === undefined){
                console.log(random)
                return elem.innerHTML =  new Date().toLocaleString() + 'If you see current date > something get wrong, please reload page '
            }
            else {
                elem.innerHTML  = random.name + '<br>' + random.surname
            }

        }, 8000);

    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }


    render() {

        const {
            currentUsers,
            currentPage,
            totalPages,
            error,
            loading,
        } = this.props;



        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (loading) {
            return <div>...Loading</div>
        }
        return (
            <div className='home_page'>
                <h4 id='get_random'></h4>
                {currentPage && (
                    <span>Page <span>{currentPage}</span> / <span>{totalPages}</span>  </span>
                )}
                <div className='users_list'>
                    {currentUsers.map(user => (
                        <UserDetails key={user.id} user={user}/>
                    ))}
                </div>
                <Pagination/>
            </div>
        )
    }

}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool
}
const mapStateToProps = state => ({
    users: state.users.items,
    loading: state.users.loading,
    error: state.users.error,

    randomUser: state.users.randomUser,

    currentUsers: state.users.currentUsers,
    currentPage: state.users.currentPage,
    totalUsers: state.users.totalUsers,
    totalPages: state.users.totalPages
});
export default connect(mapStateToProps, null)(UsersList);

