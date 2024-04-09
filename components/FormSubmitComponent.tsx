'use client';

import React, { useRef } from 'react';
import { FormElementInstance, FormElements } from './FormElements';
import { HiCursorClick } from 'react-icons/hi';
import { Button } from './ui/button';

function FormSubmitComponent({
    formUrl,
    content
}: {
    formUrl: string;
    content: FormElementInstance[];
}) {
    const formValues = useRef<{ [key: string]: string }>({});

    const submitValue = (key: string, value: string) => {
        formValues.current[key] = value;
    };

    const submitForm = () => {
        console.log('Form values', formValues.current);
    };

    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div className="max-w-[620px] justify-center items-center flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto shadow-2xl shadow-purple-700 rounded-xl">
                {content.map((element) => {
                    const FormElement =
                        FormElements[element.type].formComponent;

                    return (
                        <FormElement
                            key={element.id}
                            elementInstance={element}
                            submitValue={submitValue}
                        />
                    );
                })}
                <Button
                    className=" mt-8 flex flex-row gap-2"
                    onClick={() => {
                        submitForm();
                    }}
                >
                    <HiCursorClick />
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default FormSubmitComponent;
