interface EncryptionButtonProps {
    onEncrypt: () => void;
    disabled: boolean;
  }
  
  export function EncryptionButton({ onEncrypt, disabled }: EncryptionButtonProps) {
    return (
      <button
        onClick={onEncrypt}
        disabled={disabled}
        className={`w-full py-3 rounded-md text-white font-semibold
          ${disabled ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-500 hover:bg-accent-600'}
          transition-colors duration-200`}
      >
        Encrypt Data
      </button>
    );
  }