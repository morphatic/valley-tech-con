<template>
  <v-dialog
    v-model="showDialog"
    max-width="350px"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        absolute
        color="rgba(0,0,0,0.4)"
        fab
        right
        x-small
        style="transform: translate(32px, 3px);z-index:2"
        top
        v-on="on"
      >
        <v-icon color="warning" size="28px">
          {{ icons.star }}
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="secondary white--text mb-4">
        <h1 class="headline">
          Rate This Event
        </h1>
      </v-card-title>
      <v-card-text v-if="premature">
        We love your enthusiasm! But you can't rate an event until it has actually happened. 😄
      </v-card-text>
      <v-card-text v-else>
        <p>
          You are reviewing:
          <strong>{{ event.name }}</strong>.
        </p>
        <v-form ref="review-form" v-model="valid">
          <v-input
            v-model="review.rating"
            :rules="[v => v > 0 || 'Please rate the talk!']"
          >
            <v-rating
              v-model="review.rating"
              background-color="warning"
              color="warning"
              hover
              x-large
            />
          </v-input>
          <v-textarea
            v-model="review.text"
            hint="Specific things learned/helpful/missing/etc."
            label="Comments"
            outlined
          />
          <v-text-field
            v-if="!$store.state.common.email"
            v-model="review.email"
            hint="ONLY to prevent ballot-stuffing. You will NOT be sent any email."
            label="Email Address"
            outlined
            persistent-hint
            :rules="[v => (!!v && isEmail(v)) || 'Please enter a valid email address']"
            validate-on-blur
          />
        </v-form>
        <p>
          Thank you for your review! Note, comments will be visible publicly. Be nice! 😄
        </p>
      </v-card-text>
      <v-divider />
      <v-card-actions class="pa-4">
        <v-btn
          text
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="!premature"
          text
          color="primary"
          @click="submit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mdiStar } from '@mdi/js'
  import { VueOfflineMixin } from 'vue-offline'
  export default {
    name: 'TheRatingDialog',
    mixins: [VueOfflineMixin],
    props: {
      event: {
        type: Object,
        default: () => ({}),
        required: true
      }
    },
    data () {
      return {
        icons: {
          star: mdiStar
        },
        review: {
          email: null,
          event: this.event._id,
          rating: 0,
          text: ''
        },
        showDialog: false,
        valid: false
      }
    },
    computed: {
      premature () {
        const now = new Date()
        return now < this.event.start
      }
    },
    mounted () {
      this.review.email = this.$store.state.common.email
    },
    methods: {
      cancel () {
        !this.premature && this.reset()
        this.showDialog = false
      },
      isEmail (val) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
      },
      reset () {
        this.$refs['review-form'].reset()
      },
      submit () {
        // if the input is valid
        if (this.validate() && this.valid) {
          const { Review } = this.$FeathersVuex.api
          // has the email been saved in the store, i.e. is this the first time?
          if (!this.$store.state.common.email) {
            this.$store.commit('common/SET_EMAIL', this.review.email, { root: true })
          }
          // are we online?
          if (this.isOnline) {
            // yes, create a new review
            const review = new Review(this.review)
            // save the review
            review.save().then(
              function (success) {
                // close the form
                this.cancel()
              }.bind(this)
            ).catch(function (error) {
              if (error.name === 'Conflict') {
                console.log('looks like you already filled this one out!')
              }
              this.cancel()
            }.bind(this))
          } else {
            // we are offline
            // serialize the review
            const clone = JSON.stringify(this.review)
            // get any currently stored revies
            const reviews = this.$offlineStorage.get('reviews') || []
            // add the clone to the list
            reviews.push(clone)
            // then save the updated list in local storage
            this.$offlineStorage.set('reviews', reviews)
            // then close the form
            this.cancel()
          }
        }
      },
      validate () {
        return this.$refs['review-form'].validate()
      }
    }
  }
</script>
