import { useState } from "react"

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue)
  const onChangeHandler = e => {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: onChangeHandler,
  }
}

export default useFormInput;