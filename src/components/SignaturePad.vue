<template>
    <div class="signature-pad">
      <label class="form-label"></label>
      <canvas ref="canvas" class="signature-canvas"></canvas>
      <div class="button-group mt-2">
        <button type="button" class="btn btn-outline-danger border-2 me-2" @click="clearCanvas">Təmizlə</button>
        <button type="button" class="btn btn-outline-success border-2" @click="saveSignature">Təsdiqlə</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineEmits } from 'vue';
  import Swal from 'sweetalert2';

  const canvas = ref(null);
  const emit = defineEmits(['save', 'close']); // Yeni emit əlavə edildi
  
  let ctx = null;
  
  onMounted(() => {
    const canvasElement = canvas.value;
    canvasElement.width = 400; // Canvas genişliyi
    canvasElement.height = 200; // Canvas hündürlüyü
    ctx = canvasElement.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
  
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    function getMousePos(canvas, evt) {
      const rect = canvas.getBoundingClientRect();
      let x, y;
      
      if (evt.type.includes('touch')) {
        x = evt.touches[0].clientX - rect.left;
        y = evt.touches[0].clientY - rect.top;
      } else {
        x = evt.clientX - rect.left;
        y = evt.clientY - rect.top;
      }
      
      return { x, y };
    }
  
    function startDrawing(e) {
      e.preventDefault(); // Scroll olmanın qarşısını al
      isDrawing = true;
      const pos = getMousePos(canvasElement, e);
      lastX = pos.x;
      lastY = pos.y;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
    }
  
    function draw(e) {
      e.preventDefault(); // Scroll olmanın qarşısını al
      if (isDrawing) {
        const pos = getMousePos(canvasElement, e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
      }
    }
  
    function stopDrawing() {
      isDrawing = false;
      ctx.closePath();
    }
  
    // Mouse events
    canvasElement.addEventListener('mousedown', startDrawing);
    canvasElement.addEventListener('mousemove', draw);
    canvasElement.addEventListener('mouseup', stopDrawing);
    canvasElement.addEventListener('mouseleave', stopDrawing);
  
    // Touch events
    canvasElement.addEventListener('touchstart', startDrawing, { passive: false });
    canvasElement.addEventListener('touchmove', draw, { passive: false });
    canvasElement.addEventListener('touchend', stopDrawing);
    canvasElement.addEventListener('touchcancel', stopDrawing);
  });
  
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  
  function isCanvasEmpty() {
    const canvasElement = canvas.value;
    const blank = document.createElement('canvas');
    blank.width = canvasElement.width;
    blank.height = canvasElement.height;
    return canvasElement.toDataURL() === blank.toDataURL();
  }

  function saveSignature() {
    if (isCanvasEmpty()) {
        Swal.fire({
        icon: 'warning',
        title: 'Diqqət!',
        text: 'Canvas boşdur. İmza çəkin!',
        confirmButtonText: 'Bağla',
        });
        return;
    }
    const signatureData = canvas.value.toDataURL('image/png');
    emit('save', signatureData); // Çəkilən imzanı valideynə göndər
    emit('close'); // Modal-ı bağla

    // Uğurlu mesaj göstər
    Swal.fire({
        icon: 'success',
        title: 'Uğurlu!',
        text: 'İmza əlavə olundu.',
        confirmButtonText: 'Bağla',
    });

    clearCanvas(); // Canvas-ı təmizlə
  }
  </script>
  
  <style scoped>
  .signature-canvas {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
    height: 200px;
    cursor: crosshair;
  }
  
  .button-group button {
    width: 100px;
  }
  </style>