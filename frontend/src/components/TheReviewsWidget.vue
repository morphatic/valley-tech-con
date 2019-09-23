<template>
  <div>
    <v-rating
      v-model="avg"
      background-color="warning"
      class="pr-1"
      dense
      color="warning"
      half-increments
      readonly
      style="display:inline-block;vertical-align:2px;"
      x-small
    />
    <span class="caption grey--text text-lowercase">{{ summary }}</span>
  </div>
</template>

<script>
  export default {
    name: 'TheReviewsWidget',
    props: {
      event: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      avg () {
        const len = this.rates.length
        const av = this.rates.reduce((avg, r) => avg + (r / len), 0)
        return +av.toFixed(2)
      },
      rates () {
        const reviews = this.$store.getters['reviews/find']({ query: { event: this.event._id } })
        return reviews.data.map(r => r.rating)
      },
      summary () {
        const len = this.rates.length
        const label = len === 1 ? 'rating' : 'ratings'
        return `(${this.avg}, ${len} ${label})`
      }
    }
  }
</script>
