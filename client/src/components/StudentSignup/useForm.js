import {useState, useEffect} from 'react'


const useForm = validate => {
    const[values, setValues] = useState({
        studname: '',
        studrollno: '',
        studemail: '',
        programme: '',
        branch: '',
        sem: '',
        graduationYear: '',
        gender: '',
        phone: '',
        hack_id: '',
        password: '',
        password2: '',
    })
    const[errors, setErrors] = useState({})


    const handleChange = e => {
        const { name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values));
    }

    return {handleChange, values, handleSubmit, errors};
}

export default useForm