const state = {
    darkMode: false
}

const mutations = {
    DARKMODE_SET(state, b) {
        state.darkMode = b;
    }
}

export default {
    state,
    mutations
}