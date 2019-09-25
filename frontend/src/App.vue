<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      :mini-variant="navDrawerIsMini"
      :value="navDrawerIsOpen || false"
    >
      <v-col class="fill-height">
        <v-list>
          <a-menu-item
            to="/"
            :icon="icons.home"
            text="Home"
          />
          <a-menu-item
            to="/sponsors"
            :icon="icons.sponsor"
            text="Sponsors"
          />
          <a-menu-item
            to="/agenda"
            :icon="icons.agenda"
            text="Agenda"
          />
          <v-divider />
          <v-btn
            icon
            color="primary"
            class="mt-2 ml-2 unfocusable"
            name="collapse navigation drawer button"
            @click="toggleNavDrawerMini"
          >
            <v-icon>{{ navDrawerIsMini ? icons.right : icons.left }}</v-icon>
          </v-btn>
        </v-list>
      </v-col>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      class="secondary"
      style="z-index:20;"
    >
      <v-app-bar-nav-icon
        name="toggle navigation drawer button"
        class="unfocusable"
        @click.stop="toggleNavDrawerOpen"
      />
      <v-toolbar-title class="white--text text-uppercase hidden-sm-and-down" style="font-size:2rem">
        <img
          alt="Valley Tech Con 2019"
          class="mt-3"
          height="32"
          src="@/assets/vtc-logo-wide.svg"
        >
      </v-toolbar-title>
      <v-toolbar-title class="headline text-uppercase hidden-md-and-up">
        <img
          alt="Valley Tech Con 2019"
          class="mt-2"
          height="32"
          src="@/assets/vtc-logo.svg"
        >
      </v-toolbar-title>
      <v-spacer />
      <v-icon
        v-if="isOnline"
        color="white"
      >
        {{ icons.online }}
      </v-icon>
      <v-icon
        v-if="isOffline"
        color="warning"
      >
        {{ icons.offline }}
      </v-icon>
    </v-app-bar>
    <v-content>
      <v-container class="pa-6">
        <router-view />
      </v-container>
    </v-content>
    <v-footer
      app
      class="primary"
      fixed
      inset
      style="z-index:20;"
    >
      <span class="white--text mx-2">
        &copy; {{ copy }} Harrisonburg Economic Development, All Rights Reserved |
        <a class="white--text" href="https://github.com/morphatic/valley-tech-con">Demo App</a>
        built by <a class="white--text" href="https://morphatic.com">Morphatic</a>
      </span>
    </v-footer>
    <v-overlay
      :value="loading"
      opacity=".8"
      style="z-index:100;"
    >
      <div style="text-align:center;">
        <v-progress-circular
          color="yellow lighten-3"
          indeterminate
          size="64"
        />
        <div class="yellow--text text--lighten-3 title mt-4">
          Loading conference data...
        </div>
      </div>
    </v-overlay>
  </v-app>
</template>

<script>
  import {
    mdiChevronLeft,
    mdiChevronRight,
    mdiHome,
    mdiMedal,
    mdiTimelineTextOutline,
    mdiUpdate,
    mdiWifi,
    mdiWifiOff
  } from '@mdi/js'
  import { VueOfflineMixin } from 'vue-offline'
  import { mapActions, mapGetters } from 'vuex'
  import AMenuItem from '@/components/AMenuItem'
  import { EventBus } from '@/bus'
  export default {
    name: 'App',
    components: {
      AMenuItem
    },
    mixins: [VueOfflineMixin],
    data: () => ({
      bus: EventBus,
      icons: {
        sponsor: mdiMedal,
        agenda: mdiTimelineTextOutline,
        home: mdiHome,
        left: mdiChevronLeft,
        offline: mdiWifiOff,
        online: mdiWifi,
        now: mdiUpdate,
        right: mdiChevronRight
      },
      loading: true
    }),
    computed: {
      ...mapGetters('common', ['navDrawerIsMini', 'navDrawerIsOpen']),
      copy () {
        const now = new Date().getFullYear()
        return now === 2019 ? now : `2019-${now}`
      }
    },
    created () {
      this.$on('online', function () {
        // set the status in localstorage
        this.$offlineStorage.set('is-online', true)
        // check to see if we have any reviews to send
        let reviews = this.$offlineStorage.get('reviews') || []
        if (reviews.length > 0) {
          // convert the reviews back into JSON
          reviews = reviews.map(r => JSON.parse(r))
          // yes we have reviews, so try to send them to the API
          this.$store.dispatch('reviews/create', reviews).then(
            function (created) {
              if (created.length === reviews.length) {
                // they were all created, so reset the value in the store
                this.$offlineStorage.set('reviews', [])
              }
            }.bind(this)
          )
        }
      }.bind(this))
      this.$on('offline', function () {
        this.$offlineStorage.set('is-online', false)
      }.bind(this))
      this.bus.$on('itemsLoaded', function () {
        this.loading = false
      }.bind(this))
    },
    methods: {
      ...mapActions('common', ['toggleNavDrawerMini', 'toggleNavDrawerOpen'])
    }
  }
</script>

<style lang="sass">
.v-content
  background: linear-gradient(to bottom, rgba(255,255,255,1) 66%,rgba(231,237,249,1) 100%)
  background-attachment: fixed
</style>
