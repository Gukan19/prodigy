
import React from 'react';

interface PasswordValidationProps {
  password: string;
  isVisible: boolean;
}

interface PasswordRequirements {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
}

export const validatePassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return {
    isValid: minLength && hasUpper && hasLower && hasNumber,
    requirements: {
      minLength,
      hasUpper,
      hasLower,
      hasNumber
    }
  };
};

const PasswordValidation: React.FC<PasswordValidationProps> = ({ password, isVisible }) => {
  if (!password || !isVisible) return null;

  const validation = validatePassword(password);

  return (
    <div className="text-xs space-y-1 mt-2">
      <p className={`${validation.requirements.minLength ? 'text-green-400' : 'text-red-400'}`}>
        ✓ At least 8 characters
      </p>
      <p className={`${validation.requirements.hasUpper ? 'text-green-400' : 'text-red-400'}`}>
        ✓ Uppercase letter
      </p>
      <p className={`${validation.requirements.hasLower ? 'text-green-400' : 'text-red-400'}`}>
        ✓ Lowercase letter
      </p>
      <p className={`${validation.requirements.hasNumber ? 'text-green-400' : 'text-red-400'}`}>
        ✓ Number
      </p>
    </div>
  );
};

export default PasswordValidation;
