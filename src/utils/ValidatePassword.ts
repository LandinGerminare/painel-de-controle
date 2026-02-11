export function validatePassword(password: string) {
  return {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
}
