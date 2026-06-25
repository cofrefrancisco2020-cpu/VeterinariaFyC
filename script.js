const WHATSAPP_NUMBER = "56986969505";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const form = document.querySelector("#whatsapp-form");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function clean(value) {
  return value.trim().replace(/\s+/g, " ");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const tutor = clean(data.get("tutor") || "");
    const phone = clean(data.get("phone") || "");
    const pet = clean(data.get("pet") || "");
    const type = clean(data.get("type") || "");
    const age = clean(data.get("age") || "");
    const service = clean(data.get("service") || "");
    const message = clean(data.get("message") || "");

    if (!tutor || !phone || !pet || !type || !age || !service || !message) {
      form.reportValidity();
      return;
    }

    const whatsappMessage = [
      "Hola, quiero consultar por atención veterinaria.",
      `Nombre: ${tutor}`,
      `Teléfono: ${phone}`,
      `Mascota: ${pet}`,
      `Tipo: ${type}`,
      `Edad: ${age}`,
      `Servicio requerido: ${service}`,
      `Motivo de consulta: ${message}`
    ].join("\n");

    window.open(buildWhatsAppUrl(whatsappMessage), "_blank", "noopener");
  });
}
