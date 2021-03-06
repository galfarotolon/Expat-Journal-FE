import * as yup from 'yup'


///FORM VALIDATIONS


///SIGNUP VALIDATION

export const formValidation = yup.object().shape({
    fullname: yup
        .string()
        .required('Name is required!'),
    username: yup
        .string()
        .required('Username is required!'),
    password: yup
        .string()
        .required('Password is required!'),

    password2:
        yup.string()
            .required('Confirm password!')
            .when("password", {
                is: value => value && value.length > 0,

                then: yup
                    .string()
                    .oneOf([yup.ref("password")], "Both passwords need to be the same")

            }),

    termsOfService: yup
        .boolean()
        .required("You must agree!!")
        .oneOf([true], "You must agree to the Terms of Service!"),

})


////////LOGIN VALIDATION

export const loginValidation =

    yup.object().shape({
        username: yup
            .string()
            .required('Username is required!'),
        password: yup
            .string()
            .required('Password is required!'),
    })


////////ADD POST VALIDATION////////

export const addPostValidation = yup.object().shape({

    title: yup
        .string()
        .required("Please add a title to your post"),


    created_at: yup
        .string()
        .required("please add a date to your post"),

    img: yup
        .string()
        .required("Please include an image URL"),


    textbox: yup
        .string()
        .required("Please include some text in your post"),


})





