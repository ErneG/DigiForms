'use client';
// REACT and NEXT
import React from 'react';

// ICONS

// TYPES
import { Form } from '@prisma/client';
import PreviewDialogButton from './PreviewDialogButton';
import PublishFormButton from './PublishFormButton';
import SaveFormButton from './SaveFormButton';
import Designer from './Designer';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
// COMPONENTS

function FormBuilder({ form }: { form: Form }) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10 //activates the dragging motion only if moved by more than 10 px
        }
    });

    const sensors = useSensors(mouseSensor);
    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
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
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px]  bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
}

export default FormBuilder;
