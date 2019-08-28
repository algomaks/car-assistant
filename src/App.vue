<template>
    <v-app>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" md="8" class="fill-height">
                        <!-- <v-app-bar
                            color="indigo darken-2"
                            dark
                        >
                            <v-icon>mdi-home</v-icon>

                            <v-toolbar-title class="ml-4">Car Assistant</v-toolbar-title>
                        </v-app-bar> -->

                        <v-content>
                            <router-view />
                        </v-content>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { AppConfig, UserSession } from "blockstack";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "App",

    components: {
    },

    created() {
        const appConfig = new AppConfig(["store_write", "publish_data"]);
        const session = new UserSession({appConfig});

        this.setSession(session);

        if (session.isUserSignedIn()) {
            this.setIsLogged(true);
        }
        else if (session.isSignInPending()) {
            session.handlePendingSignIn().then(userData => {
                window.location = window.location.origin;
            });
        }
    },

    data: () => ({
        drawer: null,
        mini: true,

        drawerItems: [
            {
                icon: 'mdi-home',
                title: 'Home',
                path: '/'
            },
            {
                icon: 'mdi-gas-station',
                title: 'Consumption',
                path: '/consumption'
            },
        ]
    }),

    computed: {
        ...mapGetters([
            'session',
            'isLogged'
        ]),
    },

    methods: {
         ...mapMutations([
            'setSession',
            'setIsLogged'
        ]),

        handleDrawlerClick() {
            this.drawer = !this.drawer;
        },

        signIn() {
            this.session.redirectToSignIn(window.location.origin);
        },

        signOut() {
            this.session.signUserOut();

            this.setSession(null);
            this.setIsLogged(false);

            window.location = window.location.origin;
        }
    }
};
</script>
