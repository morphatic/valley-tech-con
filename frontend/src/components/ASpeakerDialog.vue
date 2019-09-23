<template>
  <v-dialog
    v-model="showDialog"
    max-width="800px"
    scrollable
  >
    <template v-slot:activator="{ attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-avatar v-if="$vuetify.breakpoint.name !== 'xs'">
          <v-img
            v-if="speaker.photo"
            :alt="`${speaker.first_name} ${speaker.last_name}`"
            :src="`/img/avatars/${speaker.last_name.toLowerCase().replace('\'', '-')}.png`"
          />
          <v-icon
            v-else
            color="primary"
            v-text="icons.speaker"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ speaker.first_name }} {{ speaker.last_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ speaker.title }} at {{ speaker.org }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-text class="pt-8">
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col cols="12" style="text-align:center;">
                <v-avatar v-if="speaker.photo" size="100%">
                  <v-img
                    :alt="`${speaker.first_name} ${speaker.last_name}`"
                    :src="`/img/speakers/${speaker.last_name.toLowerCase().replace('\'', '-')}.png`"
                  />
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" style="text-align:center;">
                <a
                  v-if="speaker.linkedin"
                  :href="speaker.linkedin"
                  target="_blank"
                >
                  <v-icon
                    size="48px"
                    style="color:#0077b5"
                    v-html="icons.linkedin"
                  />
                </a>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="8">
            <h1 class="display-1 primary--text mb-2">
              {{ speaker.first_name }}
              <span class="secondary--text">{{ speaker.last_name }}</span>
            </h1>
            <h2 class="title mb-8">
              {{ speaker.title }},
              <a
                :href="speaker.org_url"
                target="_blank"
              >
                {{ speaker.org }}
              </a>
            </h2>
            <div v-html="speaker.bio" />
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
  import { mdiLinkedinBox, mdiAccountOutline } from '@mdi/js'
  export default {
    name: 'ASpeakerDialog',
    props: {
      speaker: {
        type: Object,
        default: () => ({}),
        required: true
      }
    },
    data: () => ({
      icons: {
        linkedin: mdiLinkedinBox,
        speaker: mdiAccountOutline
      },
      showDialog: false
    })
  }
</script>

<style>

</style>
