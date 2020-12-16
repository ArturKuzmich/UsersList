import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_BEGIN,
    FETCH_USERS_FAILURE,
    ON_PAGE_CHANGED_ACTION,
} from '../actions/actionType'

const initialState = {
    items: [],
    currentUsers: [],
    loading: false,
    error: null,
    pageLimit: 5,
    pageNeighbours: 1,
    totalUsers: 0,
    totalPages: null,
    offset: 0,
    currentPage: 1,
};

export default function userReducer( state = initialState,action) {
    switch (action.type) {
        case FETCH_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.users,
                totalUsers: action.payload.users.length,
                totalPages: Math.ceil(action.payload.users.length / state.pageLimit),
                currentUsers:  action.payload.users.slice(
                    state.offset,
                    state.offset + state.pageLimit
                )
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                items: []
            }
        case ON_PAGE_CHANGED_ACTION:
            const tempOffset = (action.currentPage - 1) * state.pageLimit;
            const tempCurrentUsers = state.items.slice(
                tempOffset,
                tempOffset + state.pageLimit
            );
            return {
                ...state,
                currentPage: action.currentPage,
                currentUsers: tempCurrentUsers,
                offset: tempOffset
            }
        default:
            return state
    }
}