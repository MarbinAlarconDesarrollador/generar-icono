# 🚀 Icono Estudio | PWA Icon Designer

![Logo Empresa](./img/logo_192x192.png)

**Icono Estudio** es una herramienta corporativa avanzada diseñada para la creación, edición y exportación de iconos para aplicaciones web progresivas (PWA). Permite a los diseñadores y desarrolladores ajustar logotipos de forma visual, aplicar filtros y exportar en múltiples formatos listos para producción.

---

## ✨ Características Principales

* **Edición Multi-Origen:** Sube imágenes desde tu ordenador o pega una URL directa.
* **Ajustes en Tiempo Real:** Control total sobre Zoom, Posición (X/Y) y Color de Fondo.
* **Filtros de Imagen:** Ajuste de Brillo, Contraste y Saturación directamente en el navegador.
* **Exportación Versátil:** Elige entre formato **PNG** (con transparencia) o **JPG** y diferentes tamaños estándar (192px, 512px, etc.).
* **Web Share API:** Envía tus diseños directamente a WhatsApp, Slack o Telegram desde la app.
* **Listo para PWA:** Aplicación totalmente instalable y con soporte Offline gracias a su Service Worker.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 & CSS3:** Estructura y diseño "Glassmorphism" moderno.
* **JavaScript (Vanilla):** Lógica de manipulación de Canvas y filtros.
* **Web Canvas API:** Procesamiento de imágenes en el cliente.
* **Service Workers:** Para capacidades Offline y caching.
* **Web Share API:** Integración nativa con el sistema operativo.

---

## 📂 Estructura del Proyecto

```text
/
├── index.html        # Estructura principal y carga de PWA
├── style.css         # Estilos visuales y diseño responsive
├── script.js        # Lógica de edición, filtros y compartir
├── manifest.json     # Configuración de instalación PWA
├── sw.js             # Service Worker para soporte Offline
└── img/              # Recursos gráficos y logo corporativo
    └── logo.png

## 📄 Licencia
Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo y mejorarlo.

Desarrollado con ❤️ por Marbin Alarcón