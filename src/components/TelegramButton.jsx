import { useLang } from '../i18n/LanguageContext'

export default function TelegramButton() {
  const { t } = useLang()
  return (
    <a
      href="https://t.me/stem_academia_bot?start=question"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "#229ED9",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "15px"
      }}
    >
      💬 {t.telegram_contact_manager}
    </a>
  );
}
