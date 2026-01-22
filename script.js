// Selección de elementos
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');
const urlInput = document.getElementById('urlInput');
const editorArea = document.getElementById('editorArea');
const downloadBtn = document.getElementById('downloadBtn');

// Variables de estado
let img = new Image();

// --- Manejadores de Eventos ---

// Carga de archivo local
fileInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            img.onload = startEditor;
            img.src = event.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// Carga por URL
urlInput.addEventListener('change', function() {
    const url = this.value;
    if (!url) return;
    img.crossOrigin = "anonymous";
    img.onload = startEditor;
    img.onerror = () => alert("Error de carga. Verifica la URL o los permisos de la imagen.");
    img.src = url;
});

// Listener para redibujar en cada cambio de controles
document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', draw);
});

// Botón de descarga
downloadBtn.addEventListener('click', downloadIcon);

// --- Funciones Lógicas ---

function startEditor() {
    editorArea.classList.remove('hidden');
    draw();
}

function draw() {
    if (!img.src) return;

    const size = 512;
    const zoom = parseFloat(document.getElementById('zoom').value);
    const ox = parseInt(document.getElementById('posX').value);
    const oy = parseInt(document.getElementById('posY').value);
    
    ctx.clearRect(0, 0, size, size);
    
    // 1. Fondo base
    ctx.fillStyle = document.getElementById('bgColor').value;
    ctx.fillRect(0, 0, size, size);

    // 2. Círculo blanco decorativo
    if (document.getElementById('useCircle').checked) {
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.05)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(size/2, size/2, size * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; 
    }

    // 3. Aplicar Filtros
    const bright = document.getElementById('filtBright').value;
    const sat = document.getElementById('filtSat').value;
    const contrast = document.getElementById('filtContrast').value;
    ctx.filter = `brightness(${bright}%) saturate(${sat}%) contrast(${contrast}%)`;

    // 4. Dibujar Imagen con Proporción
    const aspect = img.width / img.height;
    let w = size * zoom, h = size * zoom;
    
    if (aspect > 1) {
        h = w / aspect;
    } else {
        w = h * aspect;
    }

    ctx.drawImage(img, (size - w) / 2 + ox, (size - h) / 2 + oy, w, h);
    
    // Limpiar filtros para futuros redibujados
    ctx.filter = 'none';
}

function downloadIcon() {
    const targetSize = parseInt(document.getElementById('targetSize').value);
    const format = document.getElementById('imgFormat').value;
    const ext = format.split('/')[1];

    // Canvas temporal para escalado
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = targetSize;
    tempCanvas.height = targetSize;
    const tempCtx = tempCanvas.getContext('2d');

    // Dibujar el contenido actual al tamaño deseado
    tempCtx.drawImage(canvas, 0, 0, 512, 512, 0, 0, targetSize, targetSize);

    // Descarga
    const link = document.createElement('a');
    link.download = `pwa-icon-${targetSize}.${ext}`;
    link.href = tempCanvas.toDataURL(format, 0.95);
    link.click();
}

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registrado'))
        .catch(err => console.log('Error al registrar SW', err));
    });
  }

  const shareBtn = document.getElementById('shareBtn');

// Verificar si el navegador soporta compartir archivos
if (!navigator.canShare || !navigator.share) {
    shareBtn.classList.add('hidden-api');
}

shareBtn.addEventListener('click', async () => {
    const targetSize = parseInt(document.getElementById('targetSize').value);
    const format = document.getElementById('imgFormat').value;
    const ext = format.split('/')[1];
    
    // 1. Crear el canvas temporal con el tamaño elegido (igual que en descarga)
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = targetSize;
    tempCanvas.height = targetSize;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0, 512, 512, 0, 0, targetSize, targetSize);

    // 2. Convertir Canvas a Blob (archivo binario)
    tempCanvas.toBlob(async (blob) => {
        const file = new File([blob], `pwa-icon-${targetSize}.${ext}`, { type: format });
        
        // 3. Crear el objeto de compartir
        const shareData = {
            files: [file],
            title: 'Mi Nuevo Icono PWA',
            text: 'He diseñado este icono con Icono Estudio.',
        };

        // 4. Intentar compartir
        try {
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                console.log('Icono compartido con éxito');
            } else {
                alert("Tu navegador no permite compartir este archivo.");
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    }, format);
});