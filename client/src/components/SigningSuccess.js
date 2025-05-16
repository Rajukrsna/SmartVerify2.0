import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SigningSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem("successfulSign", "true");

    setTimeout(() => {
      window.close(); // ✅ Close the signing tab
      // ✅ Redirect (optional)
    }, 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", paddingTop: "150px" }}>
      <h2>{t("signingSuccess.title")}</h2>
      <p>{t("signingSuccess.redirect")}</p>
    </div>
  );
};

export default SigningSuccess;
