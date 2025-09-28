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
      "heroTitle": 'Conectamos Profesores Talentosos con Escuelas innovadoras.',
      "heroSubtitle": 'Oportunidades de enseñanza y crecimiento profesional.',
      "ctaTeacher": 'Soy Docente',
      "ctaSchool": 'Soy Escuela',
      "aiBannerText": 'Impulsado por Tecnología de Emparejamiento con IA.',
      "benefitsTitle": '¿Por Qué Elegir Minga Match?',
      
      // Beneficios 
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


      // --- TRADUCCIONES DE LOGIN.HTML/REGISTER.HTML (NUEVAS CLAVES) ---
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
      "invalidCredentials": "Email o contraseña inválidos.",
      "registerTeacherHeader": "Regístrate como Docente",
      "registerSchoolHeader": "Regístrate como Escuela",
      "alreadyHaveAccount": "¿Ya tienes una cuenta?",
      "loginLink": "Inicia Sesión",
      "emailPlaceholder": "Correo Electrónico",
      "passwordPlaceholder": "Contraseña",
      "confirmPasswordLabel": "Confirmar Contraseña",
      "passwordMismatch": "Las contraseñas no coinciden.",
      "registrationSuccess": "¡Registro exitoso! Por favor, inicia sesión.",
      "registrationError": "Error en el registro (Simulación).",
      "schoolNameLabel": "Nombre de la Escuela/Distrito",
      "schoolNamePlaceholder": "Nombre de la Escuela/Distrito",


      // --- Contenido del Dashboard y Onboarding (ACUERDO) ---
      "step1Title": "Paso 1: Acepta Términos y Condiciones",
      "step2Title": "Paso 0: Prepara Documentos",
      "step3Title": "Paso 2: Sube Documentos",
      "step4Title": "Paso 3: Completa Tu Perfil",

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
      // [Continúa el resto de claves de Onboarding como en el último bloque]
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
      "fileNoteFormat": "Formatos aceptados: PDF, JPG/PNG (5MB máx.). Video debe ser un enlace.",
      "chooseFileButton": "Seleccionar Archivo",
      "uploadFileButton": "Subir Archivo",
      "enterLinkButton": "Guardar Enlace",
      "uploadSuccess": "¡Subida exitosa!",
      "linkSuccess": "¡Enlace guardado!",
      "uploadError": "Error al subir archivo. Intenta de nuevo.",
      "completionMessage": "Debes subir/guardar todos los archivos y enlaces requeridos.",
      "step4Desc": "Diligencia tu información personal y profesional para que las escuelas puedan conocerte mejor.",
      "personalInfoSection": "Información Personal y Datos Clave",
      "professionalInfoSection": "Experiencia Profesional y Credenciales",
      "fullNameLabel": "Nombre Completo (según pasaporte)",
      "phoneLabel": "Número de Teléfono",
      "currentCountryLabel": "País de Residencia Actual",
      "englishLevelLabel": "Nivel de Inglés (ej: B2 Intermediate)",
      "usaSSNLabel": "¿Tienes número de Seguro Social de EE. UU. (USA SSN)?",
      "yearsExpLabel": "Años Completos de Experiencia Docente (después de graduación)",
      "uniNameLabel": "Nombre completo de la Universidad donde te graduaste",
      "degreeTypeLabel": "Tipo de Título Universitario (Type of Degree)",
      "fieldOfStudyLabel": "Campo de Estudio Principal (Field of Study)",
      "currentPositionLabel": "Puesto y nivel de grado actual",
      "currentTasksLabel": "Tareas y responsabilidades actuales",
      "totalMonthsCurrentJobLabel": "Total de meses trabajados en el puesto actual",
      "prevPositionLabel": "Puesto y nivel de grado anterior (si aplica)",
      "credentialStatusLabel": "¿Tienes tu Credential Evaluation (Homologación)?",
      "saveProfileButton": "Guardar Perfil"
    }
  },
  en: {
    translation: {
      // --- General, Navegación y Estados ---
      "teacherDashboardTitle": "Minga Match | Dashboard",
      "loginTitle": "Login | Minga Match",
      "logoutButton": "Logout",
      "navVacancies": "Jobs",
      "navResources": "Resources",
      "welcomeMessage": "Welcome,",
      "dashboardSubtitle": "Complete the following steps so we can start your 'Match' process with the schools.",
      "onboardingStepsTitle": "Onboarding Process",
      "saveStepButton": "Save Progress and Continue",
      "backToDashboard": "Back to Dashboard",
      
      // Claves de Estado y Acción
      "statusCompleted": "Completed",
      "statusPending": "Pending",
      "statusView": "View &rarr;",
      "statusBlocked": "Blocked",
      "statusStart": "Start &rarr;",

      // --- TRADUCCIONES DE LANDING PAGE (INDEX.HTML) ---
      "navMoreInfo": 'More Info',
      "loginButton": 'Login',
      "registerButton": 'Register',
      
      // CAMBIOS SOLICITADOS:
      "heroTitle": 'Connecting Talented Teachers with Innovative Schools.',
      "heroSubtitle": 'Teaching and professional growth opportunities.',
      
      "ctaTeacher": 'I am a Teacher',
      "ctaSchool": 'I am a School',
      "aiBannerText": 'Powered by AI Matching Technology.',
      "benefitsTitle": 'Why Choose Minga Match?',
      
      // Beneficios (REORGANIZADOS Y CORREGIDOS)
      "benefit1Title": 'Free Advisory Service', 
      "benefit1Text": 'We do not charge teachers for advisory services or recruitment. We provide expert guidance from start to finish of your process.',
      "benefit2Title": 'AI-Powered Matching', 
      "benefit2Text": 'Our platform uses smart technology to match your profile and experience directly with schools that fit your qualifications.',
      "benefit3Title": 'Competitive Salaries', 
      "benefit3Text": 'Secure positions offering competitive U.S. salaries, ensuring financial stability for your move.',
      "benefit4Title": 'Full Onboarding Support', 
      "benefit4Text": 'We help you prepare all necessary documents, including credential evaluation and translation guides.',
      "benefit5Title": 'Community Access', 
      "benefit5Text": 'Join a vibrant community of teachers who have successfully transitioned to teaching in the United States.',
      
      "benefit6Title": 'Special Program: Memphis', 
      "benefit6Text": 'Access our exclusive program with the Memphis School District, Tennessee, with placement priority.',
      "benefit7Title": 'Trips and Volunteering', 
      "benefit7Text": 'Participate in cultural volunteering trips organized by Minga House Foundation before starting your contract in the U.S.',
      
      "benefit8Title": 'Long-Term Career Growth', 
      "benefit8Text": 'The J-1 program is a two to three-year cultural exchange, opening doors for long-term career growth.',
      
      "benefit9Title": 'Direct J-1 Visa Guidance', 
      "benefit9Text": 'Our program simplifies your J-1 Teacher Visa application, providing expert guidance from start to finish.',


      // --- Contenido del Dashboard y Onboarding (SE MANTIENE) ---
      "step1Title": "Step 1: Accept Terms and Conditions",
      "step2Title": "Step 0: Document Preparation",
      "step3Title": "Step 2: Upload Documents",
      "step4Title": "Step 3: Complete Your Profile",

      "agreementTitle": "Minga Match Service Agreement",
      "agreementText": `
        <h3 class="text-lg font-semibold mb-2">TeachUSA.</h3>
        <p class="mb-4"><strong>Minga House Foundation</strong></p>
        
        <p class="mb-2"><strong>No service fees:</strong> Minga House Foundation does not charge teachers for its advisory services. We do not collect any fees from participants before or after their arrival in the United States.</p>
        <p class="mb-4"><strong>Role:</strong> Our role is that of an industry advisor, providing guidance during the J-1 visa cultural exchange application process.</p>
        
        <p class="mb-4">Minga House Foundation is a non-profit organization founded in Colombia with the mission of promoting cultural exchange through education. We are funded through charitable contributions and professional services. We also collaborate with U.S.-based J-1 and H-1B visa sponsors. These sponsors may share part of their recruitment fees (paid by U.S. school districts) with Minga House Foundation.</p>

        <h3 class="text-lg font-semibold mb-2">Expected Teacher Costs (Estimated)</h3>
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
      "agreementCheckboxLabel": "By selecting this box, I confirm that I have read and agree to the terms and conditions of the Minga Match Service Agreement.",
      "step0ContinueButton": "I have my documents, continue to Step 1",
      "step2Desc": "Confirm you have the essential documents ready.",
      "step2InfoIntro": "To apply, you must have your original diploma, official color transcript with all semesters and signed, passport, and employment letter(s) confirming you are currently working and have a minimum of 24 months of teaching experience.",
      "step2SavingsNote": "<strong>Important note:</strong> You will need savings to cover your first month's stay while waiting for your first salary. More information in the <a href='resources.html' class='text-blue-600 hover:underline'>Resource Center</a>.",
      "translationGuideTitle": "Recommended Official Translators Guide",
      "step2TranslationIntro": "Transcripts and diplomas must be translated to obtain the credential evaluation. We recommend these translators to avoid high costs in the U.S.",
      "translatorColombia": "🇨🇴 COLOMBIA - Official Translator<br><strong>TU CENTRAL DE VISAS</strong><br>Contact: Stefani or Anderson<br>WhatsApp: +57 350 619 2000<br>Email: asesorvisas4@tucentraldevisas.com",
      "translatorCostaRica": "🇨🇷 COSTA RICA - Claudia Marín Montero (Official Translator)<br>WhatsApp for quotes: +506 8735 0930<br>Email: clmm2803@yahoo.com",
      "translatorArgentina": "🇦🇷 ARGENTINA - Barbara Vivot Traducciones<br>Contact: Barbara Vivot<br>WhatsApp: +54 9 11 3249 1270<br>Email: mbarbaravivot@gmail.com",
      "mingaDiscountNote": "<strong>Important:</strong> Tell them you are with Minga Teachers to get a possible discount!",
      
      "step3Desc": "Upload the necessary files so schools can evaluate your profile. Remember that the 'Credential Evaluation' must be ready.",
      "uploadSectionTitle": "Required Files",
      "filePhotoTitle": "Profile Photo (Visible face, light background)",
      "filePhotoNote": "This will be the main image on your profile. It must be professional and recent.",
      "fileVideoTitle": "Personal Presentation Video",
      "fileVideoNote": "<ul><li>Duration: 30 to 40 seconds.</li><li>Focus on the clarity of your English and showcase your teaching personality.</li><li>Address it as if speaking to a school principal. Show enthusiasm and positive energy!</li><li><a href='https://www.mingateachers.org/docentes.html' target='_blank' class='text-blue-600 hover:underline'>View examples here.</a></li></ul>",
      "videoLinkPlaceholder": "Paste the public YouTube or Vimeo link here...",
      "fileEmploymentTitle": "Employment Letter(s) (Minimum 24 months)",
      "fileEmploymentNote": "The letter must: Be on official letterhead. Be currently dated. State your position, subjects, and grade levels. Include complete employment dates. Confirm full-time/part-time status. Include the signer's contact email/phone. Be signed by an administrator.",
      "fileCredentialTitle": "Credential Evaluation (Homologación or FCE)",
      "fileCredentialNote": "You must have your academic credentials evaluated for U.S. recognition. Complete it here: <a href='https://spanside.my.salesforce-sites.com/SpantranApplication?Id=f7b09ff4-5732-47b7-a262-2cb1627066d4' target='_blank' class='text-blue-600 hover:underline'>SpanTran Application</a>. ⚠️ Do not pay for translations with the U.S. company, they are very expensive.",
      "fileNoteFormat": "Accepted formats: PDF, JPG/PNG (5MB max.). Video must be a link.",
      "chooseFileButton": "Choose File",
      "uploadFileButton": "Upload File",
      "enterLinkButton": "Save Link",
      "uploadSuccess": "Upload successful!",
      "linkSuccess": "Link saved!",
      "uploadError": "Error uploading file. Please try again.",
      "completionMessage": "You must upload/save all required files and links.",
      
      // --- Content for Step 3 (Complete Profile - step4.html) ---
      "step4Desc": "Fill out your personal and professional information so that schools can get to know you better.",
      "personalInfoSection": "Personal Information and Key Data",
      "professionalInfoSection": "Professional Experience and Credentials",
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
      "saveProfileButton": "Save Profile"
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