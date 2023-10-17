import React from 'react';
import useDesigner from './hooks/useDesigner';
import { FormElements } from './FormElements';

function PropertiesFormSidebar() {
    const { selectedElement } = useDesigner();

    if (!selectedElement) return null;
    const PropertiesForm = FormElements[selectedElement?.type].formComponent;

    return <PropertiesForm />;
}

export default PropertiesFormSidebar;
