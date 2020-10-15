const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('token', action.payload.data.token);
			localStorage.setItem('firstname', action.payload.data.user.firstname);
        	localStorage.setItem('lastname', action.payload.data.user.lastname);
			return {
				...state,
                isAuthenticated: true,
                token : action.payload.data.token,
				user : action.payload.data.user,
			};
		case 'LOGOUT':
			localStorage.clear();
			window.location='/';
			return {
				...state,
				isAuthenticated: false,
				token: null,
            };
        case "LOAD_USER":
            return {
              ...state,
              isAuthenticated: true,
              user: action.payload,
            };    
		default:
			return state;
	}
};

module.exports = reducer;