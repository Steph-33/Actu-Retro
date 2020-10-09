const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('token', action.payload.data.token);
			return {
				...state,
                isAuthenticated: true,
                token : action.payload.data.token,
                user : action.payload.data.user,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				token: null,
            };
        case "LOAD_ADMINISTRATOR":
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