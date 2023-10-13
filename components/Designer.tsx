'use client';

import React from 'react';
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import useDesigner from './hooks/useDesigner';
import {
    ElementsType,
    FormElementInstance,
    FormElements
} from './FormElements';
import { idGenerator } from '@/lib/idGenerator';

function Designer() {
    const { elements, addElement } = useDesigner();
    const droppable = useDroppable({
        id: 'designer-drop-area',
        data: {
            isDesignerDropArea: true
        }
    });

    console.log('Elements', elements);
    useDndMonitor({
        //can be used because the whole FormBuilder is wrapped in a DndContext
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;

            const isDesignerBtnELement =
                active?.data?.current?.isDesignerBtnELement;
            if (isDesignerBtnELement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                );
                addElement(0, newElement);
                console.log('NEW ELEMENT', newElement);
            }
            console.log('drag event', event);
        }
    });
    return (
        <div className="flex w-full h-full">
            <div className="p-4 w-full">
                <div
                    ref={droppable.setNodeRef}
                    className={cn(
                        'bg-background max-w-[920ox] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
                        droppable.isOver && 'ring-2 ring-primary/20'
                    )}
                >
                    {!droppable.isOver && elements.length === 0 && (
                        <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                            Drop here
                        </p>
                    )}
                    {droppable.isOver && (
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    )}
                    {elements.length > 0 && (
                        <div className="flex flex-col w-full gap-2 p-4">
                            {elements.map((element) => (
                                <DesignerElementWrapper
                                    key={element.id}
                                    element={element}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSidebar />
        </div>
    );
}
function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
    const DesignerElement = FormElements[element.type].designerComponent;

    return <DesignerElement elementInstance={element} />;
}
export default Designer;
