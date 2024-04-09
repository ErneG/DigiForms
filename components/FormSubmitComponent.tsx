'use client';

import React, { useCallback, useRef, useState, useTransition } from 'react';
import { FormElementInstance, FormElements } from './FormElements';
import { HiCursorClick } from 'react-icons/hi';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { SubmitForm } from '@/actions/form';

function FormSubmitComponent({
    formUrl,
    content
}: {
    formUrl: string;
    content: FormElementInstance[];
}) {
    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({}); // Stores the ids of the elements that are invalid
    const [renderKey, setRenderKey] = useState(new Date().getTime()); // Used to force a re-render of the form. If the key of an element changes, the the element is re-rendered

    const [submitted, setSubmitted] = useState(false);
    const [pending, startTransition] = useTransition();

    const validateForm: () => boolean = useCallback(() => {
        for (const field of content) {
            const actualValue = formValues.current[field.id] || '';
            const valid = FormElements[field.type].validate(field, actualValue);

            if (!valid) {
                formErrors.current[field.id] = true;
            }
        }

        if (Object.keys(formErrors.current).length > 0) {
            return false;
        }
        return true;
    }, [content]);

    const submitValue = (key: string, value: string) => {
        formValues.current[key] = value;
    };

    const submitForm = async () => {
        formErrors.current = {};
        const validForm = validateForm();

        if (!validForm) {
            setRenderKey(new Date().getTime());
            toast({
                title: 'Invalid form',
                description: 'Please check the form for errors',
                variant: 'destructive',
                duration: 5000
            });
            return;
        }
        try {
            const JsonContent = JSON.stringify(formValues.current);
            await SubmitForm(formUrl, JsonContent);
            setSubmitted(true);
        } catch (error) {
            toast({
                title: 'Invalid form',
                description: 'Something went wrong',
                variant: 'destructive',
                duration: 5000
            });
        }

        console.log('Form values', formValues.current);
    };

    if (submitted) {
        return (
            <div className=" flex justify-center w-full h-full items-center p-8">
                <div className="max-w-[620px] justify-center items-center flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-2xl shadow-purple-700 rounded-xl">
                    <h1 className="text-2xl font-bold">Form submitted</h1>
                    <p className=" text-muted-foreground">
                        Thank you for submitting the form, you can close this
                        page now
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div
                key={renderKey}
                className="max-w-[620px] justify-center items-center flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-2xl shadow-purple-700 rounded-xl"
            >
                {content.map((element) => {
                    const FormElement =
                        FormElements[element.type].formComponent;

                    return (
                        <FormElement
                            key={element.id}
                            elementInstance={element}
                            submitValue={submitValue}
                            isInvalid={formErrors.current[element.id]}
                            defaultValue={formValues.current[element.id]}
                        />
                    );
                })}
                <Button
                    className=" mt-8 flex flex-row gap-2"
                    onClick={() => {
                        submitForm();
                        startTransition(submitForm);
                    }}
                    disabled={submitted || pending}
                >
                    {!pending && (
                        <div>
                            <HiCursorClick />
                        </div>
                    )}
                    {pending && <ImSpinner2 className=" animate-spin" />}
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default FormSubmitComponent;
