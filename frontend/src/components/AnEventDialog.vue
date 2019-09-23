<template>
  <v-dialog
    v-model="showDialog"
    content-class="overflow-visible"
    max-width="800px"
    scrollable
  >
    <template v-slot:activator="{ attrs, on }">
      <v-list-item
        v-bind="attrs"
        three-line
        v-on="on"
      >
        <v-list-item-avatar v-if="!teaser" color="primary">
          <v-icon
            color="white"
            v-text="icons.speaker"
          />
        </v-list-item-avatar>
        <v-list-item-content v-if="teaser">
          <v-list-item-subtitle style="word-break:break-word;">
            {{ excerpt }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="primary--text">
            Read more...
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-if="!teaser">
          <v-list-item-title v-html="event.name" />
          <v-list-item-subtitle>
            <span class="primary--text">{{ getTime(event) }}<span v-if="event.room">&mdash;{{ event.room }}</span></span>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ event.section }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card style="position: relative;overflow:visible;">
      <v-card-title class="blue-grey lighten-5" style="z-index:1;">
        <h1
          class="display-1"
          style="word-break:break-word;"
          v-html="event.name"
        />
      </v-card-title>
      <v-card-text class="pt-6">
        <v-row>
          <v-col cols="12">
            <div class="primary--text text-uppercase">
              <span class="time body-2 font-weight-bold">{{ getTime(event) }}</span>&nbsp;
              <span class="caption">{{ event.room }}</span><br>
              <span
                v-if="event.track"
                class="caption font-weight-bold"
                :style="{ color: getIconColor(event) }"
              >
                {{ event.track }}
              </span><br>
              <the-reviews-widget :ratings="reviews.map(r => r.rating)" />
            </div>
            <v-list v-if="event.speakers && event.speakers.length > 0" max-width="100%">
              <a-speaker-dialog
                v-for="speaker in event.speakers"
                :key="speaker._id"
                :speaker="speaker"
              />
            </v-list>
            <div v-html="event.description" />
            <div v-if="event.sponsor">
              <h3 class="heading">
                Event Sponsor
              </h3>
              <v-divider />
              <v-list v-if="event.sponsor" max-width="100%">
                <a-sponsor-dialog :sponsor="event.sponsor" />
              </v-list>
            </div>
          </v-col>
        </v-row>
        <the-rating-dialog :event="event" />
        <the-tweet-button :hashtag="[event.hashtag, event.name]" />
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
  import { mdiLinkedinBox, mdiAccountOutline } from '@mdi/js'
  import { format } from 'date-fns'
  import ASpeakerDialog from '@/components/ASpeakerDialog'
  import ASponsorDialog from '@/components/ASponsorDialog'
  import TheRatingDialog from '@/components/TheRatingDialog'
  import TheReviewsWidget from '@/components/TheReviewsWidget'
  import TheTweetButton from '@/components/TheTweetButton'
  export default {
    name: 'AnEventDialog',
    components: {
      ASpeakerDialog,
      ASponsorDialog,
      TheRatingDialog,
      TheReviewsWidget,
      TheTweetButton
    },
    props: {
      event: {
        type: Object,
        default: () => ({}),
        required: true
      },
      teaser: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      excerpt: '',
      icons: {
        linkedin: mdiLinkedinBox,
        speaker: mdiAccountOutline
      },
      reviews: [],
      showDialog: false
    }),
    computed: {
      trackColor () {
        switch (this.event.track) {
          case 'Business Impact of Technology': return { color: 'var(--v-biot-base)' }
          case 'Growing Your Technology Business': return { color: 'var(--v-gytb-base)' }
          case 'Technical Topic for Practitioners': return { color: 'var(--v-ttfp-base)' }
          default: return ''
        }
      }
    },
    mounted () {
      if (this.event.description) {
        this.excerpt = this.event.description.replace(/<\/?[^>]+(>|$)/g, '')
      }
      this.$store.dispatch('reviews/find', { query: { $limit: '-1', event: this.event._id } }).then(
        function (result) {
          this.reviews = result.data
        }.bind(this)
      ).catch(function (error) {
        console.log(error)
      })
    },
    methods: {
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

<style>

</style>
