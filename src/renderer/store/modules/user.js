const state = {
    /*
        {
            Username: String
            AvatarUrl: String
        }
    */
    username: null,
    loggedIn: false
}

const mutations = {
    LOGGED_USER_SET(state, user) {
        console.log("LOGGED_USER_SET");
        console.log(JSON.stringify(user));
        state.username = user.username;
        state.loggedIn = true;
    }
}

const actions = {
    logout() {
        this.commit('LOGGED_USER_SET', null);
    },
    signIn(state, userData) {
        this.commit('LOGGED_USER_SET', userData);
    }
}

export default {
    state,
    mutations,
    actions
}