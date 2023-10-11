'use client';

import React, { useContext } from 'react';
import { DesignerContext } from '../context/DesignerContent';

function useDesigner() {
    const context = useContext(DesignerContext);
    if (!context) {
        throw new Error('useDesigner must be used within a DesignerContext');
    }
    return context;
}

export default useDesigner;
