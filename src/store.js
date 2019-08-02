import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session: null,
        username: null,
    },
    getters: {
        session: state => state.session,
        username: state => state.username,
    },
    mutations: {
        setSession: (state, value) => {
            state.session = value;
        },
        setUsername: (state, value) => {
            state.username = value;
        }
    },
    actions: {

    }
});
