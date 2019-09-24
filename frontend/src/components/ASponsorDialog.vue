<template>
  <v-dialog
    v-model="showDialog"
    max-width="650px"
    scrollable
  >
    <template v-slot:activator="{ attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-content>
          <v-list-item-subtitle v-if="!hideLead">
            Sponsored by:
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-img
              :alt="`${sponsor.name}`"
              contain
              :src="sponsor.logo"
            />
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-text class="pt-8">
        <v-row>
          <v-col cols="12">
            <a :href="sponsor.url" target="_blank">
              <v-img
                :alt="`${sponsor.name}`"
                class="mx-auto"
                max-width="450px"
                :src="sponsor.logo"
              />
            </a>
          </v-col>
          <v-col cols="12" style="text-align:center;">
            <h2 class="headline primary--text mb-2">
              {{ sponsor.level }}
              <span class="secondary--text">Sponsor</span>
            </h2>
            <h1 class="display-1">
              <a
                :href="sponsor.url"
                style="text-decoration:none;"
                target="_blank"
              >
                {{ sponsor.name }}
              </a>
            </h1>
          </v-col>
          <v-col cols="12">
            <v-banner
              v-if="sponsor.isVendor"
              class="secondary lighten-3 font-weight-black mb-8"
            >
              Come visit our table in the main hall!
            </v-banner>
            <div v-if="sponsor.description" v-html="sponsor.description" />
            <div v-if="events && events.length > 0">
              <h3 class="subtitle-1 font-weight-bold">
                Sponsored Events
              </h3>
              <v-list max-width="100%">
                <an-event-dialog
                  v-for="event in events"
                  :key="event._id"
                  :event="event"
                />
              </v-list>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="grey lighten-4" @click="showDialog = false">
        <v-row class="ma-0">
          <v-col style="text-align:center;">
            <v-btn color="primary" text>
              Dismiss
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import AnEventDialog from '@/components/AnEventDialog'
  export default {
    name: 'ASponsorDialog',
    components: {
      'an-event-dialog': AnEventDialog
    },
    props: {
      sponsor: {
        type: Object,
        default: () => ({}),
        required: true
      },
      hideLead: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      events: [],
      showDialog: false
    }),
    mounted () {
      const { Event } = this.$FeathersVuex.api
      this.events = Event.findInStore({ query: { 'sponsor._id': this.sponsor._id } }).data
    }
  }
</script>

<style>

</style>
