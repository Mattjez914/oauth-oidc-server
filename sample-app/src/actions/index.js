import qs from 'qs';

const { REACT_APP_API_URL, REACT_APP_CLIENT_ID } = process.env

export const authCallback = (code) => async (dispatch) => {
    let error = null;
    console.log('going to send token request');
    const response = await   fetch(`${REACT_APP_API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          code: code,
          client_id: REACT_APP_CLIENT_ID,
          grant_type: 'authorization_code'
        })
      }).then(res => {
        error = res.ok ? null : res.status;
        return res.json();
    });

    console.log('the response', response);
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
}

export const userLogout = () => {
    return {
        type: 'USER_LOGOUT',
        payload: null
    }
}

