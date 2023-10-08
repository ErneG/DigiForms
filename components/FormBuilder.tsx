'use client';
// REACT and NEXT
import React from 'react';

// ICONS

// TYPES
import { Form } from '@prisma/client';
import PreviewDialogButton from './PreviewDialogButton';
import PublishFormButton from './PublishFormButton';
import SaveFormButton from './SaveFormButton';
// COMPONENTS

function FormBuilder({ form }: { form: Form }) {
    return (
        <main className="flex flex-col w-full">
            <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
                <h2 className="trucate font-medium">
                    <span className="text-muted-foreground mr-2">
                        {form.name}
                    </span>
                </h2>
                <div className="flex items-center gap-2">
                    <PreviewDialogButton />
                    {!form.published && (
                        <>
                            <SaveFormButton />
                            <PublishFormButton />
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

export default FormBuilder;
