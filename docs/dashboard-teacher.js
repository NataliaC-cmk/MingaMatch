// public/dashboard-teacher.js
document.addEventListener('i18nextInitialized', () => {
    const token = localStorage.getItem('token');
    if (!token) { return location.href = '/login.html'; }
    const authHeader = () => ({ 'Authorization': `Bearer ${token}` });

    let user = {};
    const stepsNavContainer = document.getElementById('steps-nav');
    const stepsContentContainer = document.getElementById('steps-content-container');
    const welcomeEl = document.getElementById('welcome');

    const steps = [
        { number: 1, key: 'agreementAccepted', anchor: 'step1-section' },
        { number: 2, key: 'documentsPrepared', anchor: 'step2-section' },
        { number: 3, key: 'filesUploaded', anchor: 'step3-section' },
        { number: 4, key: 'personalInfoComplete', anchor: 'step4-section' }
    ];

    function renderUI() {
        const profile = user.profile || {};
        welcomeEl.textContent = `${i18next.t('welcomeMessage')} ${profile.fullName || 'Profesor'}!`;
        
        stepsNavContainer.innerHTML = steps.map(step => {
            const status = profile.onboardingStatus || {};
            const isComplete = status[step.key];
            const statusIcon = isComplete ? '✅' : '❌';
            return `<a href="#${step.anchor}" class="step-tab flex justify-between items-center p-4 rounded-lg cursor-pointer" data-step="${step.number}"><div><p class="font-bold text-slate-700" data-i18n="step${step.number}Title"></p><p class="text-sm text-slate-500" data-i18n="step${step.number}Desc"></p></div><div class="status-indicator text-2xl">${statusIcon}</div></a>`;
        }).join('');

        const status = profile.onboardingStatus || {};
        document.getElementById('agreement-checkbox').checked = status.agreementAccepted || false;
        
        updateFileStatus('cv', profile.cvUrl);
        updateFileStatus('presentationVideo', profile.presentationVideoUrl);
        updateFileStatus('credentialPdf', profile.credentialPdfUrl);

        window.updateContent(); // Traduce todo el contenido nuevo
    }

    function showStep(stepNumber) {
        document.querySelectorAll('.step-content').forEach(c => c.classList.add('hidden'));
        const activeContent = document.getElementById(steps[stepNumber - 1].anchor);
        if(activeContent) activeContent.classList.remove('hidden');

        document.querySelectorAll('.step-tab').forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.step-tab[data-step="${stepNumber}"]`);
        if(activeTab) activeTab.classList.add('active');
    }

    async function loadDataAndRender() {
        try {
            const res = await fetch('/api/teachers/my-profile', { headers: authHeader() });
            if (!res.ok) throw new Error('Error al cargar perfil');
            user = await res.json();
            renderUI();
        } catch (error) {
            welcomeEl.textContent = 'Error al cargar el dashboard. Revisa la consola.';
        }
    }
    
    async function saveStepProgress(stepKey, button) {
        button.disabled = true;
        button.textContent = 'Guardando...';
        try {
            const res = await fetch('/api/teachers/profile/onboarding-status', {
                method: 'PUT',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ step: stepKey })
            });
            if (!res.ok) throw new Error('No se pudo guardar el progreso');
            
            const data = await res.json();
            user.profile.onboardingStatus = data.onboardingStatus;
            renderUI(); // Re-renderizar
        } catch (error) {
            alert('Hubo un error al guardar tu progreso.');
            button.disabled = false;
            button.textContent = i18next.t('saveStepButton');
        }
    }

    async function handleFileUpload(file, fieldName, statusEl) {
        if (!file || !statusEl) return;
        statusEl.innerHTML = `<span class="text-slate-500">${i18next.t('fileUploading')}</span>`;
        const formData = new FormData();
        formData.append(fieldName, file);
        try {
            const res = await fetch('/api/teachers/profile/files', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            user.profile = data.profile;
            renderUI();
        } catch (error) {
            statusEl.innerHTML = `<span class="text-red-600">${i18next.t('fileUploadError')}: ${error.message}</span>`;
        }
    }

    function updateFileStatus(fieldName, url) {
        const statusEl = document.querySelector(`[data-status="${fieldName}"]`);
        if (!statusEl) return;
        if (url) {
            statusEl.innerHTML = `<span class="text-green-600 font-semibold">${i18next.t('fileUploadedSuccess')}</span><a href="${url}" target="_blank" class="ml-2 text-blue-600 hover:underline">${i18next.t('viewFile')}</a>`;
        } else {
            statusEl.innerHTML = `<span class="text-slate-500">${i18next.t('fileSelect')}</span>`;
        }
    }

    // Event Listeners
    document.getElementById('logout').addEventListener('click', () => { localStorage.clear(); location.href = '/login.html'; });

    stepsNavContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.step-tab');
        if (tab) { e.preventDefault(); showStep(tab.dataset.step); }
    });

    stepsContentContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-step-btn')) {
            const button = e.target;
            const stepKey = button.dataset.stepKey;
            if (stepKey === 'agreementAccepted' && !document.getElementById('agreement-checkbox').checked) {
                return alert('Debes aceptar el acuerdo para continuar.');
            }
            saveStepProgress(stepKey, button);
        }
    });

    stepsContentContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('file-input')) {
            const statusEl = e.target.closest('div').querySelector('[data-status]');
            handleFileUpload(e.target.files[0], e.target.dataset.fieldName, statusEl);
        }
    });
    
    // Carga Inicial
    loadDataAndRender();
});

