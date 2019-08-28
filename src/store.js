import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session: null,
        isLogged: null,
    },
    getters: {
        session: state => state.session,
        isLogged: state => state.isLogged,
    },
    mutations: {
        setSession: (state, value) => {
            state.session = value;
        },
        setIsLogged: (state, value) => {
            state.isLogged = value;
        }
    },
    actions: {

    }
});
