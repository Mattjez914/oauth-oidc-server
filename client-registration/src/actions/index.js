// Action Creator Example

export const selectSong = song => {
    return {
        type: 'SONG_SELECTED',
        payload: song
    };
};

export const fetchExample = () => async (dispatch) => {
    const response = await fetch('https://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Authorization': ''
        }
    });

    dispatch({ type: 'FETCH_EXAMPLE', payload: response.data});
};

export const submitLogin = () => {
    return {
        type: 'LOGIN_SUBMITTED',
        payload: true
    };
};

export const userLogin = (creds) => async (dispatch) => {
    let clientId = creds.username;
    let token = creds.password;
    let error = null;
    const response = await fetch(`https://api.alphanetrics.com/reg/${clientId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        error = res.ok ? null : res.status;
        console.log('error: ', error);
        return res.json();
    });

    console.log(response);

    if (error) {
        let errorObject = {};
        switch(error) {
            case 401:
                errorObject = {
                    statusCode: error,
                    message: 'The client id and registration access token combination are incorrect'
                };
                break;
            case 404:
                errorObject = {
                    statusCode: error,
                    message: 'Please enter a valid client id before submitting'
                }
                break;
            default:
                errorObject = {
                    statusCode: error,
                    message: 'Failed to log in. Please try again.'
                }
        }
        dispatch({ type: 'LOGIN_ERROR', payload: errorObject});
    } else {
        dispatch({ type: 'USER_LOGIN', payload: response});
    }
    
};

export const userLogout = () => {
    return {
        type: 'USER_LOGOUT',
        payload: null
    }
}


