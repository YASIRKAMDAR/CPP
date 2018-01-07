import axios from 'axios';

import { CARDPOST } from './types'

export const cardPost = (data) => {
    return function(dispatch) {
        axios
            .post('https://pgstaging.emirates.com/restservices/rest/CPGRestService/v1.0/postDetails', data)
            .then(res => dispatch({ type: CARDPOST, payload: res.data}));
    }
};
