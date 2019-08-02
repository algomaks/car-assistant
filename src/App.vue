<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            dark
        >
            <v-list dark dense>
                <v-list-item v-for="item in drawerItems" :key="item.path" :to="item.path" color="blue lighten-4">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark clipped-left color="blue darken-3">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-icon class="ml-4">mdi-car</v-icon>

            <v-toolbar-title class="ml-2">
                Car Assistant
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn v-if="username" @click="signOut" large text>
                <v-icon left>mdi-login</v-icon>
                Log Out
            </v-btn>

            <v-btn v-else @click="signIn" large text>
                Log In with Blockstack
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
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
            console.log(1);

            const userData = session.loadUserData();
            const username = userData.username;

            this.setUsername(username);
        }
        else if (session.isSignInPending()) {
            console.log(2);

            session.handlePendingSignIn().then(userData => {
                window.location = window.location.origin;
            });
        }

        console.log(3);
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
            'username'
        ]),
    },

    methods: {
         ...mapMutations([
            'setSession',
            'setUsername'
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
            this.setUsername(null);

            window.location = window.location.origin;
        }
    }
};
</script>
