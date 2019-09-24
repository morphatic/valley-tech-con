<template>
  <v-row class="mb-12">
    <v-col class="pb-0" cols="12">
      <h2 class="display-1 primary--text mb-4">
        Welcome!
      </h2>
      <p>
        This is <strong>NOT</strong> the <a href="https://valleytechcon.com" target="_blank">offcial Valley Tech Con 2019 website</a>. This is a demo app built to show the capabilities of the "offline first" approach to app development. To find out more, attend the talk on this subject during Breakout Session III.
      </p>
    </v-col>
    <v-col class="pt-0" cols="12">
      <v-row justify="space-around">
        <v-col cols="6" md="4">
          <v-btn
            color="primary"
            x-large
            outlined
            to="/sponsors"
            width="100%"
          >
            <v-icon class="mr-2">
              {{ icons.sponsor }}
            </v-icon>
            Sponsors
          </v-btn>
        </v-col>
        <v-col cols="6" md="4">
          <v-btn
            color="primary"
            x-large
            outlined
            to="/agenda"
            width="100%"
          >
            <v-icon class="mr-2">
              {{ icons.agenda }}
            </v-icon>
            Agenda
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="headline secondary--text mb-4">
        What is "Offline First"?
      </h3>
      <p>
        "Offline first" is a philosophy or approach to modern app development that starts with the assumption that internet connections are flaky and unreliable. The primary concern is how to create an app that delivers useful functionality <em>regardless</em> of whether the user's device is currently connected to the internet. A great deal of this is accomplished by thoughtfully and aggressively caching images, stylesheets, JavaScript, and data as soon as the app is first loaded. Beyond that, the bulk of the effort involves figuring out how to sync the data stored locally with the data stored in the remote API. There are a number of different strategies. The "right" strategy will depend on the goals of the app.
      </p>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="headline secondary--text mb-4">
        What is a PWA?
      </h3>
      <p>
        A PWA (progressive web app) is a website with special JavaScript configured to allow it to mimic the look, feel, and behavior of a native (mobile) app. PWA's can be "installed" and have an icon on the home screen of most devices. They can deliver push notifications and interact with device hardware like cameras and GPS. Since they are just websites, they are inherently cross-platform (GREATLY saving development time), and since they are not native apps, they do NOT have to go through the approval processes to be listed in any of the app stores. If desired, they can easily be converted into native apps using tools like Cordova or Capacitor. Unless the app needs access to specialized hardware only available to a native app, a PWA is frequently the fastest, most frictionless way to get your app into the world.
      </p>
    </v-col>
    <v-col cols="12">
      <h3 class="headline secondary--text mb-4">
        How can I learn more?
      </h3>
      <p>
        Of course, the first recommendation is that you attend the talk being given by Morgan Benton (11:15-noon) at Valley Tech Con 2019. If you miss that, here are some links to get you started:
      </p>
      <ul>
        <li>
          <a href="https://slides.com/morphatic/offline-first" target="_blank">
            The slides from the talk
          </a>
        </li>
        <li>
          <a href="https://vtc.morphatic.com" target="_blank">
            This demo app
          </a>
        </li>
        <li>
          <a href="https://github.com/morphatic/valley-tech-con" target="_blank">
            The GitHub repo where the code for the app resides
          </a>
        </li>
        <li>
          <a href="http://offlinefirst.org/" target="_blank">
            The Offline First website (not particularly active, but a good intro)
          </a>
        </li>
        <li>
          <a href="https://auk.docs.feathersjs.com/guides/offline-first/readme.html" target="_blank">
            The (outdated) guide to using offline first with FeathersJS apps
          </a><br>
          Although this is outdated, the analysis of the strategies is still very sound and would be helpful to anyone wanting to implement this pattern.
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Introduction" target="_blank">
            Mozilla's MDN Introduction to PWAs
          </a>
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
  import { mdiMedal, mdiTimelineTextOutline } from '@mdi/js'
  export default {
    name: 'TheHomePage',
    data: () => ({
      icons: {
        agenda: mdiTimelineTextOutline,
        sponsor: mdiMedal
      }
    })
  }
</script>
