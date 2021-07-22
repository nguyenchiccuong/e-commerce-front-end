export function invalidUsernameException() {
  return "Username not valid";
}

export function invalidNameException() {
  return "Name not valid";
}

export function invalidEmailException() {
  return "Email not valid";
}

export function invalidPhoneNumberException() {
  return "Phone number not valid";
}

export function invalidPasswordException() {
  return "Password not valid";
}

export function nullPasswordException() {
  return "Password null";
}

export function nullUsernameException() {
  return "Username null";
}

export function usernamePasswordWrongException() {
  return "Username password wrong";
}

export function serverErrorExceptionException() {
  return "Server error, try again later!";
}

export function invalidRepeatPasswordException() {
  return "Repeat password not valid";
}

export function notCheckAgreementException() {
  return "Please read and check the agreement!";
}

export function customerSignUpFailException(error) {
  return error.response === undefined
    ? "Fail to sign up"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to sign up";
}

export function customerSignInFailException(error) {
  return error.response === undefined
    ? "Fail to sign in"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Username, password wrong";
}

export function employeeSignInFailException(error) {
  return error.response === undefined
    ? "Fail to sign in"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Username, password wrong";
}

export function countCustomerFailException(error) {
  return error.response === undefined
    ? "Fail to count customer"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to count customer";
}

export function getCustomerFailException(error) {
  return error.response === undefined
    ? "Fail to get customer"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to get customer";
}

export function lockCustomerFailException(error) {
  return error.response === undefined
    ? "Fail to lock customer"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to lock customer";
}

export function unlockCustomerFailException(error) {
  return error.response === undefined
    ? "Fail to unlock customer"
    : error.response.data.errorCode !== undefined
    ? error.response.data.errorCode
    : error.response.data.message !== undefined
    ? error.response.data.message
    : "Fail to unlock customer";
}
