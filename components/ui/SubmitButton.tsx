
type SubmitButtonProps = {
 styles: string,
 disabled: boolean
 value: string,
 disabledValue: string
}

export default function SubmitButton({ styles, disabled, value, disabledValue }: Readonly<SubmitButtonProps>) {
  return (
    <input 
        type="submit"
        className={styles}
        disabled={disabled}
        aria-disabled={disabled}
        value={disabled ? disabledValue : value}
    />
  )
}
