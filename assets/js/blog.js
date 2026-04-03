// ============================================
// GESTIONNAIRES PRINCIPAUX
// ============================================

// Variables globales
let currentUser = null;
let comments = [];
let articlesData = {};
let testimonialsData = [];
const blogConfig = window.groupe1ConvergenceConfig || {};
const blogUrls = blogConfig.urls || {};
const blogCurrentUser = blogConfig.currentUser || null;
const blogApiCommentsUrl = blogConfig.apiBlogComments || '/wp-json/groupe1/v1/blog-comments';
const blogRestNonce = blogConfig.nonce || '';

function withSection(baseUrl, section) {
    if (!baseUrl || !section) return baseUrl || '#';
    try {
        const url = new URL(baseUrl, window.location.origin);
        url.searchParams.set((blogConfig.sectionParam || 'section'), section);
        return url.toString();
    } catch (e) {
        const joiner = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${joiner}${(blogConfig.sectionParam || 'section')}=${encodeURIComponent(section)}`;
    }
}

function withQuery(baseUrl, params = {}) {
    if (!baseUrl) return '#';
    try {
        const url = new URL(baseUrl, window.location.origin);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, value);
            }
        });
        return url.toString();
    } catch (e) {
        const qp = new URLSearchParams(params).toString();
        if (!qp) return baseUrl;
        const joiner = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${joiner}${qp}`;
    }
}

function normalizeLegacyBlogLinks(scope = document) {
    const formationsUrl = blogUrls.formations || '/formations/';
    const faqUrl = blogUrls.faq || '/faq/';
    const contactUrl = blogUrls.contact || '/contact/';
    const homeUrl = blogUrls.home || '/';

    const mapHref = (href) => {
        if (!href) return href;
        const value = href.trim();

        if (/\/blog\/formations\.html(?:#devweb)?$/i.test(value) || /formations\.html(?:#devweb)?$/i.test(value)) {
            return withSection(formationsUrl, 'devweb');
        }
        if (/formations\.html#sante$/i.test(value)) return withSection(formationsUrl, 'sante');
        if (/formations\.html#tourisme$/i.test(value)) return withSection(formationsUrl, 'tourisme');
        if (/formations\.html#business$/i.test(value)) return withSection(formationsUrl, 'business');
        if (/formations\.html#devweb$/i.test(value)) return withSection(formationsUrl, 'devweb');
        if (/\/blog\/faq\.html$/i.test(value) || /faq\.html$/i.test(value)) return faqUrl;
        if (/\/blog\/contact\.html$/i.test(value) || /contact\.html$/i.test(value)) return contactUrl;
        if (/\/blog\/index\.html#testimonials$/i.test(value) || /index\.html#testimonials$/i.test(value)) {
            return withSection(homeUrl, 'testimonials');
        }

        return value;
    };

    scope.querySelectorAll('a[href]').forEach((anchor) => {
        const current = anchor.getAttribute('href');
        const fixed = mapHref(current);
        if (fixed !== current) {
            anchor.setAttribute('href', fixed);
        }
    });
}

// ============================================
// 1. GESTION DES UTILISATEURS
// ============================================

class UserManager {
    constructor() {
        this.currentUser = this.getStoredUser();
        this.initUserUI();
    }
    
    // Récupérer l'utilisateur depuis localStorage
    getStoredUser() {
        return blogCurrentUser || null;
    }
    
    // Sauvegarder l'utilisateur
    saveUser(user) {
        localStorage.setItem('blogUser', JSON.stringify(user));
        this.currentUser = user;
        this.updateUI();
    }
    
    // Déconnexion
    logout() {
        const logoutUrl = (blogUrls && blogUrls.logout) ? blogUrls.logout : null;
        if (logoutUrl) {
            window.location.href = logoutUrl;
            return;
        }
        this.showMessage('Déconnexion indisponible.', 'info');
    }
    
    // Initialiser l'interface utilisateur
    initUserUI() {
        // Gestion du dropdown utilisateur
        const userToggle = document.getElementById('userToggle');
        if (userToggle) {
            userToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const menu = userToggle.nextElementSibling;
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            });
            
            // Fermer le menu en cliquant ailleurs
            document.addEventListener('click', () => {
                const menus = document.querySelectorAll('.user-menu');
                menus.forEach(menu => menu.style.display = 'none');
            });
        }
        
        // Initialiser l'UI
        this.updateUI();
    }
    
    // Mettre à jour l'interface
    updateUI() {
        const guestActions = document.querySelector('.guest-actions');
        const loggedActions = document.querySelector('.logged-actions');
        
        if (this.currentUser) {
            // Afficher l'utilisateur connecté
            if (guestActions) guestActions.style.display = 'none';
            if (loggedActions) loggedActions.style.display = 'flex';
            
            // Mettre à jour le nom et avatar
            const userNameElement = document.querySelector('.user-name');
            const userAvatar = document.querySelector('.user-avatar');
            
            if (userNameElement) {
                userNameElement.textContent = this.currentUser.name;
            }
            
            if (userAvatar) {
                userAvatar.textContent = this.currentUser.name.charAt(0);
                userAvatar.style.backgroundColor = this.getUserColor(this.currentUser.role);
            }
            
            // Afficher/masquer les éléments admin
            const adminElements = document.querySelectorAll('.admin-only');
            adminElements.forEach(el => {
                el.style.display = this.currentUser.role === 'admin' ? 'flex' : 'none';
            });
        } else {
            // Afficher les boutons de connexion
            if (guestActions) guestActions.style.display = 'flex';
            if (loggedActions) loggedActions.style.display = 'none';
        }
    }
    
    // Obtenir la couleur selon le rôle
    getUserColor(role) {
        const colors = {
            'admin': '#dc3545',
            'editor': '#ffc107',
            'author': '#2c5aa0',
            'student': '#4ecdc4',
            'default': '#6c757d'
        };
        return colors[role] || colors.default;
    }
    
    // Afficher le modal de connexion
    showLoginModal() {
        const modalHTML = `
            <div class="modal-overlay" id="loginModal">
                <div class="modal">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h3>Connexion au blog étudiant</h3>
                        <p>Accédez à votre espace personnel</p>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="loginEmail" placeholder="votre@email.fr" required>
                            </div>
                            <div class="form-group">
                                <label>Mot de passe</label>
                                <input type="password" id="loginPassword" placeholder="Votre mot de passe" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">
                                <i class="fas fa-sign-in-alt"></i> Se connecter
                            </button>
                        </form>
                        
                        <div class="modal-links">
                            <a href="#forgot-password">Mot de passe oublié ?</a>
                            <a href="#register" class="register-link">Créer un compte</a>
                        </div>
                        
                        <div class="demo-accounts">
                            <h4>Comptes de démonstration :</h4>
                            <div class="demo-account">
                                <strong>Admin :</strong> admin@convergence.fr / admin123
                            </div>
                            <div class="demo-account">
                                <strong>Étudiant :</strong> etudiant@convergence.fr / etudiant123
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter le modal au DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Gérer la fermeture
        const modal = document.getElementById('loginModal');
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Gérer la soumission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }
    
    // Gérer la connexion
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulation de connexion avec comptes de démo
        let mockUser = null;
        
        if (email === 'admin@convergence.fr' && password === 'admin123') {
            mockUser = {
                id: 1,
                name: 'Admin Convergence',
                email: email,
                role: 'admin',
                avatar: 'A'
            };
        } else if (email === 'etudiant@convergence.fr' && password === 'etudiant123') {
            mockUser = {
                id: 2,
                name: 'Étudiant Demo',
                email: email,
                role: 'student',
                avatar: 'É'
            };
        } else {
            // Créer un utilisateur basé sur l'email
            const name = email.split('@')[0];
            mockUser = {
                id: Date.now(),
                name: name.charAt(0).toUpperCase() + name.slice(1),
                email: email,
                role: 'student',
                avatar: name.charAt(0).toUpperCase()
            };
        }
        
        this.saveUser(mockUser);
        
        // Fermer le modal
        document.getElementById('loginModal')?.remove();
        
        // Afficher un message
        this.showMessage(`Connexion réussie ! Bienvenue ${mockUser.name}.`, 'success');
    }
    
    // Afficher le modal d'inscription
    showRegisterModal() {
        const modalHTML = `
            <div class="modal-overlay" id="registerModal">
                <div class="modal">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h3>Créer un compte étudiant</h3>
                        <p>Rejoignez la communauté Convergence</p>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm">
                            <div class="form-group">
                                <label>Nom complet</label>
                                <input type="text" id="registerName" placeholder="Votre nom et prénom" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" id="registerEmail" placeholder="votre@email.fr" required>
                            </div>
                            <div class="form-group">
                                <label>Mot de passe</label>
                                <input type="password" id="registerPassword" placeholder="Créez un mot de passe" required>
                            </div>
                            <div class="form-group">
                                <label>Formation</label>
                                <select id="registerFormation">
                                    <option value="sante">Santé</option>
                                    <option value="tourisme">Tourisme</option>
                                    <option value="business">Business</option>
                                    <option value="devweb">Développement Web</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">
                                <i class="fas fa-user-plus"></i> Créer mon compte
                            </button>
                        </form>
                        
                        <div class="modal-note">
                            <i class="fas fa-info-circle"></i>
                            En créant un compte, vous pourrez commenter les articles et suivre vos publications.
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter le modal au DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Gérer la fermeture
        const modal = document.getElementById('registerModal');
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Gérer la soumission
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }
    
    // Gérer l'inscription
    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const formation = document.getElementById('registerFormation').value;
        
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            role: 'student',
            formation: formation,
            avatar: name.charAt(0).toUpperCase(),
            joinDate: new Date().toISOString()
        };
        
        this.saveUser(newUser);
        
        // Fermer le modal
        document.getElementById('registerModal')?.remove();
        
        // Afficher un message
        this.showMessage(`Compte créé avec succès ! Bienvenue ${name}.`, 'success');
    }
    
    // Afficher un message
    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `user-message user-message-${type}`;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${text}
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// ============================================
// 2. GESTION DES COMMENTAIRES
// ============================================

class CommentManager {
    constructor() {
        this.comments = this.getStoredComments();
        this.initComments();
    }
    
    // Fallback local (utile si l'API n'est pas disponible)
    getStoredComments() {
        try {
            const commentsData = localStorage.getItem('blogComments');
            return commentsData ? JSON.parse(commentsData) : [];
        } catch (e) {
            return [];
        }
    }
    
    // Compat: non utilisé en seed, on garde vide
    getDefaultComments() {
        return [];
    }
    
    // Sauvegarder les commentaires de fallback local
    saveComments() {
        try {
            localStorage.setItem('blogComments', JSON.stringify(this.comments));
        } catch (e) {
            // ignore
        }
    }
    
    // Initialiser le système de commentaires
    initComments() {
        // Gestion du formulaire de commentaire
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'newCommentForm') {
                e.preventDefault();
                this.submitComment();
            }
        });
        
        // Compteur de caractères
        document.addEventListener('input', (e) => {
            if (e.target.id === 'commentContent') {
                const charCount = e.target.value.length;
                const counter = document.querySelector('.char-count');
                if (counter) {
                    counter.textContent = `${charCount}/500 caractères`;
                    
                    // Changer la couleur si limite approche
                    if (charCount > 450) {
                        counter.style.color = '#dc3545';
                    } else if (charCount > 400) {
                        counter.style.color = '#ffc107';
                    } else {
                        counter.style.color = '#666';
                    }
                }
            }
        });
    }
    
    // Charger les commentaires pour un article
    async loadComments(articleId) {
        const container = document.getElementById('commentsContainer');
        if (!container) return;

        const aid = Number(articleId);
        if (!Number.isFinite(aid)) {
            return;
        }

        let articleComments = [];
        let apiOk = false;
        try {
            const response = await fetch(`${blogApiCommentsUrl}/${aid}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const text = await response.text();
            let data = null;
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('Réponse commentaires (GET) non JSON:', e);
                }
            }
            if (response.ok && data && Array.isArray(data.comments)) {
                articleComments = data.comments;
                apiOk = true;
            }
        } catch (error) {
            console.error('Erreur chargement commentaires:', error);
        }

        const sameArticle = (c) => Number(c.articleId) === aid;
        const idSeenOnServer = (fromApi, id) => fromApi.some((ac) => String(ac.id) === String(id));

        // Si API indisponible, fallback local
        if (!apiOk) {
            articleComments = this.comments.filter(sameArticle);
        } else {
            // Garder les commentaires locaux encore absents du serveur (ex. POST échoué ou hors-ligne)
            const localOnly = this.comments.filter(
                (c) => sameArticle(c) && !idSeenOnServer(articleComments, c.id)
            );
            articleComments = [...articleComments, ...localOnly].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            const others = this.comments.filter((c) => !sameArticle(c));
            this.comments = [...others, ...articleComments];
            this.saveComments();
        }
        
        // Mettre à jour le compteur
        const countEl = document.querySelector('.comments-count');
        if (countEl) {
            countEl.textContent = `(${articleComments.length})`;
        }
        
        // Générer le HTML
        container.innerHTML = articleComments.length > 0 
            ? articleComments.map(comment => this.renderComment(comment)).join('')
            : '<p class="no-comments">Soyez le premier à commenter cet article !</p>';
        
        // Ajouter les événements
        this.attachCommentEvents();
    }
    
    // Rendre un commentaire en HTML
    renderComment(comment) {
        const date = new Date(comment.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="comment" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-avatar" style="background-color: ${comment.userColor}">
                        ${comment.userInitial}
                    </div>
                    <div class="comment-info">
                        <span class="comment-author">${comment.author}</span>
                        <div class="comment-meta">
                            <span class="comment-date">
                                <i class="far fa-calendar"></i> ${date}
                            </span>
                            <span class="comment-role">${comment.role}</span>
                        </div>
                    </div>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <span class="comment-action reply">
                        <i class="fas fa-reply"></i> Répondre
                    </span>
                    <span class="comment-action like" data-likes="${comment.likes}">
                        <i class="far fa-heart"></i> ${comment.likes}
                    </span>
                    <span class="comment-action report">
                        <i class="fas fa-flag"></i> Signaler
                    </span>
                </div>
            </div>
        `;
    }
    
    // Soumettre un commentaire
    async submitComment() {
        const currentUser = blogCurrentUser;
        const articleId = Number(this.getCurrentArticleId());
        if (!Number.isFinite(articleId) || articleId <= 0) {
            this.showCommentError('Article introuvable pour ce commentaire.');
            return;
        }

        const content = document.getElementById('commentContent')?.value.trim();
        const guestName = document.getElementById('guestName')?.value.trim();
        const guestEmail = document.getElementById('guestEmail')?.value.trim();
        
        if (!content) {
            this.showCommentError('Veuillez écrire un commentaire.');
            return;
        }
        
        if (!currentUser && (!guestName || !guestEmail)) {
            this.showCommentError('Veuillez entrer votre nom et votre email.');
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            // Évite les 403 "invalid nonce" quand l'utilisateur est invité/caché
            if (blogConfig.isLoggedIn && blogRestNonce) {
                headers['X-WP-Nonce'] = blogRestNonce;
            }

            const response = await fetch(blogApiCommentsUrl, {
                method: 'POST',
                credentials: 'same-origin',
                headers,
                body: JSON.stringify({
                    articleId: articleId,
                    content: content,
                    guestName: currentUser ? '' : guestName,
                    guestEmail: currentUser ? '' : guestEmail
                })
            });

            const text = await response.text();
            let data = {};
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('Réponse commentaires (POST) non JSON:', e);
                }
            }

            const serverOk = response.ok && data.success === true;
            if (!serverOk) {
                // Fallback local si l'API refuse ou n'est pas dispo
                this.addLocalComment({
                    articleId,
                    content,
                    guestName,
                    currentUser
                });
                this.showCommentSuccess('Commentaire enregistré localement.');
            } else {
                // Retirer les brouillons locaux pour cet article, puis réinjecter le commentaire renvoyé par le POST (affichage si le GET échoue)
                this.comments = this.comments.filter((c) => Number(c.articleId) !== articleId);
                if (data.comment) {
                    this.comments.push(data.comment);
                    this.saveComments();
                }
            }

            const form = document.getElementById('newCommentForm');
            if (form) form.reset();

            const counter = document.querySelector('.char-count');
            if (counter) counter.textContent = '0/500 caractères';

            await this.loadComments(articleId);
            if (serverOk) {
                this.showCommentSuccess('Votre commentaire a été publié !');
            }
        } catch (error) {
            console.error('Erreur publication commentaire:', error);
            // Fallback local en cas d'erreur réseau
            this.addLocalComment({
                articleId,
                content,
                guestName,
                currentUser
            });

            const form = document.getElementById('newCommentForm');
            if (form) form.reset();
            const counter = document.querySelector('.char-count');
            if (counter) counter.textContent = '0/500 caractères';

            await this.loadComments(articleId);
            this.showCommentSuccess('Commentaire enregistré localement (mode hors ligne API).');
        }
    }

    addLocalComment({ articleId, content, guestName, currentUser }) {
        const name = currentUser ? (currentUser.name || 'Utilisateur') : guestName;
        const roleLabel = currentUser
            ? ((currentUser.role === 'administrator') ? 'Administrateur' : 'Étudiant')
            : 'Visiteur';
        const color = currentUser ? '#4ecdc4' : '#6c757d';

        const newComment = {
            id: Date.now(),
            articleId: articleId,
            author: name,
            userInitial: (name || 'U').charAt(0).toUpperCase(),
            userColor: color,
            role: roleLabel,
            content: content,
            date: new Date().toISOString(),
            likes: 0,
            replies: []
        };

        this.comments.push(newComment);
        this.saveComments();
    }
    
    // Attacher les événements aux commentaires
    attachCommentEvents() {
        // Boutons "J'aime"
        document.querySelectorAll('.comment-action.like').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.comment').dataset.commentId);
                this.likeComment(commentId);
            });
        });
        
        // Boutons "Répondre"
        document.querySelectorAll('.comment-action.reply').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.comment').dataset.commentId);
                this.showReplyForm(commentId);
            });
        });
        
        // Boutons "Signaler"
        document.querySelectorAll('.comment-action.report').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.comment').dataset.commentId);
                this.reportComment(commentId);
            });
        });
    }
    
    // Aimer un commentaire
    likeComment(commentId) {
        const comment = this.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes++;
            this.saveComments();
            this.loadComments(comment.articleId);
        }
    }
    
    // Afficher le formulaire de réponse
    showReplyForm(commentId) {
        const commentElement = document.querySelector(`[data-comment-id="${commentId}"]`);
        if (!commentElement) return;
        
        // Vérifier si un formulaire de réponse existe déjà
        let replyForm = commentElement.querySelector('.reply-form');
        
        if (!replyForm) {
            replyForm = document.createElement('div');
            replyForm.className = 'reply-form';
            replyForm.innerHTML = `
                <form class="reply-comment-form">
                    <textarea placeholder="Votre réponse..." rows="2"></textarea>
                    <div class="reply-actions">
                        <button type="submit" class="btn btn-small">Répondre</button>
                        <button type="button" class="btn btn-small btn-secondary cancel-reply">Annuler</button>
                    </div>
                </form>
            `;
            
            commentElement.appendChild(replyForm);
            
            // Gérer la soumission
            const form = replyForm.querySelector('.reply-comment-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReply(commentId, form.querySelector('textarea').value);
            });
            
            // Gérer l'annulation
            replyForm.querySelector('.cancel-reply').addEventListener('click', () => {
                replyForm.remove();
            });
        }
    }
    
    // Soumettre une réponse
    submitReply(commentId, content) {
        const userManager = window.userManager;
        const currentUser = userManager?.currentUser;
        
        const comment = this.comments.find(c => c.id === commentId);
        if (!comment) return;
        
        comment.replies.push({
            id: Date.now(),
            author: currentUser ? currentUser.name : 'Anonyme',
            content: content,
            date: new Date().toISOString()
        });
        
        this.saveComments();
        this.loadComments(comment.articleId);
        this.showCommentSuccess('Votre réponse a été publiée !');
    }
    
    // Signaler un commentaire
    reportComment(commentId) {
        if (confirm('Signaler ce commentaire comme inapproprié ?')) {
            const comment = this.comments.find(c => c.id === commentId);
            if (comment) {
                console.log('Commentaire signalé:', comment);
                this.showMessage('Commentaire signalé. Notre équipe va le vérifier.', 'info');
            }
        }
    }
    
    // Obtenir l'ID de l'article courant
    getCurrentArticleId() {
        // Pour l'instant, retourner l'ID de l'article affiché ou 1 par défaut
        const articleDetail = document.querySelector('.article-detail-page');
        if (articleDetail && articleDetail.style.display !== 'none') {
            const articleId = articleDetail.querySelector('.article-full')?.dataset.articleId;
            return articleId ? parseInt(articleId) : 1;
        }
        return 1;
    }
    
    // Afficher un message de succès
    showCommentSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'comment-alert comment-alert-success';
        alert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;
        
        const container = document.getElementById('commentsSection');
        if (container) {
            container.insertBefore(alert, container.firstChild);
            setTimeout(() => alert.remove(), 3000);
        }
    }
    
    // Afficher un message d'erreur
    showCommentError(message) {
        const alert = document.createElement('div');
        alert.className = 'comment-alert comment-alert-error';
        alert.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        `;
        
        const form = document.getElementById('newCommentForm');
        if (form) {
            form.insertBefore(alert, form.firstChild);
            setTimeout(() => alert.remove(), 3000);
        }
    }
}

// ============================================
// 3. GESTION DU POP-UP NEWSLETTER
// ============================================

class PopupManager {
    constructor() {
        this.popupShown = localStorage.getItem('popupShown') === 'true';
        this.initPopup();
    }
    
    // Initialiser le pop-up
    initPopup() {
        // Afficher le pop-up après 3 secondes (une seule fois par session)
        if (!this.popupShown) {
            setTimeout(() => {
                this.showPopup();
            }, 3000);
        }
        
        // Gérer la fermeture
        document.getElementById('popupClose')?.addEventListener('click', () => {
            this.hidePopup();
        });
        
        // Gérer la soumission
        document.getElementById('popupNewsletterForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.subscribeNewsletter();
        });
    }
    
    // Afficher le pop-up
    showPopup() {
        const popup = document.getElementById('newsletterPopup');
        if (popup) {
            popup.style.display = 'flex';
            localStorage.setItem('popupShown', 'true');
        }
    }
    
    // Cacher le pop-up
    hidePopup() {
        const popup = document.getElementById('newsletterPopup');
        if (popup) {
            popup.style.display = 'none';
        }
    }
    
    // Inscription à la newsletter
    subscribeNewsletter() {
        const form = document.getElementById('popupNewsletterForm');
        const email = form.querySelector('input[type="email"]').value;
        const formation = form.querySelector('select').value;
        
        if (!email || !formation) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        
        // Simuler l'envoi
        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        subscriptions.push({ email, formation, date: new Date().toISOString() });
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        
        // Afficher un message de succès
        const successMsg = document.createElement('div');
        successMsg.className = 'popup-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Merci pour votre inscription !</strong>
                <p>Vous recevrez bientôt nos articles par email.</p>
            </div>
        `;
        
        form.innerHTML = '';
        form.appendChild(successMsg);
        
        // Fermer le pop-up après 3 secondes
        setTimeout(() => {
            this.hidePopup();
        }, 3000);
    }
}

// ============================================
// 4. DONNÉES DES ARTICLES ET AVIS
// ============================================

// Données des avis étudiants (8 étudiants, 2 par formation)
testimonialsData = [
    // SANTÉ - 2 étudiants
    {
        id: 1,
        name: "Sophie Martin",
        formation: "Infirmière Clinicienne",
        school: "Santé",
        format: "En ligne",
        rating: 4,
        content: "J'ai suivi la formation d'infirmière clinicienne en ligne tout en travaillant. La flexibilité était parfaite pour moi. Les cours sont très complets et le suivi des enseignants est excellent. Les simulations en réalité virtuelle sont particulièrement innovantes !",
        avatarIcon: "fas fa-heartbeat",
        avatarImage: "https://i.pravatar.cc/150?img=1",
        categories: ["sante", "online"]
    },
    {
        id: 2,
        name: "Lucas Bernard",
        formation: "Kinésithérapeute",
        school: "Santé",
        format: "Présentiel",
        rating: 5,
        content: "La formation kiné propose un excellent équilibre entre théorie et pratique. Les équipements de l'école sont modernes et les stages en milieu hospitalier sont très formateurs. J'ai déjà trouvé un emploi avant même la fin de ma formation !",
        avatarIcon: "fas fa-user-md",
        avatarImage: "https://i.pravatar.cc/150?img=2",
        categories: ["sante", "presentiel"]
    },
    
    // TOURISME - 2 étudiants
    {
        id: 3,
        name: "Thomas Leroy",
        formation: "Management Hôtelier",
        school: "Tourisme",
        format: "Présentiel",
        rating: 5,
        content: "Formation extrêmement pratique avec des stages en hôtels 4 étoiles. J'ai décroché un CDI avant même la fin de ma formation grâce aux rencontres professionnelles organisées par l'école. La certification internationale est un vrai plus !",
        avatarIcon: "fas fa-hotel",
        avatarImage: "https://i.pravatar.cc/150?img=3",
        categories: ["tourisme", "presentiel"]
    },
    {
        id: 4,
        name: "Chloé Petit",
        formation: "Guide Touristiques Multilingue",
        school: "Tourisme",
        format: "En ligne",
        rating: 4,
        content: "Formation idéale pour ceux qui veulent travailler dans le tourisme à l'international. Les cours de langues intégrés sont un vrai plus. J'ai déjà commencé à travailler comme guide freelance et je voyage dans toute l'Europe !",
        avatarIcon: "fas fa-globe-europe",
        avatarImage: "https://i.pravatar.cc/150?img=4",
        categories: ["tourisme", "online"]
    },
    
    // BUSINESS - 2 étudiants
    {
        id: 5,
        name: "Alexandre Dubois",
        formation: "MBA Management International",
        school: "Business",
        format: "Présentiel",
        rating: 5,
        content: "La formation en présentiel à la Business School m'a permis de créer un réseau professionnel exceptionnel. Les intervenants sont des experts du secteur et les projets concrets nous préparent parfaitement au monde de l'entreprise internationale.",
        avatarIcon: "fas fa-chart-line",
        avatarImage: "https://i.pravatar.cc/150?img=5",
        categories: ["business", "presentiel"]
    },
    {
        id: 6,
        name: "Emma Chen",
        formation: "Marketing Digital",
        school: "Business",
        format: "En ligne",
        rating: 4,
        content: "Le programme de marketing digital est parfaitement à jour avec les dernières tendances. J'ai pu appliquer immédiatement les concepts appris dans mon travail actuel. Les certifications Google et Facebook incluses sont très valorisantes !",
        avatarIcon: "fas fa-bullhorn",
        avatarImage: "https://i.pravatar.cc/150?img=6",
        categories: ["business", "online"]
    },
    
    // DEV WEB - 2 étudiants
    {
        id: 7,
        name: "Marc Lefebvre",
        formation: "Développeur Full-Stack",
        school: "Dev Web",
        format: "Présentiel",
        rating: 5,
        content: "Formation intensive et très complète. Les projets concrets nous préparent directement au monde professionnel. J'ai été recruté par une startup avant même la fin de la formation. Les technologies enseignées sont parfaitement à jour !",
        avatarIcon: "fas fa-code",
        avatarImage: "https://i.pravatar.cc/150?img=7",
        categories: ["devweb", "presentiel"]
    },
    {
        id: 8,
        name: "Sarah Kim",
        formation: "Développeuse Front-End",
        school: "Dev Web",
        format: "En ligne",
        rating: 4,
        content: "Parfait pour une reconversion professionnelle. La flexibilité des cours en ligne m'a permis de continuer à travailler. Les projets pratiques et le portfolio construit pendant la formation m'ont aidée à trouver rapidement un emploi !",
        avatarIcon: "fas fa-laptop-code",
        avatarImage: "https://i.pravatar.cc/150?img=8",
        categories: ["devweb", "online"]
    }
];

// Données des articles (complets et détaillés)
articlesData = {
    1: {
        id: 1,
        title: "Mon premier projet React : création d'une app de gestion de tâches",
        author: "Lucas Martin",
        authorRole: "Étudiant en Développement Web",
        date: "15 juin 2023",
        category: "Projet Étudiant",
        icon: "fas fa-laptop-code",
        color: "#e3f2fd",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
        excerpt: "Retour d'expérience sur mon premier projet en React, les défis rencontrés et les solutions trouvées. Par Lucas, étudiant en développement web.",
        content: `
            <h2>Mon parcours d'apprentissage de React</h2>
            <p>Lorsque j'ai commencé la formation Développement Web à Convergence, je ne connaissais React que de nom. Après 3 mois de formation intensive en JavaScript, notre formateur nous a lancé le défi : créer une application de gestion de tâches complète en utilisant React. Ce projet a été un véritable tournant dans mon apprentissage.</p>
            
            <h3>Les défis techniques rencontrés</h3>
            <p>Le premier défi a été de comprendre le concept des composants. Au début, j'avais tendance à tout mettre dans un seul composant, ce qui rendait le code difficile à maintenir. C'est en pratiquant que j'ai vraiment saisi l'intérêt de découper l'interface en petits composants réutilisables.</p>
            
            <p>Autre difficulté majeure : la gestion de l'état. J'ai passé beaucoup de temps à comprendre useState et useEffect. Le moment où tout a "cliqué" pour moi, c'est quand j'ai réalisé que chaque changement d'état déclenchait un nouveau rendu du composant. Cette compréhension a radicalement changé ma façon d'aborder le développement React.</p>
            
            <h3>Architecture du projet</h3>
            <p>J'ai structuré mon application en plusieurs composants principaux :</p>
            
            <ul>
                <li><strong>App</strong> : Composant principal qui gère l'état global</li>
                <li><strong>TaskList</strong> : Affiche la liste des tâches avec filtrage</li>
                <li><strong>TaskItem</strong> : Composant pour chaque tâche individuelle</li>
                <li><strong>AddTask</strong> : Formulaire pour ajouter de nouvelles tâches</li>
                <li><strong>TaskFilters</strong> : Barre de filtres (toutes/actives/terminées)</li>
            </ul>
            
            <h3>Les fonctionnalités implémentées</h3>
            <p>Pour rendre l'application utile et professionnelle, j'ai ajouté plusieurs fonctionnalités :</p>
            
            <ul>
                <li><strong>Ajout, modification et suppression de tâches</strong> : Interface intuitive avec validation</li>
                <li><strong>Filtrage intelligent</strong> : Possibilité de filtrer par statut (toutes, actives, terminées)</li>
                <li><strong>Persistance des données</strong> : Sauvegarde automatique dans le localStorage</li>
                <li><strong>Design responsive</strong> : Adapté à tous les écrans avec CSS Grid et Flexbox</li>
                <li><strong>Animations fluides</strong> : Utilisation de Framer Motion pour les transitions</li>
                <li><strong>Mode sombre/clair</strong> : Toggle pour changer le thème de l'application</li>
            </ul>
            
            <h3>Problèmes rencontrés et solutions</h3>
            
            <h4>Problème 1 : Gestion des états imbriqués</h4>
            <p>Au début, j'avais plusieurs états séparés qui devenaient difficiles à synchroniser. La solution a été d'utiliser un reducer avec useReducer pour centraliser la logique d'état.</p>
            
            <h4>Problème 2 : Performances avec de nombreuses tâches</h4>
            <p>Avec plus de 100 tâches, l'application ralentissait. J'ai résolu ce problème en implémentant la mémoïsation avec React.memo et useMemo.</p>
            
            <h4>Problème 3 : Persistance des données</h4>
            <p>Les tâches disparaissaient au rechargement. J'ai utilisé useEffect pour sauvegarder automatiquement dans localStorage et restaurer au chargement.</p>
            
            <h3>Ce que ce projet m'a appris</h3>
            <p>Au-delà des compétences techniques, ce projet m'a appris des leçons précieuses :</p>
            
            <ol>
                <li><strong>L'importance de la planification</strong> : Passer du temps sur l'architecture avant de coder</li>
                <li><strong>Le débogage efficace</strong> : Utiliser les React DevTools et les console.log stratégiques</li>
                <li><strong>La documentation</strong> : Commenter son code pour pouvoir le relire plus tard</li>
                <li><strong>La collaboration</strong> : Demander de l'aide quand on bloque trop longtemps</li>
                <li><strong>La gestion du temps</strong> : Découper un gros projet en petites tâches réalisables</li>
            </ol>
            
            <h3>Retour d'expérience sur la formation</h3>
            <p>Ce projet a été le point culminant de notre module React. Notre formateur, David, nous a guidés tout en nous laissant explorer par nous-mêmes. Les revues de code hebdomadaires ont été particulièrement utiles pour améliorer nos pratiques.</p>
            
            <p>La formation Convergence met l'accent sur l'apprentissage par projet, et je comprends maintenant pourquoi. C'est en construisant une application réelle qu'on assimile vraiment les concepts.</p>
            
            <h3>Conseils pour ceux qui débutent avec React</h3>
            <p>Si vous commencez votre apprentissage de React, voici mes recommandations :</p>
            
            <ul>
                <li><strong>Maîtrisez d'abord JavaScript</strong> : Les bases solides en JS sont essentielles</li>
                <li><strong>Suivez le tutoriel officiel</strong> : La documentation de React est excellente</li>
                <li><strong>Codez en parallèle</strong> : Ne vous contentez pas de regarder des tutoriels</li>
                <li><strong>Commencez petit</strong> : Un projet simple mais complet vaut mieux qu'un projet ambitieux abandonné</li>
                <li><strong>Rejoignez la communauté</strong> : Le Discord de Convergence a été d'une grande aide</li>
                <li><strong>Acceptez de faire des erreurs</strong> : C'est en debuguant qu'on apprend le plus</li>
            </ul>
            
            <h3>Et après ?</h3>
            <p>Ce projet est maintenant fièrement affiché dans mon portfolio GitHub. Il m'a même aidé à décrocher un entretien pour une alternance chez une startup parisienne ! Je compte maintenant l'améliorer en y ajoutant :</p>
            
            <ul>
                <li>Une base de données Firebase pour la synchronisation multi-appareils</li>
                <li>Une PWA (Progressive Web App) pour une installation native</li>
                <li>Des tests unitaires avec Jest et React Testing Library</li>
                <li>Une version mobile optimisée avec React Native</li>
            </ul>
            
            <p>Si vous voulez voir le code source ou tester l'application, n'hésitez pas à me contacter sur le Discord de Convergence !</p>
        `
    },
    2: {
        id: 2,
        title: "Comment j'ai décroché mon alternance chez une startup tech",
        author: "Clara Bernard",
        authorRole: "Étudiante en Marketing Digital",
        date: "10 juin 2023",
        category: "Conseils",
        icon: "fas fa-user-graduate",
        color: "#f3e5f5",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80",
        excerpt: "Témoignage et conseils pratiques pour trouver une alternance dans le numérique. Par Clara, étudiante en marketing digital.",
        content: `
            <h2>Ma recherche d'alternance : un parcours en 4 étapes</h2>
            <p>Après 6 mois de formation intensive en Marketing Digital à Convergence, j'ai commencé ma recherche d'alternance. Aujourd'hui, je partage avec vous mon parcours détaillé et les conseils pratiques qui m'ont permis de signer chez TechStart, une startup spécialisée dans l'EdTech. Mon objectif : vous donner des outils concrets pour réussir votre propre recherche.</p>
            
            <h3>Étape 1 : Préparation stratégique (2 semaines)</h3>
            <p>Avant même d'envoyer la première candidature, j'ai consacré deux semaines à préparer mes outils de communication :</p>
            
            <ul>
                <li><strong>CV numérique interactif</strong> : J'ai créé une version web responsive de mon CV avec HTML/CSS/JavaScript. Cela montre mes compétences techniques et donne une excellente première impression.</li>
                <li><strong>Portfolio détaillé</strong> : J'ai présenté 3 études de cas complètes de projets scolaires, avec problématiques, stratégies, actions et résultats mesurables.</li>
                <li><strong>LinkedIn optimisé</strong> : Profil à 100% complet avec recommandations de mes formateurs, contenu publié régulièrement, et réseau ciblé sur l'EdTech.</li>
                <li><strong>Lettres de motivation personnalisables</strong> : J'ai créé un modèle avec des variables à remplir pour chaque entreprise, gagnant ainsi un temps précieux.</li>
                <li><strong>Préparation aux entretiens</strong> : J'ai listé 20 questions fréquentes et préparé mes réponses, avec des exemples concrets de la formation.</li>
            </ul>
            
            <h3>Étape 2 : Recherche ciblée et stratégique (3 semaines)</h3>
            <p>J'ai appliqué la méthode "qualité plutôt que quantité" pour maximiser mes chances :</p>
            
            <ul>
                <li><strong>Ciblage précis</strong> : 20 entreprises soigneusement sélectionnées dans l'EdTech et la formation digitale</li>
                <li><strong>Recherche approfondie</strong> : Pour chaque entreprise, j'ai étudié leur produit, leur marché, leur culture d'entreprise, et leurs challenges actuels</li>
                <li><strong>Réseautage intelligent</strong> : J'ai contacté directement des employés sur LinkedIn pour comprendre leur quotidien et obtenir des références</li>
                <li><strong>Participation active</strong> : J'ai assisté à 5 événements startup (Meetups, Webinars, Salon EdTech) pour rencontrer des recruteurs</li>
                <li><strong>Veille sectorielle</strong> : Abonnement à des newsletters spécialisées et suivi des tendances du marché</li>
            </ul>
            
            <h3>Étape 3 : Processus de recrutement chez TechStart (1 mois)</h3>
            <p>Pour TechStart, le processus a été particulièrement complet et exigeant :</p>
            
            <ol>
                <li><strong>Entretien découverte avec la RH (30 minutes)</strong> : Discussion sur mon parcours, ma motivation, et mes attentes. J'ai préparé 3 questions pertinentes sur la culture d'entreprise.</li>
                <li><strong>Test technique pratique (3 jours)</strong> : Audit SEO complet d'un site éducatif concurrent, avec recommandations détaillées et prioritisation des actions.</li>
                <li><strong>Présentation stratégique (45 minutes)</strong> : J'ai présenté mes recommandations au CMO et à son équipe, en mettant en avant l'impact business potentiel.</li>
                <li><strong>Entretien culture fit avec le fondateur (1 heure)</strong> : Discussion sur les valeurs, la vision de l'entreprise, et mon alignement avec leur mission.</li>
                <li><strong>Rencontre avec l'équipe (déjeuner d'équipe)</strong> : Moment informel pour vérifier l'adéquation avec l'équipe existante.</li>
            </ol>
            
            <h3>Étape 4 : Négociation et intégration (2 semaines)</h3>
            <p>Une fois l'offre reçue, j'ai abordé la négociation avec préparation :</p>
            
            <ul>
                <li><strong>Rémunération</strong> : J'ai comparé avec les standards du marché grâce aux données de Glassdoor et aux retours d'alternants</li>
                <li><strong>Formation continue</strong> : Négociation d'un budget pour des certifications (Google Analytics, Facebook Blueprint, HubSpot)</li>
                <li><strong>Projet personnel</strong> : Dédier 20% de mon temps à un projet innovant lié à mes centres d'intérêt</li>
                <li><strong>Flexibilité</strong> : Télétravail 2 jours par semaine pour mieux concilier études et travail</li>
                <li><strong>Mentorat</strong> : Mise en place d'un programme de mentorat avec un senior de l'équipe</li>
            </ul>
            
            <h3>Mes 5 conseils clés pour réussir votre recherche</h3>
            
            <h4>1. Spécialisez-vous dans un domaine précis</h4>
            <p>Dans le marketing digital, il vaut mieux être excellent en SEO ou en social media que moyen en tout. Identifiez votre niche et devenez-y expert.</p>
            
            <h4>2. Montrez, ne vous contentez pas de dire</h4>
            <p>Un portfolio concret avec des résultats mesurables vaut mieux qu'un long discours sur vos compétences. Utilisez des chiffres et des cas concrets.</p>
            
            <h4>3. Pratiquez le réseautage intelligent</h4>
            <p>Ciblez des personnes spécifiques plutôt que des entreprises. Une recommandation interne augmente considérablement vos chances.</p>
            
            <h4>4. Préparez vos entretiens comme un examen</h4>
            <p>Anticipez les questions, préparez les vôtres, et entraînez-vous avec un ami ou devant une caméra. La préparation fait la différence.</p>
            
            <h4>5. Soyez authentique et passionné</h4>
            <p>Les startups recherchent des personnalités, pas des CV parfaits. Montrez votre passion pour le domaine et votre envie d'apprendre.</p>
            
            <h3>Les erreurs à éviter absolument</h3>
            
            <ul>
                <li><strong>Envoyer des candidatures génériques</strong> : Personnalisez chaque envoi</li>
                <li><strong>Négliger votre présence en ligne</strong> : Les recruteurs vous Googlent</li>
                <li><strong>Postuler sans recherche préalable</strong> : Connaissez l'entreprise mieux que le recruteur</li>
                <li><strong>Oublier le suivi</strong> : Relancez poliment une semaine après votre candidature</li>
                <li><strong>Se sous-estimer</strong> : Valorisez vos projets scolaires comme de l'expérience professionnelle</li>
            </ul>
            
            <h3>Comment la formation Convergence m'a préparée</h3>
            <p>La formation Marketing Digital de Convergence m'a donné les outils concrets pour réussir :</p>
            
            <ul>
                <li><strong>Projets réels</strong> : J'ai travaillé sur de vrais briefs clients pendant la formation</li>
                <li><strong>Certifications reconnues</strong> : Google Analytics et Ads certifiées incluses dans le programme</li>
                <li><strong>Réseau professionnel</strong> : Les intervenants sont des professionnels en activité</li>
                <li><strong>Préparation aux entretiens</strong> : Simulations avec feedback personnalisé</li>
                <li><strong>Portfolio construit progressivement</strong> : Chaque module ajoute une pierre à l'édifice</li>
            </ul>
            
            <h3>Prochaines étapes</h3>
            <p>Je commence mon alternance dans 2 semaines et je partagerai bientôt mon expérience dans un nouvel article ! En attendant, n'hésitez pas à me contacter sur LinkedIn si vous avez des questions sur la recherche d'alternance dans le digital.</p>
            
            <p>Mon dernier conseil : croyez en vous et en votre parcours. Votre formation à Convergence vous donne des armes solides pour le marché du travail. Bonne chance dans votre recherche !</p>
        `
    },
    3: {
        id: 3,
        title: "6 mois de formation en UX/UI : ce que j'ai vraiment appris",
        author: "Thomas Leroy",
        authorRole: "Étudiant en Design UX/UI",
        date: "5 juin 2023",
        category: "Retour d'expérience",
        icon: "fas fa-chart-line",
        color: "#e8f5e9",
        image: "https://images.unsplash.com/photo-1561070791-2526d38794a5?w=400&q=80",
        excerpt: "Bilan de ma formation en design UX/UI, les compétences acquises et mon projet de portfolio. Par Thomas, étudiant en design.",
        content: `
            <h2>Mon parcours de reconversion vers le design UX/UI</h2>
            <p>Ancien commercial dans l'immobilier pendant 8 ans, j'ai décidé de me reconvertir dans le design UX/UI. Après 6 mois de formation intensive à Convergence, je fais le point sur ce que j'ai réellement appris, bien au-delà de mes attentes initiales. Ce témoignage s'adresse à tous ceux qui envisagent une reconversion dans ce domaine passionnant.</p>
            
            <h3>Ce que j'imaginais avant la formation</h3>
            <p>Comme beaucoup de débutants, j'avais une vision simpliste du métier de designer UX/UI. Je pensais que cela consistait principalement à :</p>
            
            <ul>
                <li>Créer des interfaces "jolies" et esthétiques</li>
                <li>Maîtriser des outils comme Figma ou Sketch</li>
                <li>Avoir un bon sens artistique et créatif</li>
                <li>Travailler de manière plutôt solitaire</li>
                <li>Faire du "graphisme pour le web"</li>
            </ul>
            
            <p>Je me trompais sur presque tous les points. La formation m'a ouvert les yeux sur la réalité beaucoup plus riche et complexe de ce métier.</p>
            
            <h3>La réalité découverte pendant la formation</h3>
            <p>Le design UX/UI, c'est avant tout une discipline centrée sur l'humain et la résolution de problèmes. Voici ce que j'ai vraiment découvert :</p>
            
            <ol>
                <li><strong>Comprendre les utilisateurs en profondeur</strong> : Pas seulement des personas fictifs, mais de véritables recherches terrain, des interviews utilisateurs, des tests d'utilisabilité, et de l'analyse comportementale.</li>
                <li><strong>Résoudre des problèmes business</strong> : Le design n'est pas une fin en soi, mais un moyen d'améliorer des indicateurs business comme la conversion, la rétention, ou la satisfaction client.</li>
                <li><strong>Travailler en équipe pluridisciplinaire</strong> : Collaboration étroite avec les développeurs, product managers, data analysts, et chefs de projet.</li>
                <li><strong>Prendre des décisions basées sur des données</strong> : Analytics, A/B testing, metrics d'engagement, études quantitatives et qualitatives.</li>
                <li><strong>Penser systèmes, pas seulement écrans</strong> : Design systems, composants réutilisables, cohérence globale de l'expérience.</li>
            </ol>
            
            <h3>Le programme détaillé de la formation</h3>
            <p>Notre programme sur 6 mois était structuré en 4 grands modules :</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Module 1 : Fondamentaux UX (4 semaines)</h4>
                <ul>
                    <li>Design thinking et méthodologie de projet</li>
                    <li>Recherche utilisateur (interviews, observations, questionnaires)</li>
                    <li>Personas, user journey, cartes d'empathie</li>
                    <li>Analyse concurrentielle et benchmarking</li>
                </ul>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Module 2 : Design d'interface (6 semaines)</h4>
                <ul>
                    <li>Principes de design visuel (typographie, couleur, espacement)</li>
                    <li>Wireframing et prototypage basse/moyenne fidélité</li>
                    <li>Design systems et composants réutilisables</li>
                    <li>Accessibilité et design inclusif</li>
                    <li>Outils : Figma (niveau avancé), Adobe XD, Sketch</li>
                </ul>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Module 3 : Test et itération (4 semaines)</h4>
                <ul>
                    <li>Tests utilisateurs (modérés et non modérés)</li>
                    <li>Analyse des résultats et synthèse des insights</li>
                    <li>Prototypage haute fidélité et micro-interactions</li>
                    <li>Présentation des résultats aux stakeholders</li>
                    <li>Outils : Maze, UserTesting, Hotjar</li>
                </ul>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Module 4 : Projet de fin de formation (6 semaines)</h4>
                <ul>
                    <li>Projet réel ou fictif de A à Z</li>
                    <li>Application des méthodologies apprises</li>
                    <li>Création d'un portfolio professionnel</li>
                    <li>Préparation à l'emploi et aux entretiens</li>
                </ul>
            </div>
            
            <h3>Mon projet de fin de formation : MediMinder</h3>
            <p>J'ai conçu MediMinder, une application mobile pour aider les personnes âgées à gérer leurs médicaments. Voici le processus complet que j'ai suivi :</p>
            
            <h4>Phase 1 : Recherche utilisateur (2 semaines)</h4>
            <ul>
                <li>Entretiens avec 8 personnes âgées de 65 à 82 ans</li>
                <li>Observation dans une maison de retraite pendant 3 jours</li>
                <li>Questionnaire en ligne envoyé à 50 répondants</li>
                <li>Analyse des applications existantes sur le marché</li>
            </ul>
            
            <h4>Phase 2 : Synthèse et définition (1 semaine)</h4>
            <ul>
                <li>Création de 3 personas principaux avec besoins spécifiques</li>
                <li>User journey map des parcours médicament actuels</li>
                <li>Définition des problèmes principaux à résoudre</li>
                <li>Priorisation des fonctionnalités avec la matrice impact/effort</li>
            </ul>
            
            <h4>Phase 3 : Conception et prototypage (2 semaines)</h4>
            <ul>
                <li>15 itérations successives de wireframes</li>
                <li>Tests de contraste et d'accessibilité pour malvoyants</li>
                <li>Prototype interactif avec Figma (65 écrans)</li>
                <li>Design system complet avec palette accessible</li>
            </ul>
            
            <h4>Phase 4 : Tests et améliorations (1 semaine)</h4>
            <ul>
                <li>Tests utilisateurs avec 5 personnes âgées</li>
                <li>Analyse des points de friction et des réussites</li>
                <li>Itérations basées sur les retours</li>
                <li>Présentation finale au jury de professionnels</li>
            </ul>
            
            <h3>Les compétences techniques acquises</h3>
            <p>Au-delà de la théorie, voici les compétences pratiques que je maîtrise maintenant :</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-color);">
                    <h4 style="margin-top: 0;">Outils de design</h4>
                    <ul style="margin-bottom: 0;">
                        <li>Figma (expert)</li>
                        <li>Adobe XD</li>
                        <li>Sketch</li>
                        <li>Principle</li>
                    </ul>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-color);">
                    <h4 style="margin-top: 0;">Recherche utilisateur</h4>
                    <ul style="margin-bottom: 0;">
                        <li>Interviews</li>
                        <li>Tests utilisateurs</li>
                        <li>Analyse quantitative</li>
                        <li>Personas & Journey maps</li>
                    </ul>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-color);">
                    <h4 style="margin-top: 0;">Prototypage</h4>
                    <ul style="margin-bottom: 0;">
                        <li>Wireframes</li>
                        <li>Prototypes interactifs</li>
                        <li>Micro-interactions</li>
                        <li>Design systems</li>
                    </ul>
                </div>
            </div>
            
            <h3>Les soft skills développées</h3>
            <p>La formation m'a aussi permis de développer des compétences transversales précieuses :</p>
            
            <ul>
                <li><strong>Empathie</strong> : Vraiment comprendre les besoins des utilisateurs</li>
                <li><strong>Communication</strong> : Présenter ses idées et défendre ses choix design</li>
                <li><strong>Collaboration</strong> : Travailler efficacement en équipe pluridisciplinaire</li>
                <li><strong>Gestion de projet</strong> : Organiser son travail et respecter les délais</li>
                <li><strong>Pensée critique</strong> : Remettre en question ses propres solutions</li>
            </ul>
            
            <h3>Conseils pour futurs étudiants en UX/UI</h3>
            <p>Si vous envisagez cette formation ou une reconversion dans le design UX/UI, voici mes recommandations :</p>
            
            <ol>
                <li><strong>Développez votre curiosité</strong> : Intéressez-vous aux comportements humains, à la psychologie, à la sociologie</li>
                <li><strong>Pratiquez l'observation critique</strong> : Analysez les applications que vous utilisez quotidiennement</li>
                <li><strong>Commencez maintenant avec les outils</strong> : Figma a une version gratuite excellente pour débuter</li>
                <li><strong>Construisez un portfolio progressivement</strong> : Même des projets fictifs ou personnels ont de la valeur</li>
                <li><strong>Rejoignez les communautés</strong> : Meetups, Discord, LinkedIn groupes - l'échange est essentiel</li>
                <li><strong>Acceptez l'itération</strong> : Un bon design vient après de nombreuses versions et retours</li>
                <li><strong>Ne négligez pas la théorie</strong> : Les principes de psychologie cognitive et de perception sont fondamentaux</li>
            </ol>
            
            <h3>Et après la formation ?</h3>
            <p>Cette formation a été une expérience transformatrice qui a changé ma façon de voir le numérique et les services. Je commence maintenant à chercher un stage ou une alternance pour mettre en pratique tout ce que j'ai appris dans un contexte professionnel.</p>
            
            <p>Mon portfolio est prêt, mes compétences sont solides, et surtout, j'ai découvert une passion pour ce métier à l'intersection entre technologie, psychologie et créativité.</p>
            
            <p>Si vous avez des questions sur la formation UX/UI à Convergence, n'hésitez pas à me contacter sur le Discord de l'école !</p>
        `
    },
    4: {
        id: 4,
        title: "Les ressources en ligne qui m'ont aidée en développement web",
        author: "Sarah Chen",
        authorRole: "Étudiante en Développement Web",
        date: "1 juin 2023",
        category: "Contenu complémentaire",
        icon: "fas fa-lightbulb",
        color: "#fff3e0",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
        excerpt: "Liste des sites, tutoriels et outils gratuits que j'utilise en complément de la formation. Par Sarah, étudiante en développement.",
        content: `
            <h2>Mon kit de survie pour apprendre le développement web</h2>
            <p>En complément de l'excellente formation Développement Web à Convergence, j'ai exploré et testé de nombreuses ressources en ligne. Après 6 mois d'apprentissage intensif, voici mon guide complet des ressources qui m'ont été le plus utiles, classées par catégorie et niveau. Ces ressources sont toutes gratuites ou ont des versions gratuites substantielles.</p>
            
            <h3>1. Plateformes d'apprentissage structurées</h3>
            <p>Pour renforcer les bases et progresser de manière organisée :</p>
            
            <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #2c5aa0;">🎯 freeCodeCamp</h4>
                <p><strong>Niveau :</strong> Débutant à Intermédiaire<br>
                <strong>Points forts :</strong> Apprentissage par projet, certifications reconnues, communauté active<br>
                <strong>Ce que j'ai utilisé :</strong> Les parcours Responsive Web Design et JavaScript Algorithms & Data Structures<br>
                <strong>Conseil :</strong> Complétez les projets jusqu'au bout, même si c'est difficile</p>
            </div>
            
            <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #2c5aa0;">💻 Codecademy</h4>
                <p><strong>Niveau :</strong> Débutant<br>
                <strong>Points forts :</strong> Interface interactive, apprentissage progressif, instant feedback<br>
                <strong>Ce que j'ai utilisé :</strong> Le cours HTML & CSS pour solidifier les bases<br>
                <strong>Conseil :</strong> Profitez de la période d'essai gratuite, certains cours sont complets</p>
            </div>
            
            <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #2c5aa0;">📚 Udemy</h4>
                <p><strong>Niveau :</strong> Tous niveaux<br>
                <strong>Points forts :</strong> Cours complets, instructeurs passionnés, durée de vie illimitée<br>
                <strong>Ce que j'ai utilisé :</strong> "The Complete JavaScript Course" de Jonas Schmedtmann<br>
                <strong>Conseil :</strong> Attendez les promotions à 10-15€, n'achetez jamais au prix fort</p>
            </div>
            
            <h3>2. Pratique et défis techniques</h3>
            <p>Pour appliquer les connaissances et se confronter à des problèmes réels :</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">🎨 Frontend Mentor</h4>
                    <p><strong>Pour :</strong> CSS, Responsive Design<br>
                    <strong>Avantage :</strong> Designs professionnels, communauté de solutions<br>
                    <strong>Mon niveau :</strong> 15 défis complétés</p>
                </div>
                
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">⚔️ Codewars</h4>
                    <p><strong>Pour :</strong> Algorithmie, JavaScript<br>
                    <strong>Avantage :</strong> "Katas" gradués, comparaison avec autres devs<br>
                    <strong>Mon niveau :</strong> 5kyu (intermédiaire)</p>
                </div>
                
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">🎯 CSS Battle</h4>
                    <p><strong>Pour :</strong> Maîtrise CSS avancée<br>
                    <strong>Avantage :</strong> Approche ludique, optimisation du code<br>
                    <strong>Mon niveau :</strong> Top 20% global</p>
                </div>
                
                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">🚀 DevChallenges</h4>
                    <p><strong>Pour :</strong> Projets complets<br>
                    <strong>Avantage :</strong> Du design au déploiement, portfolio-ready<br>
                    <strong>Mon niveau :</strong> 7 projets terminés</p>
                </div>
            </div>
            
            <h3>3. Documentation et référence</h3>
            <p>Quand vous avez besoin d'une information précise ou que vous êtes bloqué :</p>
            
            <ul>
                <li><strong>📖 MDN Web Docs (Mozilla Developer Network)</strong> : La bible absolue du développement web. Exhaustif, précis, avec des exemples concrets. Ma ressource n°1 pour tout ce qui concerne les APIs web.</li>
                <li><strong>🎓 W3Schools</strong> : Parfait pour les débutants, avec des exemples interactifs simples. Excellent pour réviser rapidement une syntaxe.</li>
                <li><strong>🔍 DevDocs</strong> : Documentation hors ligne pour tous les langages et frameworks. Indispensable quand on code sans connexion internet stable.</li>
                <li><strong>📱 Can I Use</strong> : Pour vérifier la compatibilité des fonctionnalités web entre navigateurs. Essentiel pour le développement cross-browser.</li>
                <li><strong>🎨 CSS-Tricks</strong> : Articles de qualité sur CSS et frontend. Le guide Flexbox et Grid de CSS-Tricks est légendaire.</li>
            </ul>
            
            <h3>4. Chaînes YouTube francophones de qualité</h3>
            <p>Pour apprendre en vidéo en français :</p>
            
            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #e53e3e;">🇫🇷 From Scratch</h4>
                <p><strong>Spécialité :</strong> Tutoriels projets complets<br>
                <strong>Pourquoi j'aime :</strong> Explications claires, projets réalistes, bien structuré<br>
                <strong>Recommandation :</strong> La série "Créer un site e-commerce avec React"</p>
            </div>
            
            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #e53e3e;">🇫🇷 Le Designer du Web</h4>
                <p><strong>Spécialité :</strong> Design et développement frontend<br>
                <strong>Pourquoi j'aime :</strong> Approche design + code, très esthétique<br>
                <strong>Recommandation :</strong> Les tutoriels animations CSS avancées</p>
            </div>
            
            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #e53e3e;">🇫🇷 Grafikart</h4>
                <p><strong>Spécialité :</strong> Tutoriels techniques détaillés<br>
                <strong>Pourquoi j'aime :</strong> Explications approfondies, couverture large<br>
                <strong>Recommandation :</strong> La playlist complète sur JavaScript moderne</p>
            </div>
            
            <h3>5. Communautés et entraide</h3>
            <p>Quand vous êtes bloqué ou que vous voulez échanger avec d'autres développeurs :</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                    <h4 style="margin-top: 0;">💬 Discord Convergence</h4>
                    <p>Notre communauté étudiante. Réponses rapides, partage de ressources, entraide entre promotions.</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                    <h4 style="margin-top: 0;">🔍 Stack Overflow</h4>
                    <p>Pour les questions techniques précises. Lisez les règles avant de poster, et cherchez d'abord si la question existe déjà.</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                    <h4 style="margin-top: 0;">🗣️ Reddit r/webdev</h4>
                    <p>Actualités, discussions, partages de projets. Bon pour se tenir au courant des tendances.</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
                    <h4 style="margin-top: 0;">🐙 GitHub</h4>
                    <p>Contribuer à des projets open source, découvrir du code de qualité, construire son portfolio.</p>
                </div>
            </div>
            
            <h3>6. Outils gratuits essentiels pour le quotidien</h3>
            <p>Ma boîte à outils quotidienne de développeuse :</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: #2c5aa0; color: white;">
                        <th style="padding: 12px; text-align: left;">Outil</th>
                        <th style="padding: 12px; text-align: left;">Usage</th>
                        <th style="padding: 12px; text-align: left;">Alternative</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px;"><strong>VS Code</strong></td>
                        <td style="padding: 12px;">Éditeur de code avec extensions</td>
                        <td style="padding: 12px;">Atom, Sublime Text</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd; background-color: #f9f9f9;">
                        <td style="padding: 12px;"><strong>Figma</strong></td>
                        <td style="padding: 12px;">Design et prototypage</td>
                        <td style="padding: 12px;">Adobe XD, Sketch</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px;"><strong>GitHub</strong></td>
                        <td style="padding: 12px;">Versionning et portfolio</td>
                        <td style="padding: 12px;">GitLab, Bitbucket</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd; background-color: #f9f9f9;">
                        <td style="padding: 12px;"><strong>Netlify</strong></td>
                        <td style="padding: 12px;">Hébergement gratuit</td>
                        <td style="padding: 12px;">Vercel, GitHub Pages</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 12px;"><strong>CodePen</strong></td>
                        <td style="padding: 12px;">Prototypage rapide frontend</td>
                        <td style="padding: 12px;">JSFiddle, CodeSandbox</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd; background-color: #f9f9f9;">
                        <td style="padding: 12px;"><strong>Chrome DevTools</strong></td>
                        <td style="padding: 12px;">Débogage et performance</td>
                        <td style="padding: 12px;">Firefox Developer Tools</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>7. Méthodologie d'apprentissage efficace</h3>
            <p>Après 6 mois d'expérience, voici la méthodologie qui fonctionne pour moi :</p>
            
            <ol>
                <li><strong>Apprendre en faisant</strong> : Pour chaque concept théorique, codez immédiatement un exemple concret</li>
                <li><strong>Projet personnel précoce</strong> : Lancez un petit projet personnel dès les premières semaines</li>
                <li><strong>Révision espacée</strong> : Revisitez les concepts anciens régulièrement pour les ancrer</li>
                <li><strong>Enseigner pour apprendre</strong> : Expliquez un concept à quelqu'un d'autre (même à un canard en plastique !)</li>
                <li><strong>Code review</strong> : Demandez des retours sur votre code et analysez le code des autres</li>
                <li><strong>Journal de bord</strong> : Notez ce que vous apprenez chaque jour, les problèmes rencontrés et leurs solutions</li>
            </ol>
            
            <h3>8. Pièges à éviter</h3>
            <p>Basé sur mes erreurs et celles de mes camarades :</p>
            
            <ul>
                <li><strong>Le syndrome de l'imposteur</strong> : Tout le monde passe par là. Continuez à coder.</li>
                <li><strong>Le tutorial hell</strong> : Ne collectionnez pas les tutoriels sans pratiquer. Codez vos propres projets.</li>
                <li><strong>La comparaison toxique</strong> : Comparez-vous à vous-même d'hier, pas à un développeur senior sur Twitter.</li>
                <li><strong>Le perfectionnisme paralysant</strong> : Un projet terminé imparfait vaut mieux qu'un projet parfait jamais fini.</li>
                <li><strong>L'isolement</strong> : Le développement web se pratique en communauté. Sortez du silence.</li>
            </ul>
            
            <h3>Mon conseil principal</h3>
            <p>Ne tombez pas dans le piège de collectionner les ressources sans pratiquer. Choisissez 2-3 ressources principales (une pour la théorie, une pour la pratique, une communauté) et concentrez-vous sur la pratique régulière. C'est en codant, en faisant des erreurs et en les corrigeant qu'on apprend vraiment.</p>
            
            <p>La formation Convergence vous donne une excellente structure et un accompagnement de qualité. Utilisez ces ressources en complément pour approfondir et pratiquer davantage.</p>
            
            <h3>Ressources supplémentaires</h3>
            <p>J'ai créé une liste plus détaillée avec des liens directs, des notes personnelles et des exercices supplémentaires sur mon GitHub. N'hésitez pas à me contacter sur le Discord de Convergence si vous voulez y accéder ou si vous avez des questions sur une ressource spécifique !</p>
            
            <p>Bon courage dans votre apprentissage, et rappelez-vous : chaque expert était un jour débutant. ✨</p>
        `
    }
};

// ============================================
// 5. FONCTIONS EXISTANTES (CONSERVÉES)
// ============================================

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    renderTestimonials();
    renderArticles();
    renderRecentPosts();
    initEventListeners();
    updateFilterCounts();
    showBothSections();
    
    // Scroll vers #testimonials si ?section=testimonials dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('section') === 'testimonials') {
        setTimeout(function() {
            const el = document.getElementById('testimonials');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
    
    // Initialiser les nouveaux managers
    window.userManager = new UserManager();
    window.commentManager = new CommentManager();
    window.popupManager = new PopupManager();
    
    // Ajouter les données structurées SEO
    addStructuredData();

    // Corriger d'éventuels anciens liens relatifs encore présents en cache
    normalizeLegacyBlogLinks(document);
});

// Menu mobile
function initMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('show');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Mettre à jour les compteurs de filtres
function updateFilterCounts() {
    const filters = ['sante', 'tourisme', 'business', 'devweb', 'presentiel', 'online'];
    
    filters.forEach(filter => {
        const count = testimonialsData.filter(t => t.categories.includes(filter)).length;
        const button = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (button) {
            button.innerHTML = `${getFilterLabel(filter)} <span class="filter-count">(${count})</span>`;
        }
    });
}

// Obtenir le label d'un filtre
function getFilterLabel(filter) {
    const labels = {
        'sante': 'Santé',
        'tourisme': 'Tourisme',
        'business': 'Business',
        'devweb': 'Dev Web',
        'presentiel': 'Présentiel',
        'online': 'En ligne'
    };
    return labels[filter] || filter;
}

// Afficher les avis
function renderTestimonials(filter = 'all') {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    let filteredTestimonials = testimonialsData;
    
    if (filter !== 'all') {
        filteredTestimonials = testimonialsData.filter(testimonial => 
            testimonial.categories.includes(filter)
        );
    }
    
    // Grouper par formation pour l'affichage
    const groupedTestimonials = {};
    filteredTestimonials.forEach(testimonial => {
        if (!groupedTestimonials[testimonial.school]) {
            groupedTestimonials[testimonial.school] = [];
        }
        groupedTestimonials[testimonial.school].push(testimonial);
    });
    
    let html = '';
    
    // Afficher d'abord Santé, puis Tourisme, Business, Dev Web
    const order = ['Santé', 'Tourisme', 'Business', 'Dev Web'];
    
    order.forEach(school => {
        if (groupedTestimonials[school] && groupedTestimonials[school].length > 0) {
            // Ajouter un titre de section si on filtre par "all"
            if (filter === 'all') {
                html += `<div class="formation-section-title">Formation ${school}</div>`;
            }
            
            // Ajouter les avis de cette formation
            groupedTestimonials[school].forEach(testimonial => {
                html += `
                    <div class="testimonial-card ${testimonial.school.toLowerCase().replace(' ', '-')}" data-categories="${testimonial.categories.join(' ')}" data-testimonial-id="${testimonial.id}">
                        <div class="testimonial-header">
                            <div class="testimonial-avatar ${testimonial.school.toLowerCase().replace(' ', '-')}" style="${testimonial.avatarImage ? 'background-image: url(' + testimonial.avatarImage + '); background-size: cover;' : ''}">
                                ${testimonial.avatarImage ? '' : '<i class="' + testimonial.avatarIcon + '"></i>'}
                            </div>
                            <div class="testimonial-info">
                                <h4>${testimonial.name}</h4>
                                <div class="testimonial-meta">
                                    ${testimonial.formation}
                                    <span class="format">${testimonial.format}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="testimonial-rating">
                            ${getStarRating(testimonial.rating)}
                        </div>
                        
                        <div class="testimonial-content">
                            "${testimonial.content}"
                        </div>
                        
                        <div class="testimonial-footer">
                            <div class="formation-type">
                                <i class="fas fa-graduation-cap"></i> ${testimonial.school}
                            </div>
                            <a href="#" class="btn btn-small read-testimonial-btn" data-testimonial-id="${testimonial.id}" style="margin-top: 10px;">
                                <i class="fas fa-expand-alt"></i> Lire le témoignage
                            </a>
                            <div class="date">
                                <i class="far fa-calendar"></i> Promotion 2023
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    });
    
    grid.innerHTML = html || '<p class="no-results">Aucun avis trouvé pour ce filtre.</p>';
}

// Générer les étoiles de notation
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Afficher les articles
function renderArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;
    
    // Convertir l'objet articlesData en tableau
    const articlesArray = Object.values(articlesData);
    
    grid.innerHTML = articlesArray.map(article => `
        <article class="article-card" data-article="${article.id}">
            <div class="article-image" style="background-color: ${article.color}; ${article.image ? 'background-image: url(' + article.image + '); background-size: cover;' : ''}">
                ${article.image ? '' : '<i class="' + article.icon + '"></i>'}
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span class="category">${article.category}</span>
                    <span class="student-badge">Étudiant</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="#" class="read-more" data-article="${article.id}">
                    Lire l'article <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Afficher les articles récents
function renderRecentPosts() {
    const container = document.getElementById('recentPosts');
    if (!container) return;
    
    // Convertir l'objet articlesData en tableau et prendre les 3 premiers
    const recentArticles = Object.values(articlesData).slice(0, 3);
    
    container.innerHTML =     recentArticles.map(article => `
        <div class="recent-post" data-article="${article.id}">
            <div class="recent-post-image" style="background-color: ${article.color}; ${article.image ? 'background-image: url(' + article.image + '); background-size: cover;' : ''}">
                ${article.image ? '' : '<i class="' + article.icon + '"></i>'}
            </div>
            <div class="recent-post-content">
                <h4>${article.title}</h4>
                <div class="recent-post-date">${article.date}</div>
            </div>
        </div>
    `).join('');
}

// Initialiser les événements
function initEventListeners() {
    // Filtres des avis
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Appliquer le filtre
            const filter = this.getAttribute('data-filter');
            renderTestimonials(filter);
        });
    });
    
    // Ouvrir un article
    document.addEventListener('click', function(e) {
        // Bouton "Lire l'article"
        if (e.target.closest('.read-more')) {
            e.preventDefault();
            const articleId = e.target.closest('.read-more').getAttribute('data-article');
            showArticleDetail(articleId);
        }
        
        // Bouton "Lire le témoignage"
        if (e.target.closest('.read-testimonial-btn')) {
            e.preventDefault();
            const testimonialId = parseInt(e.target.closest('.read-testimonial-btn').getAttribute('data-testimonial-id'), 10);
            showTestimonialModal(testimonialId);
        }
        
        // Article récent dans la sidebar
        if (e.target.closest('.recent-post')) {
            const articleId = e.target.closest('.recent-post').getAttribute('data-article');
            showArticleDetail(articleId);
        }
    });
    
    // Formulaire newsletter
    const newsletterForm = document.getElementById('sidebarNewsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre inscription ! Vous recevrez désormais les nouveaux articles et témoignages par email.');
            this.reset();
        });
    }
    
    // Animation au survol des cartes
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.article-card')) {
            const card = e.target.closest('.article-card');
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        }
        
        if (e.target.closest('.testimonial-card')) {
            const card = e.target.closest('.testimonial-card');
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.article-card')) {
            const card = e.target.closest('.article-card');
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        }
        
        if (e.target.closest('.testimonial-card')) {
            const card = e.target.closest('.testimonial-card');
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow)';
        }
    });
}

// Afficher un article détaillé
function showArticleDetail(articleId) {
    const article = articlesData[articleId];
    
    if (!article) {
        alert("Article non trouvé");
        return;
    }
    
    const articlesListPage = document.querySelector('.articles-list-page');
    const articleDetailPage = document.getElementById('article-detail');
    const testimonialsSection = document.querySelector('.testimonials-section');
    
    // Créer le contenu de l'article détaillé avec section commentaires
    const articleHTML = `
        <div class="article-full" data-article-id="${article.id}">
            <div class="article-full-image" style="background-color: ${article.color}; ${article.image ? 'background-image: url(' + article.image + '); background-size: cover;' : ''}">
                ${article.image ? '' : '<i class="' + article.icon + '"></i>'}
            </div>
            <div class="article-full-content">
                <div class="article-full-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span class="category">${article.category}</span>
                    <span class="student-badge">Étudiant</span>
                    <div class="author">
                        <div class="author-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <div><strong>${article.author}</strong></div>
                            <div style="font-size: 0.9rem;">${article.authorRole}</div>
                        </div>
                    </div>
                </div>
                
                <h1>${article.title}</h1>
                
                <div class="article-body">
                    ${article.content}
                </div>
                
                <!-- Section commentaires -->
                <div class="comments-section" id="commentsSection">
                    <h2>Commentaires <span class="comments-count">(0)</span></h2>
                    
                    <div class="comments-container" id="commentsContainer">
                        <!-- Commentaires chargés dynamiquement -->
                    </div>
                    
                    <!-- Formulaire de commentaire -->
                    <div class="comment-form-container" id="commentForm">
                        <h3>Ajouter un commentaire</h3>
                        <div class="comment-form-notice">
                            <i class="fas fa-info-circle"></i>
                            Connectez-vous pour commenter ou répondez en tant qu'invité.
                        </div>
                        
                        <form id="newCommentForm">
                            <!-- Si connecté -->
                            <div class="logged-user-info" id="loggedUserInfo" style="display: none;">
                                <div class="user-comment-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div>
                                    <strong class="comment-author-name">Thomas</strong>
                                    <span class="comment-role">Étudiant</span>
                                </div>
                            </div>
                            
                            <!-- Si invité -->
                            <div class="guest-fields" id="guestFields">
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="text" id="guestName" placeholder="Votre nom *" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" id="guestEmail" placeholder="Votre email (non publié) *" required>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <textarea id="commentContent" placeholder="Votre commentaire *" rows="5" required></textarea>
                                <div class="textarea-info">
                                    <span class="char-count">0/500 caractères</span>
                                    <span class="format-hint">
                                        <i class="fas fa-code"></i> Code autorisé
                                    </span>
                                </div>
                            </div>
                            
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary" id="submitComment">
                                    <i class="fas fa-paper-plane"></i> Publier le commentaire
                                </button>
                                <button type="reset" class="btn btn-secondary">
                                    <i class="fas fa-times"></i> Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <a href="#testimonials" class="btn btn-secondary" id="viewTestimonialsFromArticle" style="margin-right: 10px;">
                    <i class="fas fa-comments"></i> Voir les témoignages
                </a>
                <a href="#" class="back-to-blog" id="backToBlog">
                    <i class="fas fa-arrow-left"></i> Retour au blog
                </a>
            </div>
        </div>
    `;
    
    // Cacher les autres sections et afficher l'article
    if (articlesListPage) articlesListPage.style.display = 'none';
    if (testimonialsSection) testimonialsSection.style.display = 'none';
    
    articleDetailPage.innerHTML = articleHTML;
    articleDetailPage.style.display = 'block';
    normalizeLegacyBlogLinks(articleDetailPage);
    
    // Mettre à jour l'affichage utilisateur dans le formulaire de commentaire
    if (blogCurrentUser) {
        document.getElementById('loggedUserInfo').style.display = 'flex';
        document.getElementById('guestFields').style.display = 'none';
        document.querySelector('.comment-author-name').textContent = blogCurrentUser.name || 'Utilisateur';
        document.querySelector('.comment-role').textContent = (blogCurrentUser.role === 'administrator') ? 'Administrateur' : 'Étudiant';
        document.getElementById('guestName')?.removeAttribute('required');
        document.getElementById('guestEmail')?.removeAttribute('required');
    } else {
        document.getElementById('loggedUserInfo').style.display = 'none';
        document.getElementById('guestFields').style.display = 'block';
        document.getElementById('guestName')?.setAttribute('required', 'required');
        document.getElementById('guestEmail')?.setAttribute('required', 'required');
    }
    
    // Charger les commentaires pour cet article
    if (window.commentManager) {
        window.commentManager.loadComments(parseInt(articleId));
    }
    
    // Faire défiler vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Ajouter l'événement pour le bouton retour
    document.getElementById('backToBlog').addEventListener('click', function(e) {
        e.preventDefault();
        showArticlesList();
    });
    
    // Bouton "Voir les témoignages" - retour à la liste et scroll vers témoignages
    const viewTestimonialsBtn = document.getElementById('viewTestimonialsFromArticle');
    if (viewTestimonialsBtn) {
        viewTestimonialsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showArticlesList();
            setTimeout(function() {
                const testimonialsEl = document.getElementById('testimonials');
                if (testimonialsEl) {
                    testimonialsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    }
}

// Afficher le témoignage en modal
function showTestimonialModal(testimonialId) {
    const testimonial = testimonialsData.find(t => t.id === testimonialId);
    if (!testimonial) return;
    
    const modal = document.createElement('div');
    modal.className = 'testimonial-modal-overlay';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;padding:20px;';
    modal.innerHTML = `
        <div class="testimonial-modal" style="background:white;border-radius:12px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;padding:30px;position:relative;">
            <button class="testimonial-modal-close" style="position:absolute;top:15px;right:15px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#666;">&times;</button>
            <div class="testimonial-modal-avatar" style="width:80px;height:80px;border-radius:50%;margin:0 auto 15px;background-size:cover;background-position:center;${testimonial.avatarImage ? 'background-image:url(' + testimonial.avatarImage + ')' : 'background:#2c5aa0;color:white;display:flex;align-items:center;justify-content:center;'}">
                ${testimonial.avatarImage ? '' : '<i class="' + testimonial.avatarIcon + '" style="font-size:2rem;"></i>'}
            </div>
            <h3 style="text-align:center;margin-bottom:5px;">${testimonial.name}</h3>
            <p style="text-align:center;color:#6c757d;margin-bottom:20px;">${testimonial.formation} - ${testimonial.school}</p>
            <div class="testimonial-modal-content" style="font-style:italic;line-height:1.7;">"${testimonial.content}"</div>
        </div>
    `;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.closest('.testimonial-modal-close')) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// Revenir à la liste des articles
function showArticlesList() {
    const articlesListPage = document.querySelector('.articles-list-page');
    const articleDetailPage = document.getElementById('article-detail');
    const testimonialsSection = document.querySelector('.testimonials-section');
    
    if (articlesListPage) articlesListPage.style.display = 'block';
    if (testimonialsSection) testimonialsSection.style.display = 'block';
    if (articleDetailPage) articleDetailPage.style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Afficher les deux sections
function showBothSections() {
    const articlesListPage = document.querySelector('.articles-list-page');
    const testimonialsSection = document.querySelector('.testimonials-section');
    
    if (articlesListPage) articlesListPage.style.display = 'block';
    if (testimonialsSection) testimonialsSection.style.display = 'block';
}

// Données structurées pour le SEO
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog Étudiant - École Convergence",
        "description": "Articles rédigés par les étudiants, avis sur les formations Santé, Tourisme, Business et Développement Web",
        "url": window.location.href,
        "publisher": {
            "@type": "EducationalOrganization",
            "name": "École Convergence",
            "url": "https://www.convergence-ecole.fr"
        },
        "about": {
            "@type": "Thing",
            "name": "Formations étudiantes, avis éducatifs, témoignages étudiants"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// État de l'application
let currentView = 'both'; // 'both', 'articles', 'testimonials'
let currentFilter = 'all';

// ============================================
// 6. CSS SUPPLÉMENTAIRE DYNAMIQUE
// ============================================

// Ajouter du CSS pour les nouveaux éléments
const style = document.createElement('style');
style.textContent = `
    .filter-count {
        font-size: 0.8em;
        opacity: 0.8;
        margin-left: 3px;
    }
    
    .formation-section-title {
        grid-column: 1 / -1;
        font-size: 1.3rem;
        font-weight: 600;
        color: #2c5aa0;
        margin: 20px 0 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid #4ecdc4;
    }
    
    .formation-section-title:first-child {
        margin-top: 0;
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        color: #6c757d;
        font-style: italic;
    }
    
    /* Styles pour les nouveaux éléments ajoutés dans le HTML */
    .user-message {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 99999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    }
    
    .user-message.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .user-message-success {
        border-left: 4px solid #28a745;
        color: #155724;
    }
    
    .user-message-success i {
        color: #28a745;
    }
    
    .user-message-error {
        border-left: 4px solid #dc3545;
        color: #721c24;
    }
    
    .user-message-error i {
        color: #dc3545;
    }
    
    .user-message-info {
        border-left: 4px solid #17a2b8;
        color: #0c5460;
    }
    
    .user-message-info i {
        color: #17a2b8;
    }
    
    /* Modal de connexion */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
    }
    
    .modal {
        background: white;
        border-radius: 12px;
        max-width: 400px;
        width: 100%;
        position: relative;
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    
    .modal-close:hover {
        background: #f5f5f5;
    }
    
    .modal-header {
        padding: 25px 25px 15px;
        border-bottom: 1px solid #eee;
    }
    
    .modal-header h3 {
        margin: 0 0 5px;
        color: #2c5aa0;
    }
    
    .modal-header p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .modal-body {
        padding: 25px;
    }
    
    .modal-links {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        font-size: 0.9rem;
    }
    
    .modal-links a {
        color: #2c5aa0;
        text-decoration: none;
    }
    
    .modal-links a:hover {
        text-decoration: underline;
    }
    
    .demo-accounts {
        margin-top: 25px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #4ecdc4;
    }
    
    .demo-accounts h4 {
        margin: 0 0 10px;
        font-size: 0.9rem;
        color: #666;
    }
    
    .demo-account {
        font-size: 0.85rem;
        color: #333;
        margin-bottom: 5px;
    }
    
    .modal-note {
        margin-top: 20px;
        padding: 15px;
        background: #e8f4fd;
        border-radius: 8px;
        border-left: 4px solid #2c5aa0;
        font-size: 0.9rem;
        color: #2c5aa0;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    /* Alertes commentaires */
    .comment-alert {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: fadeIn 0.3s ease;
    }
    
    .comment-alert-success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .comment-alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .no-comments {
        text-align: center;
        padding: 40px;
        color: #666;
        font-style: italic;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    /* Animation pour les nouveaux commentaires */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Style pour les commentaires */
    .comment {
        animation: fadeIn 0.5s ease;
    }
    
    /* Pop-up succès */
    .popup-success {
        text-align: center;
        padding: 20px;
    }
    
    .popup-success i {
        font-size: 3rem;
        color: #28a745;
        margin-bottom: 15px;
    }
    
    .popup-success strong {
        display: block;
        margin-bottom: 10px;
        color: #2c5aa0;
        font-size: 1.2rem;
    }
    
    .popup-success p {
        color: #666;
        margin: 0;
    }
    
    /* Formulaires */
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: #2c5aa0;
        outline: none;
        box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }
    
    .btn-block {
        width: 100%;
    }
    
    /* Reply form */
    .reply-form {
        margin-top: 15px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 3px solid #4ecdc4;
    }
    
    .reply-actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
    
    .btn-small {
        padding: 8px 16px;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);


window.UserManager = UserManager;
window.CommentManager = CommentManager;
window.PopupManager = PopupManager;

console.log('Blog.js chargé avec succès !');
console.log('Fonctionnalités disponibles :');
console.log('- Gestion des utilisateurs (connexion/inscription/profil)');
console.log('- Système de commentaires relié à WordPress');
console.log('- Pop-up newsletter configurable');
console.log('- Filtrage des avis étudiants');
console.log('- Articles détaillés avec section commentaires');
// ============================================
// 7. GESTION DU RÉFÉRENCEMENT IMPLICITE
// ============================================

class ContextualReferenceManager {
    constructor() {
        this.contextualData = this.getContextualData();
    }
    
    getContextualData() {
        return {
            formations: [
                {
                    id: 'sante',
                    title: 'Formations Santé',
                    icon: 'fas fa-heartbeat',
                    color: '#ff6b35',
                    description: 'Infirmier, Kinésithérapeute, Aide-soignant, Ergothérapeute',
                    link: withSection(blogUrls.formations, 'sante'),
                    tags: ['medical', 'soin', 'clinique', 'santé', 'médecin', 'patient', 'hospitalier']
                },
                {
                    id: 'tourisme',
                    title: 'Formations Tourisme',
                    icon: 'fas fa-plane',
                    color: '#4ecdc4',
                    description: 'Management hôtelier, Guide touristique, Tourisme durable',
                    link: withSection(blogUrls.formations, 'tourisme'),
                    tags: ['voyage', 'hotellerie', 'guide', 'tourisme', 'destination', 'culture']
                },
                {
                    id: 'business',
                    title: 'Formations Business',
                    icon: 'fas fa-chart-line',
                    color: '#2c5aa0',
                    description: 'MBA, Marketing Digital, Management, Entrepreneuriat',
                    link: withSection(blogUrls.formations, 'business'),
                    tags: ['management', 'marketing', 'commerce', 'business', 'entreprise', 'stratégie']
                },
                {
                    id: 'devweb',
                    title: 'Formations Dev Web',
                    icon: 'fas fa-laptop-code',
                    color: '#9c27b0',
                    description: 'Développeur Full-Stack, Front-End, Mobile, UX/UI',
                    link: withSection(blogUrls.formations, 'devweb'),
                    tags: ['programmation', 'web', 'code', 'développement', 'technologie', 'digital']
                }
            ],
            autresPages: [
                {
                    title: 'FAQ Étudiants',
                    description: 'Trouvez réponses à vos questions sur l\'admission, le financement, les stages...',
                    icon: 'fas fa-question-circle',
                    link: blogUrls.faq || '/faq/',
                    imageColor: '#2c5aa0'
                },
                {
                    title: 'Contactez-nous',
                    description: 'Échangez avec notre équipe pédagogique pour un conseil personnalisé',
                    icon: 'fas fa-envelope',
                    link: blogUrls.contact || '/contact/',
                    imageColor: '#4ecdc4'
                },
                {
                    title: 'Témoignages',
                    description: 'Découvrez les parcours et réussites de nos diplômés',
                    icon: 'fas fa-comments',
                    link: withSection(blogUrls.home || '/', 'testimonials'),
                    imageColor: '#ff6b35'
                }
            ]
        };
    }
    
    // Ajouter le référencement implicite dans un article
    injectContextualReferences(articleId, articleContent) {
        // Générer les liens contextuels
        const contextualLinksHTML = this.generateContextualLinks(articleContent);
        
        // Générer les suggestions
        const suggestionsHTML = this.generateArticleSuggestions(articleId);
        
        // Générer le CTA
        const ctaHTML = this.generateArticleCTA(this.getArticleCategory(articleId));
        
        // Générer le bloc ressources
        const resourcesHTML = this.generateResourcesBlock(articleId);
        
        // Injecter le tout dans l'article
        const articleBody = document.querySelector('.article-body');
        if (articleBody) {
            // Ajouter les liens contextuels après l'introduction
            const firstParagraph = articleBody.querySelector('p');
            if (firstParagraph) {
                firstParagraph.insertAdjacentHTML('afterend', resourcesHTML);
            }
            
            // Ajouter les liens contextuels avant la conclusion
            const lastHeading = articleBody.querySelector('h3:last-of-type, h2:last-of-type');
            if (lastHeading) {
                lastHeading.insertAdjacentHTML('afterend', contextualLinksHTML);
            }
            
            // Ajouter le CTA après le contenu principal
            articleBody.insertAdjacentHTML('afterend', ctaHTML);
            
            // Ajouter les suggestions après le CTA
            const ctaElement = document.querySelector('.article-cta');
            if (ctaElement) {
                ctaElement.insertAdjacentHTML('afterend', suggestionsHTML);
            }
        }
        
        // Ajouter les liens contextuels dans le contenu
        this.addInContentLinks(articleContent);
    }
    
    // Générer les liens contextuels selon le contenu de l'article
    generateContextualLinks(articleContent) {
        const keywords = this.extractKeywords(articleContent);
        const relevantFormations = this.getRelevantFormations(keywords);
        
        if (relevantFormations.length === 0) {
            return ''; // Pas de formations pertinentes
        }
        
        return `
            <div class="contextual-links" id="contextualLinks">
                <div class="contextual-links-header">
                    <i class="fas fa-link"></i>
                    <div>
                        <h3>Formations liées à cet article</h3>
                        <p>Découvrez les formations Convergence correspondant à vos intérêts</p>
                    </div>
                </div>
                
                <div class="contextual-links-grid">
                    ${relevantFormations.map(formation => `
                        <div class="contextual-link-card">
                            <div class="contextual-link-icon ${'icon-' + formation.id}">
                                <i class="${formation.icon}"></i>
                            </div>
                            <h4>${formation.title}</h4>
                            <p>${formation.description}</p>
                            <a href="${formation.link}" class="btn btn-small" style="background-color: ${formation.color}; color: white;">
                                <i class="fas fa-graduation-cap"></i> Découvrir
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Extraire les mots-clés du contenu
    extractKeywords(content) {
        const commonWords = ['le', 'la', 'les', 'de', 'des', 'du', 'et', 'ou', 'à', 'au', 'aux', 'dans', 'par', 'pour', 'sur', 'avec', 'est', 'son', 'ses', 'que', 'qui', 'dans', 'plus', 'tout', 'comme', 'fait', 'faire', 'aussi'];
        const words = content.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3 && !commonWords.includes(word));
        
        // Compter les occurrences
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Retourner les 15 mots les plus fréquents
        return Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15)
            .map(entry => entry[0]);
    }
    
    // Obtenir les formations pertinentes selon les mots-clés
    getRelevantFormations(keywords) {
        const formations = this.contextualData.formations;
        const scoredFormations = formations.map(formation => {
            let score = 0;
            formation.tags.forEach(tag => {
                keywords.forEach(keyword => {
                    if (keyword.includes(tag) || tag.includes(keyword)) {
                        score += 2;
                    }
                });
            });
            
            // Bonus pour les mots exacts
            keywords.forEach(keyword => {
                if (formation.tags.includes(keyword)) {
                    score += 5;
                }
            });
            
            return { ...formation, score };
        });
        
        // Trier par score et prendre les 2 meilleures (score > 0)
        return scoredFormations
            .filter(f => f.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 2);
    }
    
    // Générer les suggestions après article
    generateArticleSuggestions(articleId) {
        const suggestions = this.contextualData.autresPages;
        
        return `
            <div class="article-suggestions">
                <div class="suggestions-header">
                    <h3>Pour aller plus loin</h3>
                    <p>Découvrez nos autres ressources pour compléter votre lecture</p>
                </div>
                
                <div class="suggestions-grid">
                    ${suggestions.map(suggestion => `
                        <div class="suggestion-card">
                            <div class="suggestion-image" style="background: linear-gradient(135deg, ${suggestion.imageColor}, ${this.lightenColor(suggestion.imageColor, 20)});">
                                <i class="${suggestion.icon}"></i>
                            </div>
                            <div class="suggestion-content">
                                <h4>${suggestion.title}</h4>
                                <p>${suggestion.description}</p>
                                <a href="${suggestion.link}" class="btn btn-small">
                                    <i class="fas fa-arrow-right"></i> Explorer
                                </a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Générer le CTA après article
    generateArticleCTA(articleCategory) {
        let formationLink = blogUrls.formations || '/formations/';
        let formationText = 'toutes nos formations';
        
        if (articleCategory) {
            formationLink = withSection(blogUrls.formations || '/formations/', articleCategory);
            formationText = `nos formations en ${articleCategory}`;
        }
        
        return `
            <div class="article-cta">
                <h3>Cet article vous a plu ?</h3>
                <p>Découvrez ${formationText} et construisez votre avenir professionnel avec Convergence.</p>
                <div class="cta-buttons">
                    <a href="${formationLink}" class="cta-btn">
                        <i class="fas fa-graduation-cap"></i> Voir nos formations
                    </a>
                    <a href="${blogUrls.contact || '/contact/'}" class="cta-btn cta-btn-secondary">
                        <i class="fas fa-comments"></i> Discuter avec un conseiller
                    </a>
                </div>
            </div>
        `;
    }
    
    // Générer le bloc ressources
    generateResourcesBlock(articleId) {
        const contactUrl = blogUrls.contact || '/contact/';
        const brochureRequestUrl = withQuery(contactUrl, { subject: 'brochure' });
        const webinarRequestUrl = withQuery(contactUrl, { subject: 'webinar' });
        const faqUrl = blogUrls.faq || '/faq/';
        const advisorUrl = contactUrl;

        return `
            <div class="resources-block">
                <h4><i class="fas fa-book-open"></i> Ressources complémentaires</h4>
                <ul class="resources-list">
                    <li>
                        <i class="fas fa-file-pdf"></i>
                        <a href="${brochureRequestUrl}">Télécharger notre brochure formations (PDF)</a>
                    </li>
                    <li>
                        <i class="fas fa-calendar-alt"></i>
                        <a href="${webinarRequestUrl}">S'inscrire à notre prochain webinar découverte</a>
                    </li>
                    <li>
                        <i class="fas fa-chalkboard-teacher"></i>
                        <a href="${faqUrl}">Consulter la FAQ étudiante</a>
                    </li>
                    <li>
                        <i class="fas fa-handshake"></i>
                        <a href="${advisorUrl}">Prendre rendez-vous avec un conseiller</a>
                    </li>
                </ul>
            </div>
        `;
    }
    
    // Ajouter des liens contextuels dans le contenu
    addInContentLinks(content) {
        // Cette fonction serait appelée pour transformer certains mots du contenu en liens
        // Pour l'instant, c'est un placeholder pour une fonctionnalité avancée
        return content;
    }
    
    // Obtenir la catégorie de l'article
    getArticleCategory(articleId) {
        const article = articlesData[articleId];
        if (!article) return null;

        // Mapping explicite par article pour garantir des redirections stables
        const explicitByArticle = {
            1: 'devweb',   // Projet React
            2: 'business', // Alternance marketing digital
            3: 'devweb',   // UX/UI (parcours numérique)
            4: 'devweb'    // Ressources développement web
        };
        if (explicitByArticle[articleId]) {
            return explicitByArticle[articleId];
        }
        
        // Extraire la catégorie du titre ou du contenu
        const content = article.title + ' ' + article.content;
        const normalized = content.toLowerCase();
        if (normalized.includes('santé') || normalized.includes('medical')) return 'sante';
        if (normalized.includes('tourisme') || normalized.includes('voyage')) return 'tourisme';
        if (normalized.includes('business') || normalized.includes('marketing')) return 'business';
        if (
            normalized.includes('développement') ||
            normalized.includes('programmation') ||
            normalized.includes('react') ||
            normalized.includes('javascript') ||
            normalized.includes('ux/ui') ||
            normalized.includes('ux') ||
            normalized.includes('ui') ||
            normalized.includes('figma')
        ) return 'devweb';
        
        return null;
    }
    
    // Éclaircir une couleur
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }
}

// Fonctions globales pour les actions
window.downloadBrochure = function(articleId) {
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message user-message-success';
    userMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div>
            <strong>Téléchargement commencé !</strong>
            <p>Votre brochure sera disponible dans quelques secondes.</p>
        </div>
    `;
    
    document.body.appendChild(userMessage);
    
    setTimeout(() => {
        userMessage.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        userMessage.classList.remove('show');
        setTimeout(() => userMessage.remove(), 300);
    }, 5000);
    
    // Simuler le téléchargement
    setTimeout(() => {
        alert('Merci pour votre intérêt ! La brochure "Formations Convergence 2023" a été téléchargée.');
    }, 1000);
    
    // Ici, ajouter la logique de téléchargement réel
    // window.open('brochure.pdf', '_blank');
};

window.showWebinarModal = function(articleId) {
    const modalHTML = `
        <div class="modal-overlay" id="webinarModal">
            <div class="modal">
                <button class="modal-close" onclick="closeWebinarModal()">&times;</button>
                <div class="modal-header">
                    <h3>Webinar découverte</h3>
                    <p>Assistez à notre prochaine session d'information en ligne</p>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #2c5aa0, #4ecdc4); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                            <i class="fas fa-video"></i>
                        </div>
                    </div>
                    
                    <h4 style="text-align: center; color: #2c5aa0; margin-bottom: 15px;">Prochain webinar :</h4>
                    <p style="text-align: center; font-size: 1.2rem; font-weight: 600; margin-bottom: 10px;">"Les métiers du digital en 2023"</p>
                    <p style="text-align: center; color: #666; margin-bottom: 25px;">Mercredi 28 juin 2023 à 18h30 (durée : 1h)</p>
                    
                    <form id="webinarForm">
                        <div class="form-group">
                            <input type="text" placeholder="Votre nom *" required>
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Votre email *" required>
                        </div>
                        <div class="form-group">
                            <select required>
                                <option value="">Formation qui vous intéresse *</option>
                                <option value="sante">Santé</option>
                                <option value="tourisme">Tourisme</option>
                                <option value="business">Business</option>
                                <option value="devweb">Développement Web</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">
                            <i class="fas fa-calendar-check"></i> S'inscrire au webinar
                        </button>
                    </form>
                    
                    <div class="modal-note" style="margin-top: 20px;">
                        <i class="fas fa-info-circle"></i>
                        Vous recevrez un lien de connexion par email 24h avant l'événement.
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Gérer la soumission
    document.getElementById('webinarForm').addEventListener('submit', function(e) {
        e.preventDefault();
        closeWebinarModal();
        
        const successMsg = document.createElement('div');
        successMsg.className = 'user-message user-message-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Inscription confirmée !</strong>
                <p>Vous recevrez bientôt les détails de connexion.</p>
            </div>
        `;
        
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => successMsg.remove(), 300);
        }, 5000);
    });
};

window.closeWebinarModal = function() {
    const modal = document.getElementById('webinarModal');
    if (modal) modal.remove();
};

// Mettre à jour la fonction showArticleDetail pour inclure le référencement implicite
const originalShowArticleDetail = window.showArticleDetail;
window.showArticleDetail = function(articleId) {
    // Appeler la fonction originale
    originalShowArticleDetail(articleId);
    
    // Attendre que l'article soit chargé
    setTimeout(() => {
        const article = articlesData[articleId];
        if (article) {
            // Initialiser le gestionnaire de référencement
            const refManager = new ContextualReferenceManager();
            
            // Injecter les références contextuelles
            refManager.injectContextualReferences(articleId, article.content);
            
            // Ajouter les liens dans le footer de l'article
            const articleFooter = document.querySelector('.article-full-content');
            if (articleFooter) {
                const footerLinks = `
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                        <h4>Sur le même sujet :</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
                            <a href="${withSection(blogUrls.formations || '/formations/', 'sante')}" class="formation-badge badge-sante">Formations Santé</a>
                            <a href="${withSection(blogUrls.formations || '/formations/', 'tourisme')}" class="formation-badge badge-tourisme">Formations Tourisme</a>
                            <a href="${withSection(blogUrls.formations || '/formations/', 'business')}" class="formation-badge badge-business">Formations Business</a>
                            <a href="${withSection(blogUrls.formations || '/formations/', 'devweb')}" class="formation-badge badge-devweb">Formations Dev Web</a>
                            <a href="${blogUrls.faq || '/faq/'}" class="formation-badge" style="background: #6c757d;">FAQ</a>
                            <a href="${blogUrls.contact || '/contact/'}" class="formation-badge" style="background: #17a2b8;">Contact</a>
                        </div>
                    </div>
                `;
                articleFooter.insertAdjacentHTML('beforeend', footerLinks);
            }
        }
    }, 100);
};

// Initialiser le gestionnaire de référencement
window.contextualRefManager = new ContextualReferenceManager();

console.log('✅ Système de référencement implicite chargé avec succès !');
console.log('Fonctionnalités disponibles :');
console.log('- Liens contextuels vers les formations');
console.log('- Suggestions de pages complémentaires');
console.log('- CTA personnalisés selon le contenu');
console.log('- Bloc ressources téléchargeables');