<template>
  <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" class="text-left">
                <h1>Fuel Consumption</h1>
                <p>Log every refuel you make and track your average fuel consumption.</p>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="12" md="8" class="text-left">
                <v-card>
                    <v-card-title>Average fuel consumption</v-card-title>

                    <v-card-text v-if="consumption > 0">
                        1 liter per {{ consumption }} km
                    </v-card-text>

                    <v-card-text v-if="consumption == 0">
                        Not enough data.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="12" md="3">
                <v-text-field
                    v-model="odometer"
                    type="number"
                    label="Odometer value (km)"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
                <v-text-field
                    v-model="amount"
                    type="number"
                    label="Amount refueled (liters)"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
                <v-btn @click="save" color="primary" block>Save</v-btn>
            </v-col>
        </v-row>

        <v-row justify="center" align="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-list>
                        <v-list-item
                            two-line
                            v-for="(item, i) in itemList"
                            :key="i"
                        >
                            <v-list-item-content>
                                <v-list-item-title>At {{ item.odometer }} km, refueled {{ item.amount }} liters</v-list-item-title>
                                <v-list-item-subtitle>{{ format(item.date) }}</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="removeItem(item)">
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import * as uuid from 'uuid/v4';
    import dayjs from 'dayjs';
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
            odometer: 0,
            amount: 0,
            items: [],
        }),

        computed: {
            ...mapGetters([
                'session',
                'isLogged'
            ]),

            itemList() {
                return this.items;
            },

            consumption() {
                if (this.items.length < 2) {
                    return 0;
                }

                const values = [];

                for (let i=0; i < this.items.length - 1; i++) {
                    const distanceDiff = this.items[i+1].odometer - this.items[i].odometer;
                    const amountDiff = this.items[i].amount;

                    values.push(distanceDiff / amountDiff);
                }

                let x = 0;

                for (const value of values) {
                    x += value;
                }

                return x / values.length;
            }
        },

        methods: {
            save() {
                if (!this.odometer || !this.amount) {
                    return;
                }

                this.items.push({
                    id: uuid(),
                    odometer: this.odometer,
                    amount: this.amount,
                    date: new Date()
                });

                this.odometer = 0;
                this.amount = 0;

                this.updateBlockchain();
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
            },

            format(date) {
                return dayjs(date).format('D MMMM, YYYY');
            }
        }
    }
</script>
