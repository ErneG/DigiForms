import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElements';

function DragOverlayWrapper() {
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
    return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
