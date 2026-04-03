require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_PASS || '').replace(/\s/g, '')
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      status,
      subject,
      formation,
      urgency,
      messageTitle,
      message
    } = req.body;

    if (!email || !message || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'Champs obligatoires manquants'
      });
    }

    const trackingNumber = `CT-${Date.now().toString().slice(-8)}`;

    // Email de confirmation à l'utilisateur
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `[Convergence] Message reçu - ${trackingNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0;">École Convergence - Confirmation de réception</h2>
          <p>Bonjour ${firstName} ${lastName},</p>
          <p>Nous avons bien reçu votre message concernant <strong>${subject}</strong>.</p>
          <p>Notre équipe vous répondra dans les plus brefs délais à l'adresse <strong>${email}</strong>.</p>
          <p><strong>Votre numéro de suivi :</strong> ${trackingNumber}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #6c757d; font-size: 0.9rem;">École Convergence - Formations Numériques Innovantes</p>
        </div>
      `
    };

    // Email au membre en charge (angoularaphael05@gmail.com)
    const teamMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECIPIENT || 'angoularaphael05@gmail.com',
      subject: `[Contact] Nouveau message - ${messageTitle} - ${trackingNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #2c5aa0;">Nouveau message de contact</h2>
          <p><strong>De :</strong> ${firstName} ${lastName} &lt;${email}&gt;</p>
          <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
          <p><strong>Statut :</strong> ${status || '-'}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Formation :</strong> ${formation || 'Non spécifique'}</p>
          <p><strong>Urgence :</strong> ${urgency || 'Normal'}</p>
          <p><strong>Titre :</strong> ${messageTitle}</p>
          <hr>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><strong>Référence :</strong> ${trackingNumber}</p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(teamMailOptions);

    res.json({
      success: true,
      trackingNumber,
      message: 'Message envoyé avec succès'
    });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'envoi du message'
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Contact Convergence démarrée sur le port ${PORT}`);
});
