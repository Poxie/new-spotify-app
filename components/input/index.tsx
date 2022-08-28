import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import styles from './Input.module.scss';

export const Input: React.FC<{
    focusOnMount?: boolean;
    containerClassName?: string;
    inputClassName?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    value?: string;
    name?: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    textArea?: boolean;
}> = ({ focusOnMount, containerClassName, inputClassName, onChange, onSubmit, name, label, textArea=false, type='text', value: _value }) => {
    const [value, setValue] = useState(_value || '');
    const ref = useRef<any>(null);

    // Set value change, update input value
    useEffect(() => {
        setValue(_value)
    }, [_value]);

    // Handling change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
        onChange && onChange(e.currentTarget.value);
    }
    // Handling keypress
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && e.currentTarget.value) {
            onSubmit && onSubmit(e.currentTarget.value);
        }
    }
    // Focusing on mount
    useEffect(() => {
        if(focusOnMount) {
            ref.current?.focus();
        }
    }, [focusOnMount]);

    // Creating general properties
    const props = {
        type,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        className: inputClassName,
        value,
        name,
        required: true,
        ref
    }

    containerClassName = [
        styles['container'],
        containerClassName
    ].join(' ');
    inputClassName = [
        styles['input'],
        inputClassName
    ].join(' ');
    return(
        <div className={containerClassName}>
            {textArea ? (
                <textarea 
                    {...props}
                />
            ) : (
                <input 
                    {...props}
                />
            )}
            {label && (
                <label htmlFor={name}>
                    {label}
                </label>
            )}
        </div>
    )
}