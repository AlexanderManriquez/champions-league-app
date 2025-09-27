<template>
  <router-link :to="`/fixture/${team.id}`">
    <div
      class="group cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-xl transition flex flex-col items-center justify-center"
    >
      <img
        :src="team.logo_url"
        alt="logo"
        class="w-20 h-20 mx-auto transition"
        :class="isHome ? 'filter grayscale group-hover:grayscale-0' : ''"
      />
      <h3 class="mt-2 text-center font-bold text-lg">{{ team.name }}</h3>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "TeamCard",
  props: {
    team: Object,
    isHome: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

