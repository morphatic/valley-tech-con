<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      :mini-variant="navDrawerIsMini"
      :value="navDrawerIsOpen"
    >
      <v-col class="fill-height">
        <v-list>
          <a-menu-item
            to="/"
            :icon="icons.home"
            text="Home"
          />
          <a-menu-item
            to="/about"
            :icon="icons.about"
            text="About"
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
      <v-btn
        v-if="$route.path === '/agenda'"
        icon
        @click="bus.$emit('goToNow')"
      >
        <v-icon color="white">
          {{ icons.now }}
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="pr-6">
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
    mdiInformation,
    mdiTimelineTextOutline,
    mdiUpdate
  } from '@mdi/js'
  import { mapActions, mapGetters } from 'vuex'
  import AMenuItem from '@/components/AMenuItem'
  import { EventBus } from '@/bus'
  export default {
    name: 'App',
    components: {
      AMenuItem
    },
    data: () => ({
      bus: EventBus,
      icons: {
        about: mdiInformation,
        agenda: mdiTimelineTextOutline,
        home: mdiHome,
        left: mdiChevronLeft,
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
