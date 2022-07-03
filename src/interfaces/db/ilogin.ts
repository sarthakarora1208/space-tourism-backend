export interface ILogin<T = any> {

    authenticated: boolean;

    // checkes
    otp_passed: boolean;
    pin_passed: boolean;
    fp_passed: boolean;
    device_passed: boolean;

    // has
    has_otp: boolean;
    has_pin: boolean;
    has_fp: boolean;
    has_device: boolean;
    
    // values
    _otp_value?: string;
    _pin_value?: string;
    _fp_value?: string;
    _device_value?: string;
    
    user_registred: boolean;
    user_verified: boolean;

    resend_otp_after?: number;

    data?: T
    _sandbox?: boolean;
}
export interface ILoginTransportObj<T=any> {
    contact_reference_id?: number;
    phone_number?: string;
    device_value?: string;
    fp_value?: string;
    login: ILogin<T>
}
