import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {formValidation} from "../utils/validation"
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import {AddNewPost} from "../store/actions"
import {connect, useDispatch} from "react-redux"


const Form = styled.form
    `
        display: flex;
        flex-direction: column;
        background-color: lightblue;
        width: 50%;
        margin: 3% auto;
        padding: 2% 0; 
        `

const Label = styled.label
    `
        justify-content: flex-end;
        `

const TextBox = styled.input
    `
        margin-top: 3%;
        height: 100px;
        width: 50%;
        
        `

const Input = styled.input
    `
        margin-top: 3%;
        `

const Button = styled.button
    `
    margin: 3% auto;
width: 30%;

`

const initialFormValues = {
    title: '',
    textbox: '',
    created_at: '',
}

const initialFormErrors = {
    title: '',
    textbox: '',
    created_at: '',
}



function AddPost(props) {
    const { push } = useHistory()
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [formDisabled, setFormDisabled] = useState(true)


    useEffect(() => {
        formValidation.isValid(formValues)
            .then(valid => { // either true or false
                setFormDisabled(!valid)
            })
    }, [formValues])

    const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
        yup
            .reach(formValidation, name)
            .validate(value)
            .then(valid => {
                setFormErrors({
                    ...formErrors,
                    [name]: formValues.name,

                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.message
                })
            })
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const newPost = {
        title: formValues.title,
        caption: formValues.textbox,
        created_at: formValues.created_at,
    }


    return (
        <Form onSubmit={()=>{
            dispatch(AddNewPost(newPost))
        }}>
            <h2>Add Post</h2>
            <Label>Post Title:&nbsp;
                <Input
                    value={formValues.title}
                    onChange={onInputChange}
                    name='title'
                    type='text'
                />
            </Label>

            {formErrors.title}

            <Label>Caption: &nbsp;
                <TextBox

                    value={formValues.textbox}
                    onChange={onInputChange}

                    name='textbox'
                    type='text'
                />
            </Label>
            {formErrors.textbox}

            <Label>Date added:&nbsp;
                <Input

                    value={formValues.created_at}
                    onChange={onInputChange}
                    name='created_at'
                    type='text'
                    placeholder="Ex. Apr 26 2020"
                />
            </Label>
            {formErrors.created_at}

            {/* ////////// DISABLED CANNOT SUBMIT UNTIL ALL IS COMPLETE ////////// */}

            {<Button /*onClick={onSubmit}*/ disabled={!formDisabled}>Add New Post</Button>}

        </Form >
    )
}


const mapStateToProps = state => {
    console.log(`add post`, state)
    return {
isLoading: state.postReducer.isLoading,
blogs: state.postReducer.blogs
    }
}
export default connect(
    mapStateToProps,
    {AddNewPost},
)(AddPost)
