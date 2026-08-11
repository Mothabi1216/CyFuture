/*==================================================
CYFUTURE — Auth Sliding Panel & Forgot Password OTP
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

  // ================= 1. SLIDING PANEL LOGIC =================
  const container = document.getElementById("auth-container");
  const signUpBtn = document.getElementById("signUp");
  const signInBtn = document.getElementById("signIn");
  const signInPanel = document.querySelector(".sign-in-container");
  const signUpPanel = document.querySelector(".sign-up-container");
  const mobileLogin = document.getElementById("mobileLogin");
  const mobileRegister = document.getElementById("mobileRegister");

  function activateRegister() {
    if (!container) return;
    container.classList.add("right-panel-active");
    if (signInPanel) signInPanel.classList.remove("active-panel");
    if (signUpPanel) signUpPanel.classList.add("active-panel");
    if (mobileLogin) mobileLogin.classList.remove("active");
    if (mobileRegister) mobileRegister.classList.add("active");
  }

  function activateLogin() {
    if (!container) return;
    container.classList.remove("right-panel-active");
    if (signInPanel) signInPanel.classList.add("active-panel");
    if (signUpPanel) signUpPanel.classList.remove("active-panel");
    if (mobileLogin) mobileLogin.classList.add("active");
    if (mobileRegister) mobileRegister.classList.remove("active");
  }

  if (signUpBtn) signUpBtn.addEventListener("click", activateRegister);
  if (signInBtn) signInBtn.addEventListener("click", activateLogin);
  if (mobileRegister) mobileRegister.addEventListener("click", activateRegister);
  if (mobileLogin) mobileLogin.addEventListener("click", activateLogin);

  const defaultPanel = container ? container.dataset.default : "login";
  if (defaultPanel === "register") {
    activateRegister();
  } else {
    activateLogin();
  }

  // ================= 2. PASSWORD VISIBILITY TOGGLE =================
  document.querySelectorAll(".toggle-pass").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const input = btn.closest(".input-group").querySelector("input");
      const icon = btn.querySelector("i");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  // Prevent default form submits on auth forms
  document.querySelectorAll(".auth-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  });

  // ================= 3. RIPPLE EFFECT ON SUBMIT =================
  document.querySelectorAll(".auth-submit").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // ================= 4. FORGOT PASSWORD OTP MODAL =================
  const modal = document.getElementById("forgotModal");
  const openBtn = document.getElementById("openForgotModal");
  const closeBtn = document.getElementById("closeForgotModal");
  const doneBtn = document.getElementById("fpDoneBtn");
  const resendBtn = document.getElementById("resendOtp");

  let generatedOTP = "";
  let targetEmail = "";

  function switchStep(stepNum) {
    document.querySelectorAll(".fp-step").forEach((step) => step.classList.remove("active"));
    const targetStep = document.getElementById(`fpStep${stepNum}`);
    if (targetStep) targetStep.classList.add("active");
  }

  function closeModal() {
    if (modal) modal.classList.remove("active");
  }

  if (openBtn) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      switchStep(1);
      if (modal) modal.classList.add("active");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside card
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Generate OTP helper function
  function generateAndSendOTP() {
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`[DEMO OTP CODE]: Your verification code is ${generatedOTP}`);
    console.log(`Generated OTP for ${targetEmail}: ${generatedOTP}`);
  }

  // Step 1: Submit Email
  const formEmail = document.getElementById("fpFormEmail");
  if (formEmail) {
    formEmail.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = document.getElementById("fpEmailInput");
      if (!emailInput) return;

      targetEmail = emailInput.value;
      const displayEmail = document.getElementById("displayFpEmail");
      if (displayEmail) displayEmail.textContent = targetEmail;

      generateAndSendOTP();
      switchStep(2);
    });
  }

  // Resend OTP handler
  if (resendBtn) {
    resendBtn.addEventListener("click", function (e) {
      e.preventDefault();
      generateAndSendOTP();
    });
  }

  // Step 2: OTP Input Auto-focusing
  const otpInputs = document.querySelectorAll(".otp-input");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Verify OTP
  const formOtp = document.getElementById("fpFormOtp");
  if (formOtp) {
    formOtp.addEventListener("submit", function (e) {
      e.preventDefault();
      const enteredOTP = Array.from(otpInputs).map((input) => input.value).join("");

      if (enteredOTP === generatedOTP) {
        switchStep(3);
      } else {
        alert("Invalid OTP code! Please check your demo code and try again.");
      }
    });
  }

  // Step 3: Reset Password Submit
  const formReset = document.getElementById("fpFormReset");
  if (formReset) {
    formReset.addEventListener("submit", function (e) {
      e.preventDefault();
      const pass1 = document.getElementById("fpNewPass").value;
      const pass2 = document.getElementById("fpConfirmPass").value;

      if (pass1 !== pass2) {
        alert("Passwords do not match!");
        return;
      }

      switchStep(4);
    });
  }

});