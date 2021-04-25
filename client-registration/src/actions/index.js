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
    const response = await fetch(`https://api.alphanetrics.com/reg/${clientId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json());

    console.log(response);

    dispatch({ type: 'USER_LOGIN', payload: response.registration_access_token});
};

export const userLogout = () => {
    return {
        type: 'USER_LOGOUT',
        payload: null
    }
}


