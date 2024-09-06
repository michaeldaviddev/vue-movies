<script setup>
import { ref, onMounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { getGenresMovieList } from '../services/tmdb'

// Define reactive variables
const genres = ref([])
const isLoading = ref(true)
const error = ref(null)

// Fetch data function
const fetchData = async () => {
  isLoading.value = true
  error.value = null

  try {
    genres.value = await getGenresMovieList()
  } catch (err) {
    error.value = 'Failed to fetch data: ' + err.message
    console.error('Failed to fetch data:', err)
  } finally {
    isLoading.value = false
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchData()
})
</script>

<template>
  <main>
    <TheWelcome />

    <!-- Show loading state -->
    <div v-if="isLoading">Loading...</div>

    <!-- Show error message -->
    <div v-if="error">{{ error }}</div>

    <!-- Display data if available -->
    <div v-if="!isLoading && !error">
      <pre>{{ genres }}</pre>
    </div>
  </main>
</template>
