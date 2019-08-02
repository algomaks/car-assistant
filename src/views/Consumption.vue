<template>
  <v-container>
        <v-layout>
            <v-flex xs12 md6 offset-md3>
                <h1>Fuel Consumption</h1>
                <p>Log every refuel you make and track your average fuel consumption.</p>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs12 md6 offset-md3>

                <v-card tile>
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-on="on"
                                color="blue darken-3"
                                dark
                                absolute
                                top
                                right
                                fab
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title>
                                <span class="headline">Log fuel consumption</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 md6>
                                            <v-text-field v-model="km" label="Current odometer value" type="number" value="1" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md6>
                                            <v-text-field v-model="litre" label="Amount refueled" type="number" value="1" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="handleDialogClose">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="handleDialogSave">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-list>
                        <!-- <v-subheader>Monday</v-subheader> -->

                        <v-list-item
                            two-line
                            v-for="(item, i) in itemList"
                            :key="i"
                        >
                            <v-list-item-avatar>
                                <v-icon>mdi-pencil</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.km }} km - {{ item.litre }} l</v-list-item-title>
                                <!-- <v-list-item-subtitle>{{ item.date }}</v-list-item-subtitle> -->
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="removeItem(item)">
                                    <v-icon color="red">mdi-close</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as uuid from 'uuid/v4';
    import { mapGetters, mapMutations, mapActions } from "vuex";

    export default {
        created() {
            this.session.getFile(
                '/consumption.txt',
                {decrypt: true}
            )
                .then((json) => {
                    if (json) {
                        this.items = JSON.parse(json);
                    }

                    console.log('Loaded.')
                })
                .catch((err) => {
                    console.error(err);
                })
            ;
        },

        data: () => ({
            dialog: false,

            km: null,
            litre: null,
            date: null,

            items: [],
        }),

        computed: {
            ...mapGetters([
                'session',
                'username'
            ]),

            itemList() {
                return this.items;
            }
        },

        methods: {
            handleDialogSave() {
                this.dialog = false;

                if (!this.km || !this.litre) {
                    return;
                }

                this.items.push({
                    id: uuid(),
                    km: this.km,
                    litre: this.litre,
                    date: new Date()
                });

                this.km = null;
                this.litre = null;

                this.updateBlockchain();
            },

            handleDialogClose() {
                this.dialog = false;
            },

            removeItem(item) {
                this.items = this.items.filter((x) => {
                    return x.id !== item.id;
                });

                this.updateBlockchain();
            },

            updateBlockchain() {
                this.session.putFile(
                    '/consumption.txt',
                    JSON.stringify(this.items),
                    {encrypt: true}
                )
                    .then(() => {
                        console.log('Saved.');
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                ;
            }
        }
    }
</script>
