const state = {
    /*
        {
            Username: String
            AvatarUrl: String
        }
    */
    loggedUser: null
}

const mutations = {
    LOGGED_USER_SET(state, user) {
        console.log("LOGGED_USER_SET");
        console.log(user);
        state.loggedUser = user;
    }
}

const actions = {
    logout() {
        this.commit('LOGGED_USER_SET', null);
    },
    signIn() {
        this.commit('LOGGED_USER_SET', {});
    }
}

export default {
    state,
    mutations,
    actions
}