<template>
  <div class="p-6 bg-gray-900 min-h-screen text-white font-poppins">
    <h1 class="text-4xl font-extrabold text-center mb-8">Champions League Teams</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
      <TeamCard
        v-for="team in teams"
        :key="team.id"
        :team="team"
      />
    </div>
  </div>
</template>

<script>
import TeamCard from "../components/TeamCard.vue";
import api from "../api.js";

export default {
  name: "Teams",
  components: { TeamCard },
  data() {
    return { teams: [] };
  },
  async created() {
    try {
      const res = await api.get("/teams");
      this.teams = res.data;
    } catch (err) {
      console.error("Error cargando equipos:", err);
    }
  },
};
</script>
