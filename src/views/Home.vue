<template>
    <v-container>
        <v-layout column>
            <v-flex xs12>
                <v-carousel>
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
                                                100% private and secure app to track everything about your car.
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
                                            <h1 class="display-1 font-weight-bold mb-3">Remainders</h1>
                                            <p class="subheading font-weight-regular">
                                                Get remainders about important maintenance or expiring documents.
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

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        components: {},

        computed: {
            ...mapGetters([
                'session'
            ]),
        },

        methods: {
            handleButtonClick() {
                this.session.redirectToSignIn();
            }
        }
    };
</script>
