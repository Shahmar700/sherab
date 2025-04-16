<script setup>
import { RouterView, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import { onMounted, nextTick } from 'vue'

function animateHeadings() {
  const headings = document.querySelectorAll('h3');
  headings.forEach((heading) => {
    heading.classList.remove('animated'); // Əvvəlki animasiyanı sil
    void heading.offsetWidth; // Reflow üçün
    heading.classList.add('animated'); // Animasiya sinifini əlavə et
  });
}

const router = useRouter();

onMounted(() => {
  animateHeadings();
});

// Səhifə dəyişdikdə animasiyanı yenidən işə sal
router.afterEach(() => {
  nextTick(() => {
    animateHeadings();
  });
});
</script>

<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px; /* Lazım olarsa yanlardan boşluq */
}
</style>