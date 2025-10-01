<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-900 text-white font-poppins text-center space-y-6">
    <h1 class="text-5xl font-extrabold">Champions League App</h1>
    <p class="max-w-xl text-gray-300">
      Explora los equipos, revisa el fixture de cada club y sigue el torneo más emocionante de Europa.
    </p>
    <router-link
      to="/teams"
      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
    >
      Ver Equipos
    </router-link>
  </div>
</template>
