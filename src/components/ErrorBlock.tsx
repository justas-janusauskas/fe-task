import { FC } from 'react'

interface IErrorBlock {
  error: String
}

const ErrorBlock: FC<IErrorBlock> = ({error}) => {
  if (!error) {
    return null
  }

  return (
    <div className="errorMessage">
      {error}
    </div>
  )
}

export default ErrorBlock
