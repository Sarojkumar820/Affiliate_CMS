const BASE_URL = "https://affiliate.antworksmoney.in";

const siteConfig = {
    USER_ALREADY_REGISTERED: "1",
    USER_NOT_REGISTERED: "2",
    USER_PHONE_SEND_OTP: `${BASE_URL}/api/auth/user/send-otp`,
    USER_VERIFY: `${BASE_URL}/api/auth/user/verify-otp`,
    REGISTER: `${BASE_URL}/auth/user/register`,
};


export default siteConfig;