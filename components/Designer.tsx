'use client';

import React, { useState } from 'react';
import DesignerSidebar from './DesignerSidebar';
import {
    DragEndEvent,
    useDndMonitor,
    useDraggable,
    useDroppable
} from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import useDesigner from './hooks/useDesigner';
import {
    ElementsType,
    FormElementInstance,
    FormElements
} from './FormElements';
import { idGenerator } from '@/lib/idGenerator';
import { Button } from './ui/button';
import { BiSolidTrash } from 'react-icons/bi';

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
    const { removeElement } = useDesigner();
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

    const topHalf = useDroppable({
        id: element.id + '-top',
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true
        }
    });

    const bottomHalf = useDroppable({
        id: element.id + '-bottom',
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true
        }
    });

    const draggable = useDraggable({
        id: element.id + '-drag-handler',
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true
        }
    });

    if (draggable.isDragging) {
        //does not show the element that is currently being dragged
        return null;
    }

    const DesignerElement = FormElements[element.type].designerComponent;

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-[120px] felx flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <div
                ref={topHalf.setNodeRef}
                className={'absolute w-full h-1/2 rounded-t-md'}
            ></div>
            <div
                ref={bottomHalf.setNodeRef}
                className="absolute w-full h-1/2 rounded-b-md bottom-0"
            ></div>
            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <Button
                            className="flex justifyc-center h-full rounded-md rounded-l-none bg-red-500"
                            variant={'outline'}
                            onClick={() => {
                                removeElement(element.id);
                            }}
                        >
                            <BiSolidTrash />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">
                            Click for properties or drag to move
                        </p>
                    </div>
                </>
            )}
            <div
                className={cn(
                    'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
                    mouseIsOver && 'opacity-30',
                    topHalf.isOver && 'border-t-4 border-t-foreground',
                    bottomHalf.isOver && 'border-b-4 border-b-foreground'
                )}
            >
                <DesignerElement elementInstance={element} />
            </div>
        </div>
    );
}
export default Designer;
