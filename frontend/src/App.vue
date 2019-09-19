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
            to="/home"
            :icon="icons.home"
            text="Home"
          />
          <a-menu-item
            to="/about"
            :icon="icons.about"
            text="About"
          />
          <v-divider />
          <v-btn
            icon
            color="primary"
            class="mt-2 ml-2 unfocusable"
            small
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
    >
      <img
        class="mr-2"
        height="38"
        src="@/assets/logo.svg"
        width="38"
      >
      <v-toolbar-title class="headline text-uppercase hidden-sm-and-down">
        <span class="font-weight-light">Valley</span>
        <span>Tech</span>
        <span class="font-weight-light">Con.19</span>
      </v-toolbar-title>
      <v-toolbar-title class="headline text-uppercase hidden-md-and-up">
        VTC.19
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      app
      class="primary"
      fixed
      inset
    >
      <span class="white--text mx-2">
        &copy; {{ copy }} Harrisonburg Economic Development, All Rights Reserved | 
        <a href="https://github.com/morphatic/valley-tech-con">Demo App</a>
        built by <a href="https://morphatic.com">Morphatic</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  import {
    mdiChevronLeft,
    mdiChevronRight,
    mdiHome,
    mdiInformation
  } from '@mdi/js'
  import { mapActions, mapGetters } from 'vuex'
  import AMenuItem from '@/components/AMenuItem'
  export default {
    name: 'App',
    components: {
      AMenuItem
    },
    data: () => ({
      icons: {
        about: mdiInformation,
        home: mdiHome,
        left: mdiChevronLeft,
        right: mdiChevronRight
      }
    }),
    computed: {
      ...mapGetters('common', ['navDrawerIsMini', 'navDrawerIsOpen']),
      copy () {
        const now = new Date().getFullYear()
        return now === 2019 ? now : `2019-${now}`
      }
    },
    methods: {
      ...mapActions('common', ['toggleNavDrawerMini', 'toggleNavDrawerOpen'])
    }
  }
</script>
