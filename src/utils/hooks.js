import {useState, useCallback} from 'react';
import {isEmailValid} from "./helpers/helperField";

export function useForm(inputValues) {
    const [fields, setFields] = useState(inputValues);
    const handleChange = (event) => {
        const {value, name} = event.target;
        setFields({...fields, [name]: {...fields[name], value: value}});
    };
    return {fields, handleChange, setFields};
}

export function useFormAndValidation(inputValues) {

    const [ fields, setFields ] = useState(inputValues);

    const fieldValidate = (field) => {
        if (field.rules) {
            for (let i=0; i<field.rules.length; i++) {
                const rule = field.rules[i];
                if(rule === 'required') {
                    if(field.value === '') {
                        field.error = true;
                        field.errorText = 'Необходимо заполнить поле';
                        break;
                    }
                } else if(rule === 'email') {
                    if(!isEmailValid(field.value)) {
                        field.error = true;
                        field.errorText = 'Некорректный e-mail адрес';
                        break;
                    }
                }
            }
        }
    };

    const handleChange = (e) => {

        const {name, value} = e.target;
        const field = fields[name];

        field.value = value;
        field.error = false;
        field.errorText = '';
        fieldValidate(field);

        setFields({ ...fields, [name]: { ...field } });
    };

    const validate = () => {

        let error = false;

        Object.keys(fields).forEach(function(key) {
            const field = fields[key];
            fieldValidate(field);
            if(field.error) {
                error = true;
            }
        });

        setFields({ ...fields });

        if(error) {
            return false;
        }

        return true;
    };

    const resetForm = useCallback(() => {
        Object.keys(fields).forEach(function(key) {
            const field = fields[key];
            field.value = '';
            field.error = false;
            field.errorText = '';
        });
        setFields({ ...fields });
    }, [setFields, fields]);

    return { fields, handleChange, validate, resetForm, setFields };
}