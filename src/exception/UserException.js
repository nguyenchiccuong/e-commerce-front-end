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
  if (error.response === undefined) {
    return "Fail to sign up, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_USERNAME_ALREADY_TAKEN") {
      return "Username already exist, please choose another";
    }
    if (error.response.data.errorCode === "ERR_EMAIL_ALREADY_TAKEN") {
      return "Email already exist, please choose another";
    }
    if (error.response.data.errorCode === "ERR_PHONENUMBER_ALREADY_TAKEN") {
      return "Phone number already exist, please choose another";
    }
    if (error.response.data.errorCode === "ERR_ROLE_NAME_ID_NOT_FOUND") {
      return "Role name id id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_SAVE_CUSTOMER") {
      return "save customer fail, try again later";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    return error.response.data.message;
  }
  return "Fail to sign up, try again later";
}

export function customerSignInFailException(error) {
  if (error.response === undefined) {
    return "Fail to sign in, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_USER_LOCKED") {
      return "Your account is locked, please contact admin for more in infomation";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Username, password wrong";
    }
    return error.response.data.message;
  }
  return "Username, password wrong";
}

export function employeeSignInFailException(error) {
  if (error.response === undefined) {
    return "Fail to sign in, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_USER_LOCKED") {
      return "Your account is locked, please contact admin for more in infomation";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Username, password wrong";
    }
    return error.response.data.message;
  }
  return "Username, password wrong";
}

export function countCustomerFailException(error) {
  if (error.response === undefined) {
    return "Fail to count customer, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to count customer, try again later";
}

export function getCustomerFailException(error) {
  if (error.response === undefined) {
    return "Fail to get customer, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_USER_ID_NOT_FOUND") {
      return "User id id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_SEARCH_KEYWORD_NOT_FOUND") {
      return "Search keyword not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to get customer, try again later";
}

export function lockCustomerFailException(error) {
  if (error.response === undefined) {
    return "Fail to lock customer, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_USER_ID_NOT_FOUND") {
      return "User id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_ROLE_NAME_ID_NOT_FOUND") {
      return "Role name not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to lock customer, try again later";
}

export function unlockCustomerFailException(error) {
  if (error.response === undefined) {
    return "Fail to unlock customer, try again later";
  }
  if (error.response.data.errorCode !== undefined) {
    if (error.response.data.errorCode === "ERR_USER_ID_NOT_FOUND") {
      return "User id not found, refresh and try again";
    }
    if (error.response.data.errorCode === "ERR_ROLE_NAME_ID_NOT_FOUND") {
      return "Role name not found, refresh and try again";
    }
    return error.response.data.errorCode;
  }
  if (error.response.data.message !== undefined) {
    if (error.response.data.message === "Error: Unauthorized") {
      return "Please sign in";
    }
    return error.response.data.message;
  }
  return "Fail to unlock customer, try again later";
}
