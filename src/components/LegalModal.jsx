import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./LegalModal.css";

const CONTENT = {
    mentions: {
        title: "📜 Mentions Légales",
        sections: [
            {
                heading: "Éditeur du site",
                text: "Ce site est un portfolio personnel édité par Teddy Serin, développeur web fullstack.\nEmail : serinteddy@gmail.com",
            },
            {
                heading: "Hébergement",
                text: "Frontend hébergé sur Vercel (Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA).\nBackend hébergé sur Railway (Railway Corp., San Francisco, USA).",
            },
            {
                heading: "Propriété intellectuelle",
                text: "L'ensemble du contenu de ce site (textes, images, pixel art, code) est la propriété exclusive de Teddy Serin, sauf mention contraire. Toute reproduction est interdite sans autorisation préalable.",
            },
            {
                heading: "Responsabilité",
                text: "Les informations présentes sur ce site sont fournies à titre indicatif. Teddy Serin ne saurait être tenu responsable des erreurs ou omissions.",
            },
        ],
    },
    cookies: {
        title: "🍪 Politique de Cookies",
        sections: [
            {
                heading: "Qu'est-ce qu'un cookie ?",
                text: "Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser des informations sur votre navigation.",
            },
            {
                heading: "Cookies utilisés sur ce site",
                text: "Ce site n'utilise pas de cookies publicitaires ni de trackers tiers.\nLa progression du joueur (XP, niveau, quêtes) est stockée côté serveur via une base de données SQLite, sans cookie.",
            },
            {
                heading: "Cookies techniques",
                text: "Aucun cookie n'est déposé sur votre navigateur lors de la visite de ce portfolio. Le site fonctionne sans cookies obligatoires.",
            },
            {
                heading: "Gestion des cookies",
                text: "Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lors de leur dépôt. Consultez les paramètres de votre navigateur pour plus d'informations.",
            },
        ],
    },
    confidentialite: {
        title: "🔒 Politique de Confidentialité",
        sections: [
            {
                heading: "Données collectées",
                text: "Lors de l'utilisation du formulaire de contact, les données suivantes sont collectées : nom ou pseudo, adresse email, contenu du message. Ces données sont utilisées uniquement pour répondre à votre message.",
            },
            {
                heading: "Données de progression",
                text: "La progression du visiteur (XP, niveau, quêtes complétées, badges) est stockée anonymement sur notre serveur. Aucun identifiant personnel n'est associé à cette progression.",
            },
            {
                heading: "Conservation des données",
                text: "Les messages reçus via le formulaire de contact sont conservés dans la boîte mail personnelle de Teddy Serin et ne sont partagés avec aucun tiers.\nLa progression de jeu est réinitialisée périodiquement.",
            },
            {
                heading: "Vos droits",
                text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez : serinteddy@gmail.com",
            },
            {
                heading: "Contact",
                text: "Pour toute question relative à la confidentialité de vos données : serinteddy@gmail.com",
            },
        ],
    },
};

const LegalModal = ({ type, onClose, isBadeline }) => {
    const content = CONTENT[type];
    const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

    if (!type || !content) return null;

    return createPortal(
        <motion.div
            key={type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`legal-overlay ${themeClass}`}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="legal-box"
            >
                {/* Header */}
                <div className="legal-header">
                    <h2 className="legal-title">{content.title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fermer"
                        className="legal-close-btn"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* Body */}
                <div className="legal-body">
                    {content.sections.map((section) => (
                        <div key={section.heading} className="legal-section">
                            <h3 className="legal-section-heading">
                                {section.heading}
                            </h3>
                            <p className="legal-section-text">{section.text}</p>
                        </div>
                    ))}
                    <p className="legal-date">Dernière mise à jour : Avril 2026</p>
                </div>
            </motion.div>
        </motion.div>,
        document.body,
    );
};

export default LegalModal;