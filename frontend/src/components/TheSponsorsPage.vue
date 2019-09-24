<template>
  <v-row>
    <v-col cols="12">
      <h2 class="display-1 primary--text">
        Sponsors and Exhibit Table <span class="secondary--text">Vendors</span>
      </h2>
      <p>
        Thank you to our generous sponsors who make Valley TechCon possible!
      </p>
      <h3 class="headline primary--text">
        Platinum <span class="secondary--text">Sponsor</span>
      </h3>
      <v-divider />
      <v-row class="my-8">
        <v-col cols="10" offset="1">
          <a-sponsor-dialog
            v-for="sponsor in platinum"
            :key="sponsor._id"
            :sponsor="sponsor"
            hide-lead
          />
        </v-col>
      </v-row>
      <h3 class="headline primary--text">
        Gold <span class="secondary--text">Sponsors</span>
      </h3>
      <v-divider />
      <v-row
        v-for="sponsor in gold"
        :key="sponsor._id"
        class="my-8"
      >
        <v-col cols="6" offset="3">
          <a-sponsor-dialog :sponsor="sponsor" hide-lead />
        </v-col>
      </v-row>
      <h3 class="headline primary--text">
        Silver <span class="secondary--text">Sponsors</span>
      </h3>
      <v-divider />
      <v-row justify="space-around" class="my-8">
        <v-col
          v-for="sponsor in silver"
          :key="sponsor._id"
          cols="4"
        >
          <a-sponsor-dialog :sponsor="sponsor" hide-lead />
        </v-col>
      </v-row>
      <h3 class="headline primary--text">
        Bronze <span class="secondary--text">Sponsors</span>
      </h3>
      <v-divider />
      <v-row justify="space-around" class="my-8">
        <v-col
          v-for="sponsor in bronze"
          :key="sponsor._id"
          cols="2"
        >
          <a-sponsor-dialog :sponsor="sponsor" hide-lead />
        </v-col>
      </v-row>
      <h3 class="headline primary--text">
        Exhibit Table <span class="secondary--text">Vendors</span>
      </h3>
      <v-divider />
      <v-row class="my-8">
        <v-col
          v-for="sponsor in vendors"
          :key="sponsor._id"
          class="px-12"
          cols="4"
        >
          <a-sponsor-dialog :sponsor="sponsor" hide-lead />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

  <script>
  import ASponsorDialog from '@/components/ASponsorDialog'
  export default {
    name: 'TheSponsorsPage',
    components: {
      ASponsorDialog
    },
    data: () => ({
      bronze: null,
      gold: null,
      platinum: null,
      silver: null,
      vendors: null
    }),
    created () {
      const sponsors = this.$store.getters['sponsors/find']
      this.platinum = sponsors({ query: { level: 'Platinum' } }).data
      this.gold = sponsors({ query: { level: 'Gold' } }).data
      this.silver = sponsors({ query: { level: 'Silver' } }).data
      this.bronze = sponsors({ query: { level: 'Bronze' } }).data
      this.vendors = sponsors({ query: { isVendor: true } }).data
    }
  }
</script>
