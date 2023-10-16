import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';
import useDesigner from './hooks/useDesigner';

function DragOverlayWrapper() {
    const { elements } = useDesigner();
    console.log('Theese are the elements: ', elements);
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        }
    });

    if (!draggedItem) return null;

    let node = <div>No drag overlay</div>;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnELement;

    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = (
            <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
        );
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    console.log('Isdesignerelement', isDesignerElement);

    if (isDesignerElement) {
        const elementId = draggedItem.data?.current?.elementId;
        console.log('Element id on line', elementId);
        const element = elements.find((el) => {
            return el.id === elementId;
        });
        if (!element) {
            node = <div className="">Element not found</div>;
        } else {
            const DesignerElementComponent =
                FormElements[element.type].designerComponent;
            node = (
                <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80">
                    <DesignerElementComponent elementInstance={element} />
                </div>
            );
        }
    }
    return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
