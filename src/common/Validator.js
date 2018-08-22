import validate from "validate.js";

const constraints = {
    phone: {
        presence: true,
        format: {
            pattern: /^([0-9]{9,15})$/,
            message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                return validate.format("Số điện thoại không hợp lệ", {
                    num: value
                });
            }
        },
        length: {
            presence: true,
            minimum: 10,
            maximum: 15,
            message: 'Số điện thoại không hợp lệ'
        }
    },
    email: {
        presence: true,
        format: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: function (value, attribute, validatorOptions, attributes, globalOptions) {
                return validate.format("Địa chỉ Email không hợp lệ", { num: value });
            }
        }
    }
};

export const Validator = {
    checkPhone: (value) => {
        return validate({ phone: value }, constraints);
    },

    checkEmail: (value) => {
        return validate({ email: value }, constraints);
    }
}