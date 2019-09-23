<template>
  <v-btn
    absolute
    color="#1da1f2cc"
    :data-text="text"
    fab
    :href="link"
    right
    style="transform:translate(32px, 43px);z-index:10;"
    target="_blank"
    top
    x-small
  >
    <v-icon color="white" size="28px">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
  import { mdiTwitter } from '@mdi/js'
  export default {
    name: 'TheTweetButton',
    props: {
      hashtag: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      icon: mdiTwitter,
      link: 'https://twitter.com/intent/tweet?text=',
      text: ''
    }),
    mounted () {
      this.text = [...this.hashtag, '#ValleyTechCon19'].join(' ')
      this.link += encodeURIComponent(this.text)
    }
  }
</script>
