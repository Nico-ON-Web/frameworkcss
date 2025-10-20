  // Injecter le contenu brut des balises <script type="text/plain"> dans les <code>
        document.querySelectorAll('.code-source').forEach((src, i) => {
            const codeEl = src.previousElementSibling.querySelector('code');
            codeEl.textContent = src.textContent.trim();
        });

        // Activer Prism après l'injection
        Prism.highlightAll();

        // Gérer les boutons de copie
        document.querySelectorAll('.copy-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const code = btn.nextElementSibling.querySelector('code').innerText;
                navigator.clipboard.writeText(code);
                btn.textContent = "Copié !";
                btn.classList.add("copied");
                setTimeout(() => {
                    btn.textContent = "Copier";
                    btn.classList.remove("copied");
                }, 2000);
            });
        });