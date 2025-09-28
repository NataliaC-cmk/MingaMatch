// public/i18n.js (Versión FINAL y COMPLETA con todas las traducciones)

const resources = {
  es: {
    translation: {
      // --- General, Navegación y Estados (Dashboard) ---
      "teacherDashboardTitle": "Minga Match | Dashboard",
      "loginTitle": "Iniciar Sesión | Minga Match",
      "logoutButton": "Cerrar Sesión",
      "navVacancies": "Vacantes",
      "navResources": "Recursos",
      "welcomeMessage": "Bienvenido(a),",
      "dashboardSubtitle": "Completa los siguientes pasos para que podamos iniciar tu proceso de 'Match' con las escuelas.",
      "onboardingStepsTitle": "Proceso de Onboarding",
      "saveStepButton": "Guardar Progreso y Continuar",
      "backToDashboard": "Volver al Dashboard",
      
      // Claves de Estado y Acción
      "statusCompleted": "Completado",
      "statusPending": "Pendiente",
      "statusView": "Ver &rarr;",
      "statusBlocked": "Bloqueado", 
      "statusStart": "Comenzar &rarr;", 

      // --- TRADUCCIONES DE LANDING PAGE (INDEX.HTML) ---
      "navMoreInfo": 'Más Información',
      "loginButton": 'Iniciar Sesión',
      "registerButton": 'Registrarse',
      
      // Contenido principal
      "heroTitle": 'Conectamos Profesores Talentosos con Escuelas innovadoras.',
      "heroSubtitle": 'Oportunidades de enseñanza y crecimiento profesional.',
      
      "ctaTeacher": 'Soy Docente',
      "ctaSchool": 'Soy Escuela',
      "aiBannerText": 'Impulsado por Tecnología de Emparejamiento con IA.',
      "benefitsTitle": '¿Por Qué Elegir Minga Match?',

      // Beneficios (REORGANIZADOS Y CORREGIDOS)
      "benefit1Title": 'Servicio de Asesoría Gratuito', 
      "benefit1Text": 'No cobramos a los docentes por servicios de asesoría o reclutamiento. Proveemos guía experta desde el inicio hasta el final de tu proceso.',
      "benefit2Title": 'Emparejamiento con IA', 
      "benefit2Text": 'Nuestra plataforma utiliza tecnología inteligente para emparejar tu perfil y experiencia directamente con escuelas que se ajustan a tus calificaciones.',
      "benefit3Title": 'Salarios Competitivos', 
      "benefit3Text": 'Asegura puestos que ofrecen salarios competitivos en EE. UU., garantizando estabilidad financiera para tu mudanza.',
      "benefit4Title": 'Soporte de Onboarding Completo', 
      "benefit4Text": 'Te ayudamos a preparar todos los documentos necesarios, incluyendo evaluación de credenciales y guías de traducción.',
      "benefit5Title": 'Comunidad', 
      "benefit5Text": 'Únete a una comunidad vibrante de docentes que han hecho una transición exitosa a la enseñanza en Estados Unidos.',
      
      "benefit6Title": 'Programa Especial: Memphis', 
      "benefit6Text": 'Accede a nuestro programa exclusivo con el Distrito Escolar de Memphis, Tennessee, con prioridad en la colocación.',
      
      "benefit7Title": 'Viajes y Voluntariado', 
      "benefit7Text": 'Participa en viajes de voluntariado cultural organizados por Minga House Foundation antes de iniciar tu contrato en EE.UU.',
      
      "benefit8Title": 'Crecimiento Profesional', 
      "benefit8Text": 'El programa J-1 es un intercambio cultural de dos a tres años, abriendo puertas para el crecimiento profesional a largo plazo.',
      
      "benefit9Title": 'Ruta Directa a la Visa J-1', 
      "benefit9Text": 'Nuestro programa está diseñado para asegurar tu Visa J-1 de Profesor, simplificando tu transición a la enseñanza en EE. UU.',


      // --- TRADUCCIONES DE LOGIN.HTML (NUEVAS CLAVES) ---
      "loginSubtitle": "Bienvenido(a) de nuevo. Detección automática de rol.", 
      "emailLabel": "Correo Electrónico",
      "passwordLabel": "Contraseña",
      "forgotPassword": "¿Olvidaste tu contraseña?",
      "roleDetection": "Detección automática de rol (profesor, escuela o admin)",
      "noAccount": "¿No tienes una cuenta?",
      "registerAs": "Regístrate como",
      "teacher": "Profesor",
      "school": "Escuela",
      "or": "o",


      // --- Pasos del Onboarding (Títulos usados en el Dashboard) ---
      "step1Title": "Paso 1: Acepta Términos y Condiciones",
      "step2Title": "Paso 0: Prepara Documentos",
      "step3Title": "Paso 2: Sube Documentos",
      "step4Title": "Paso 3: Completa Tu Perfil",

      // [Resto del contenido de Acuerdo, Documentos, Perfil se mantiene igual]
      "agreementTitle": "Acuerdo de Servicio Minga Match",
      "agreementText": `
        <h3 class="text-lg font-semibold mb-2">TeachUSA.</h3>
        <p class="mb-4"><strong>Minga House Foundation</strong></p>
        
        <p class="mb-2"><strong>No service fees:</strong> Minga House Foundation does not charge teachers for its advisory services. We do not collect any fees from participants before or after their arrival in the United States.</p>
        <p class="mb-4"><strong>Role:</strong> Our role is that of an industry advisor, providing guidance during the J-1 visa cultural exchange application process.</p>
        
        <p class="mb-4">Minga House Foundation is a non-profit organization founded in Colombia with the mission of promoting cultural exchange through education. We are funded through charitable contributions and professional services. We also collaborate with U.S.-based J-1 and H-1B visa sponsors. These sponsors may share part of their recruitment fees (paid by U.S. school districts) with Minga House Foundation.</p>

        <h3 class="text-lg font-semibold mb-2">Expected Teacher Costs (Estimados)</h3>
        <ul class="list-disc ml-6 mb-4 space-y-1">
          <li>Official Transcripts: (cost varies)</li>
          <li>Diploma: (cost varies)</li>
          <li>Official English Translation of Transcripts & Diploma (VisasFacil): ~$5 USD per page</li>
          <li>Foreign Credential Evaluation (SpanTran): $195 USD</li>
          <li>J-1 Visa Processing Fee (set by sponsor): $1,250 – $1,500 USD</li>
          <li>SEVIS Registration Fee: $220 USD</li>
          <li>Program & Insurance Fee: $90 USD per month (minimum 2 months)</li>
          <li>U.S. Consulate Fee: $180 USD</li>
        </ul>

        <p class="mb-2"><strong>Estimated Total Costs:</strong></p>
        <ul class="list-disc ml-6 mb-4 space-y-1">
          <li>Application stage: at least $200 USD.</li>
          <li>Visa processing stage (if hired): at least $2,000 USD.</li>
          <li>Airfare: usually not covered by school districts (teachers must pay for themselves and dependents).</li>
        </ul>

        <h3 class="text-lg font-semibold mb-2">Financial Preparedness</h3>
        <p class="mb-2">Minga House Foundation recommends teachers to have <strong>at least $5,000 USD in savings before departure.</strong></p>
        <p class="mb-4"><strong>Why?</strong> Upon arrival, teachers must cover their own living expenses (and those of their families, if applicable) for 4–6 weeks, until they:</p>
        <ul class="list-disc ml-6 mb-4 space-y-1">
          <li>Obtain a U.S. Social Security Number.</li>
          <li>Begin working.</li>
          <li>Receive their first paycheck (which can take up to 1 month).</li>
        </ul>
        <p class="mb-6">Good financial planning is essential for a successful transition.</p>

        <p class="text-right">Glen G. Galindo<br>President, Minga House Foundation</p>
      `,
      "agreementCheckboxLabel": "Al seleccionar esta casilla, confirmo que he leído y acepto los términos y condiciones del Acuerdo de Servicio Minga Match.",
      "step0ContinueButton": "Tengo mis documentos, continuar al Paso 1",
      "step2Desc": "Confirma que tienes los documentos esenciales listos.",
      "step2InfoIntro": "Para aplicar debes contar con tu diploma original, sabana de notas a color con todos los semestres y firmada, pasaporte, carta(s) laborales confirmando que estas trabajando actualmente y que tienes mínimo 24 meses de experiencia como docente.",
      "step2SavingsNote": "<strong>Necesitas ahorros</strong> para tu primer mes de estadía mientras esperas tu primer salario. Más información en el <a href='resources.html' class='text-blue-600 hover:underline'>Centro de Recursos</a>.",
      "translationGuideTitle": "Guía de Traductores Oficiales Recomendados",
      "step2TranslationIntro": "La sabana de notas y el diploma se deben traducir para luego obtener la homologación. Te recomendamos estos traductores para evitar costos elevados en EE.UU.",
      "translatorColombia": "🇨🇴 COLOMBIA - Official Translator<br><strong>TU CENTRAL DE VISAS</strong><br>Contacto: Stefani o Anderson<br>WhatsApp: +57 350 619 2000<br>Email: asesorvisas4@tucentraldevisas.com",
      "translatorCostaRica": "🇨🇷 COSTA RICA - Claudia Marín Montero (Traductora Oficial)<br>WhatsApp: +506 8735 0930<br>Email: clmm2803@yahoo.com",
      "translatorArgentina": "🇦🇷 ARGENTINA - Barbara Vivot Traducciones<br>Contacto: Barbara Vivot<br>WhatsApp: +54 9 11 3249 1270<br>Email: mbarbaravivot@gmail.com",
      "mingaDiscountNote": "<strong>Importante:</strong> ¡Diles que vas de parte de Minga Teachers para obtener un posible descuento!",
      "step3Desc": "Sube los archivos necesarios para que las escuelas puedan evaluar tu perfil. Recuerda que la 'Credential Evaluation' debe estar ya lista.",
      "uploadSectionTitle": "Archivos Requeridos",
      "filePhotoTitle": "Foto de Perfil (Cara visible, fondo claro)",
      "filePhotoNote": "Será la imagen principal en tu perfil. Debe ser profesional y reciente.",
      "fileVideoTitle": "Video de Presentación Personal",
      "fileVideoNote": "<ul><li>Duración: 30 a 40 segundos.</li><li>Enfócate en la claridad de tu inglés y en mostrar tu personalidad docente.</li><li>Dirígete como si hablaras a un director. ¡Muestra entusiasmo y energía positiva!</li><li><a href='https://www.mingateachers.org/docentes.html' target='_blank' class='text-blue-600 hover:underline'>Ver ejemplos aquí.</a></li></ul>",
      "videoLinkPlaceholder": "Pega aquí el enlace público de YouTube o Vimeo...",
      "fileEmploymentTitle": "Carta(s) Laboral(es) (Mínimo 24 meses)",
      "fileEmploymentNote": "La carta debe: Estar en papel oficial (membrete). Tener fecha actual. Indicar tu cargo, materias y niveles. Incluir fechas de empleo completas. Confirmar si es tiempo completo/parcial. Incluir email/teléfono de contacto del firmante. Estar firmada por un administrador.",
      "fileCredentialTitle": "Credential Evaluation (Homologación o FCE)",
      "fileCredentialNote": "Debes evaluar tus títulos académicos para que sean reconocidos en EE.UU. Realízala aquí: <a href='https://spanside.my.salesforce-sites.com/SpantranApplication?Id=f7b09ff4-5732-47b7-a262-2cb1627066d4' target='_blank' class='text-blue-600 hover:underline'>SpanTran Application</a>. ⚠️ No pagues traducciones con la empresa de EE.UU., son muy costosas.",
      "fileNoteFormat": "Accepted formats: PDF, JPG/PNG (5MB max.). Video must be a link.",
      "chooseFileButton": "Seleccionar Archivo",
      "uploadFileButton": "Subir Archivo",
      "enterLinkButton": "Guardar Enlace",
      "uploadSuccess": "¡Subida exitosa!",
      "linkSuccess": "¡Enlace guardado!",
      "uploadError": "Error al subir archivo. Intenta de nuevo.",
      "completionMessage": "You must upload/save all required files and links.",
      "step4Desc": "Fill out your personal and professional information so that schools can get to know you better.",
      "personalInfoSection": "Información Personal y Datos Clave",
      "professionalInfoSection": "Experiencia Profesional y Credenciales",
      "fullNameLabel": "Full Name (as per passport)",
      "phoneLabel": "Phone Number",
      "currentCountryLabel": "Current Country of Residence",
      "englishLevelLabel": "English Level (e.g., B2 Intermediate)",
      "usaSSNLabel": "Do you have a USA Social Security Number (USA SSN)?",
      "yearsExpLabel": "Complete Years of Teaching Experience (after graduation)",
      "uniNameLabel": "Full Name of the University you graduated from",
      "degreeTypeLabel": "Type of University Degree",
      "fieldOfStudyLabel": "Main Field of Study",
      "currentPositionLabel": "Current Position and Grade Level",
      "currentTasksLabel": "Current Tasks and Responsibilities",
      "totalMonthsCurrentJobLabel": "Total months worked in the current position",
      "prevPositionLabel": "Previous Position and Grade Level (if applicable)",
      "credentialStatusLabel": "Do you have your Credential Evaluation?",
      "saveProfileButton": "Guardar Perfil"
    }
  }
};

// Configuración de i18next
i18next.init({
    lng: 'es', 
    fallbackLng: 'en',
    resources: resources
}, () => {
    // ESTE CALLBACK ES CLAVE: Dispara un evento una vez que i18next está LISTO
    document.dispatchEvent(new Event('i18nextInitialized'));
});

// Función para actualizar el contenido de la página (soporta HTML)
window.updateContent = () => {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = i18next.t(key);
        if (element.tagName === 'TITLE') {
            element.textContent = text;
        } else {
            // Usa innerHTML para permitir etiquetas <strong>, <a>, <ul> en las traducciones
            element.innerHTML = text;
        }
    });
};

// Selector de idioma
document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('lang-selector');
    if (selector) {
        selector.value = i18next.language;
        selector.addEventListener('change', (e) => {
            i18next.changeLanguage(e.target.value, () => {
                window.updateContent();
            });
        });
    }
});

// Inicia la traducción en la carga inicial
if (i18next.isInitialized) {
    window.updateContent();
}