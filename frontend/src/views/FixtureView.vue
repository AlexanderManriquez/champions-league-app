<template>
  <div class="p-6 min-h-screen bg-gray-900 text-white font-poppins">
    <!-- Botón regresar -->
    <router-link
      to="/teams"
      class="inline-block mb-6 px-4 py-2 bg-primary text-gray-900 font-bold rounded hover:bg-yellow-500 transition"
    >
      ← Volver a Equipos
    </router-link>

    <!-- Spinner de carga -->
    <transition name="fade">
      <div v-if="loading" class="flex items-center justify-center h-96">
        <svg
          class="animate-spin h-12 w-12 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    </transition>

    <!-- Contenido principal -->
    <transition name="slide-fade">
      <div v-if="!loading">
        <!-- Título del equipo -->
        <h1 class="text-3xl font-bold text-center mb-6">
          {{ teamName }} Fixture
        </h1>

        <!-- Grid de partidos -->
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="match in matches"
            :key="match.id"
            class="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow hover:shadow-xl transition"
          >
            <!-- Equipo Local -->
            <div class="flex flex-col items-center space-y-2">
              <img :src="match.home_team.logo_url" alt="" class="w-16 h-16" />
              <span class="font-bold text-center">{{ match.home_team.name }}</span>
            </div>

            <!-- Resultado o horario/estadio -->
            <div class="text-center text-primary font-bold my-2">
              <div v-if="match.home_score !== null && match.away_score !== null">
                {{ match.home_score }} - {{ match.away_score }}<br />
                <div class="text-sm text-gray-400">
                  {{ new Date(match.match_date).toLocaleString() }}
                </div>
              </div>
              <div v-else class="text-sm text-gray-400">
                {{ new Date(match.match_date).toLocaleString() }}<br />
                {{ match.stadium }}
              </div>
            </div>

            <!-- Equipo Visitante -->
            <div class="flex flex-col items-center space-y-2">
              <img :src="match.away_team.logo_url" alt="" class="w-16 h-16" />
              <span class="font-bold text-center">{{ match.away_team.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FixtureView",
  data() {
    return {
      matches: [],
      teamName: "",
      loading: true, // nuevo estado de carga
    };
  },
  async created() {
    try {
      const teamId = this.$route.params.teamId;
      const res = await axios.get(`http://localhost:4000/api/fixtures/${teamId}`);
      this.matches = res.data;

      if (this.matches.length > 0) {
        const match = this.matches[0];
        this.teamName =
          match.home_team.id == teamId ? match.home_team.name : match.away_team.name;
      }
    } catch (error) {
      console.error("Error al cargar fixture:", error);
    } finally {
      // simulamos un pequeño delay para que el spinner se note
      setTimeout(() => {
        this.loading = false;
      }, 800);
    }
  },
};
</script>

<style scoped>
/* Fade para spinner */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide + fade para el contenido */
.slide-fade-enter-active {
  transition: all 0.7s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
