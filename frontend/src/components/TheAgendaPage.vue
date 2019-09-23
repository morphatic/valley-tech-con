<template>
  <v-row>
    <v-col cols="12">
      <h2 class="display-1 primary--text">
        Agenda
      </h2>
    </v-col>
    <v-col class="mb-8" cols="12">
      <v-timeline :dense="dense">
        <v-timeline-item
          v-for="event in events"
          :key="event._id"
          :icon="getIcon(event)"
          :color="getIconColor(event)"
        >
          <div slot="opposite" class="primary--text text-uppercase">
            <span class="time body-2 font-weight-bold">{{ getTime(event) }}</span><br>
            <span class="caption">{{ event.room }}</span><br>
            <span
              v-if="event.track"
              class="caption font-weight-bold"
              :style="{ color: getIconColor(event) }"
            >
              {{ event.track }}
            </span>
          </div>
          <!-- <div v-if="event.room === 'Appalachian Room A'">
            <h3 class="heading">
              {{ event.section }}
            </h3>
            <v-divider class="pb-4" />
          </div> -->
          <v-card class="elevation-2" style="position:relative;overflow:visible;">
            <v-card-title>
              <h3
                class="subtitle-1"
                style="word-break:break-word;"
                v-html="event.name"
              />
            </v-card-title>
            <v-card-text>
              <div v-if="dense" class="primary--text text-uppercase">
                <span class="time body-2 font-weight-bold">{{ getTime(event) }}</span>&nbsp;
                <span class="caption">{{ event.room }}</span><br>
                <span
                  v-if="event.track"
                  class="caption font-weight-bold"
                  :style="{ color: getIconColor(event) }"
                >
                  {{ event.track }}
                </span>
              </div>
              <v-list v-if="event.speakers && event.speakers.length > 0" max-width="100%">
                <a-speaker-dialog
                  v-for="speaker in event.speakers"
                  :key="speaker._id"
                  :speaker="speaker"
                />
                <an-event-dialog :event="event" :teaser="true" />
              </v-list>
              <v-list v-if="event.sponsor" max-width="100%">
                <a-sponsor-dialog :sponsor="event.sponsor" />
              </v-list>
              <the-reviews-widget :event="event" />
            </v-card-text>
            <the-rating-dialog :event="event" />
            <the-tweet-button :hashtag="[event.hashtag, event.name]" />
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-row>
</template>

<script>
  import { format } from 'date-fns'
  import {
    mdiAccountBadgeHorizontalOutline,
    mdiAccountOutline,
    mdiFoodAppleOutline,
    mdiWeatherSunny,
    mdiHumanGreeting,
    mdiGlassMugVariant
  } from '@mdi/js'
  import { EventBus } from '@/bus'
  import AnEventDialog from '@/components/AnEventDialog'
  import ASpeakerDialog from '@/components/ASpeakerDialog'
  import ASponsorDialog from '@/components/ASponsorDialog'
  import TheRatingDialog from '@/components/TheRatingDialog'
  import TheReviewsWidget from '@/components/TheReviewsWidget'
  import TheTweetButton from '@/components/TheTweetButton'
  export default {
    name: 'TheAgendaPage',
    components: {
      AnEventDialog,
      ASpeakerDialog,
      ASponsorDialog,
      TheRatingDialog,
      TheReviewsWidget,
      TheTweetButton
    },
    data: () => ({
      bus: EventBus,
      events: [],
      icons: {
        morning: mdiWeatherSunny,
        networking: mdiGlassMugVariant,
        register: mdiAccountBadgeHorizontalOutline,
        snack: mdiFoodAppleOutline,
        speaker: mdiAccountOutline,
        welcome: mdiHumanGreeting
      }
    }),
    computed: {
      dense () {
        return ['xs', 'sm'].includes(this.$vuetify.breakpoint.name)
      }
    },
    created () {
      const { Event } = this.$FeathersVuex.api
      this.events = Event.findInStore({ query: { $limit: 50, $sort: { start: 1, room: 1 } } }).data
      // this.bus.$on('goToNow', () => {
      //   const now = new Date()

      // })
    },
    methods: {
      getIcon (event) {
        // does this event have speakers?
        if (event.speakers[0]) {
          return this.icons.speaker
        } else {
          // no speakers, choose icon by event name
          switch (event.section) {
            case 'Registration': return this.icons.register
            case 'Mid-morning Snack': return this.icons.snack
            case 'Welcome': return this.icons.welcome
            case 'Networking Event': return this.icons.networking
            default: return this.icons.morning
          }
        }
      },
      getIconColor (event) {
        if (event.track) {
          switch (event.track) {
            case 'Business Impact of Technology': return '#16d0ff'
            case 'Growing Your Technology Business': return '#39b54a'
            case 'Technical Topic for Practitioners': return '#e02b20'
            default: return 'primary'
          }
        }
        return 'primary'
      },
      getTime (event) {
        const start = (event.start instanceof Date && event.start) || new Date(event.start)
        const end = (event.end instanceof Date && event.end) || new Date(event.end)
        return `${format(start, 'h:mma')} - ${format(end, 'h:mma')}`
      }
    }
  }
</script>

<style lang="sass">
.title
  word-break: break-word
.v-list-item
  padding: 0
</style>
