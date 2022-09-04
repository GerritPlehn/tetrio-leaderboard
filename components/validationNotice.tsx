import { Alert } from 'antd';
import { ValidationResult } from '../types/validationResult'

export default function ValidationNotice({ validationResult }: { validationResult: ValidationResult }) {
  
  return (
    !validationResult || validationResult?.valid ? <></> :
    <Alert
      message="Invalid Replay"
      description={validationResult?.message}
      type="error"
      showIcon
    />
  )
}
