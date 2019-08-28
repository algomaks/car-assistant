<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center">
                <v-carousel height="350px">
                    <v-carousel-item>
                        <v-sheet height="100%" tile>
                            <v-layout
                                align-center
                                fill-height
                                justify-center
                                column
                            >
                                <v-container>
                                    <v-layout text-center column>
                                        <v-flex xs12>
                                            <h1 class="display-1 font-weight-bold mb-3">Car Assistant</h1>
                                            <p class="subheading font-weight-regular">
                                                100% private and secure app to track and improve the fuel consumption of your car.
                                            </p>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-img :src="require('../assets/car.svg')" class="my-3" contain height="100"></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-layout>
                        </v-sheet>
                    </v-carousel-item>

                    <v-carousel-item>
                        <v-sheet height="100%" tile>
                            <v-layout
                                align-center
                                fill-height
                                justify-center
                                column
                            >
                                <v-container>
                                    <v-layout text-center column>
                                        <v-flex xs12>
                                            <h1 class="display-1 font-weight-bold mb-3">Security</h1>
                                            <p class="subheading font-weight-regular">
                                                This app encrypts and stores all user data on the blockchain.
                                            </p>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-img :src="require('../assets/shield.svg')" class="my-3" contain height="100"></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-layout>
                        </v-sheet>
                    </v-carousel-item>

                    <v-carousel-item>
                        <v-sheet height="100%" tile>
                            <v-layout
                                align-center
                                fill-height
                                justify-center
                                column
                            >
                                <v-container>
                                    <v-layout text-center column>
                                        <v-flex xs12>
                                            <h1 class="display-1 font-weight-bold mb-3">Fuel consumption</h1>
                                            <p class="subheading font-weight-regular">
                                                Track your average fuel consumption.
                                            </p>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-img :src="require('../assets/gas.svg')" class="my-3" contain height="100"></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-layout>
                        </v-sheet>
                    </v-carousel-item>

                    <v-carousel-item>
                        <v-sheet height="100%" tile>
                            <v-layout
                                align-center
                                fill-height
                                justify-center
                                column
                            >
                                <v-container>
                                    <v-layout text-center column>
                                        <v-flex xs12>
                                            <h1 class="display-1 font-weight-bold mb-3">Reminders</h1>
                                            <p class="subheading font-weight-regular">
                                                Set reminders about important maintenance activities or expiring documents.
                                            </p>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-img :src="require('../assets/reminder.svg')" class="my-3" contain height="100"></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-layout>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" v-if="!isLogged">
                <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" @click="login">
                        <v-img
                            height="200px"
                            :src="require('../assets/key.jpg')"
                        >
                            <div class="d-flex flex-column justify-end fill-height bottom-gradient">
                                <div class="pa-3 white--text">
                                    <h1 class="display-1">Log in</h1>
                                    <div class="subtitle-1 mt-2">Log in securely using your Blockstack ID.</div>
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>


            <v-col cols="12" v-if="isLogged">
                <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" @click="logout">
                        <v-img
                            height="200px"
                            :src="require('../assets/key.jpg')"
                        >
                            <div class="d-flex flex-column justify-end fill-height bottom-gradient">
                                <div class="pa-3 white--text">
                                    <h1 class="display-1">Log out</h1>
                                    <div class="subtitle-1 mt-2">Disconnect from the app securely.</div>
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col cols="12">
                <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" @click="open">
                        <v-img
                            height="200px"
                            :src="require('../assets/fuel.jpg')"
                        >
                            <div class="d-flex flex-column justify-end fill-height bottom-gradient">
                                <div class="pa-3 white--text">
                                    <h1 class="display-1">Fuel consumption</h1>
                                    <div class="subtitle-1 mt-2">Log your fuel consumption daily.</div>
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col cols="12">
                <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" @click="open">
                        <v-img
                            height="200px"
                            :src="require('../assets/analytics.jpg')"
                        >
                            <div class="d-flex flex-column justify-end fill-height bottom-gradient">
                                <div class="pa-3 white--text">
                                    <h1 class="display-1">Fuel analytics</h1>
                                    <div class="subtitle-1 mt-2">Analyze your data to gain deep understanding of your fuel consumption.</div>
                                </div>
                            </div>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        components: {},

        computed: {
            ...mapGetters([
                'session',
                'isLogged'
            ])
        },

        methods: {
            ...mapMutations([
                'setSession',
                'setIsLogged'
            ]),

            login() {
                this.session.redirectToSignIn();
            },

            logout() {
                this.session.signUserOut();

                this.setSession(null);
                this.setIsLogged(false);

                window.location = window.location.origin;
            },

            open() {
                if (this.isLogged) {
                    this.$router.push('/consumption');
                }
                else {
                    this.session.redirectToSignIn();
                }
            }
        }
    };
</script>

<style scoped>
    .bottom-gradient {
        background-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 10%,
            transparent 120px
        );
    }
</style>
