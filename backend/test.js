const docusign = require("docusign-esign");
const { INTEGRATOR_KEY, USER_ID, ACCOUNT_ID, DOCUSIGN_API_URL } = require("./config/doucsignConfig");

(async () => {
  try {
    console.log("Integrator Key:", INTEGRATOR_KEY);
    console.log("User ID:", USER_ID);
    console.log("Account ID:", ACCOUNT_ID);
    console.log("DocuSign API URL:", DOCUSIGN_API_URL);
  } catch (error) {
    console.error("Error testing DocuSign setup:", error);
  }
})();
