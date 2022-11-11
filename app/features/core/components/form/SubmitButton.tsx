import { useIsSubmitting } from 'remix-validated-form';

interface SubmitButtonProps {
  className?: string;
  label: string;
  labelSubmitting: string;
}

export const SubmitButton = ({className, label, labelSubmitting}: SubmitButtonProps) => {
  const isSubmitting = useIsSubmitting();

  return (
    <button
      type="submit"
      className={`${className}
      block w-full
      text-white
      bg-emerald-500 active:outline active:outline-1
      focus-visible:outline-emerald-400
      text-2xl font-bold p-4 rounded-lg`}
      disabled={isSubmitting}
    >
      {isSubmitting ? labelSubmitting : label}
    </button>
  );
};
