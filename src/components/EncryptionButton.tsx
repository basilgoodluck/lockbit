import { FaArrowRight } from "react-icons/fa";
interface EncryptionButtonProps {
    onEncrypt: () => void;
    disabled: boolean;
    className: string;
  }
  
  export function EncryptionButton({ onEncrypt, disabled, className }: EncryptionButtonProps) {
    return (
      <button
        onClick={onEncrypt}
        disabled={disabled}
        className={` ${className} `}
      >
        <FaArrowRight />
      </button>
    );
  }