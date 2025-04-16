<template>
  <div class="mt-5 pb-5">
    <h3 class="mb-4 pageHeading">Qurum əlavə et</h3>
    <form data-aos="fade-up">
      <!-- Ad -->
      <div class="mb-3">
        <label for="name" class="form-label">Ad</label>
        <input type="text" class="form-control" id="name" placeholder="Qurumun adı" />
      </div>

      <!-- Qurum növü -->
      <div class="mb-3">
        <label for="type" class="form-label">Qurum növü</label>
        <select class="form-select" id="type">
          <option value="özəl">Özəl şirkət</option>
          <option value="mağaza">Mağaza</option>
          <option value="fiziki">Fiziki şəxs</option>
          <option value="digər">Digər</option>
        </select>
      </div>

      <!-- Məsul şəxs -->
      <div class="mb-3">
        <label for="responsible" class="form-label">Məsul şəxs</label>
        <input type="text" class="form-control" id="responsible" placeholder="Məsul şəxsin adı" />
      </div>

      <!-- Telefon -->
      <div class="mb-3">
        <label for="phone" class="form-label">Telefon</label>
        <input type="text" class="form-control" id="phone" placeholder="Telefon nömrəsi" />
      </div>

      <!-- Mail -->
      <div class="mb-3"> 
        <label for="email" class="form-label">Mail</label>
        <input type="email" class="form-control" id="email" placeholder="E-poçt ünvanı" />
      </div>

      <!-- Adress -->
      <div class="mb-3">
        <label for="address" class="form-label">Adress</label>
        <input type="text" class="form-control" id="address" placeholder="Qurumun ünvanı" />
      </div>

      <!-- İstifadəçi -->
      <div class="mb-3">
        <label for="user" class="form-label">İstifadəçi</label>
        <input type="text" class="form-control" id="user" placeholder="Aktiv istifadəçi" disabled />
      </div>

      <!-- Yadda saxla düyməsi -->
      <button type="submit" class="customBtn mt-4 pageSubmitBtn">Yadda saxla</button>
    </form>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>