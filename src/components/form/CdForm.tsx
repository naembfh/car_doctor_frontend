import React from 'react';
import { useForm } from 'react-hook-form';

const CdForm = ({ onSubmit, children }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                React.Children.map(children, child => {
                 
                    if (React.isValidElement(child) && typeof child.type === 'function') {
                        return React.cloneElement(child, { register, errors });
                    }
                    return child;
                })
            }
        </form>
    );
};

export default CdForm;
