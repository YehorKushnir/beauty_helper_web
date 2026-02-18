export function getErrorFromUrl(error_code?: string) {
  switch (error_code) {
    case 'UNAUTHORIZED':
      return 'Unauthorized'
    case 'EXIST':
      return 'Account already exists'
    case 'NOT_LINKED':
      return 'Account is not linked'
    case 'INVALID_MODE':
      return 'Something went wrong during authentication'
    default:
      return error_code
  }
}
