import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElements } from './FormElements';
import { Button } from './ui/button';
import { AiOutlineClose } from 'react-icons/ai';
function PropertiesFormSidebar() {
    const { selectedElement, setSelectedElement } = useDesigner();

    if (!selectedElement) {
        console.log('no element to display');

        return null;
    }

    const PropertiesForm = FormElements[selectedElement?.type].formComponent;
    return (
        <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/70">Element properties</p>
            <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => {
                    setSelectedElement(null);
                }}
            >
                <AiOutlineClose />
            </Button>
            <PropertiesForm />
        </div>
    );
}

export default PropertiesFormSidebar;
