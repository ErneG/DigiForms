// REACT and NEXT
import React from 'react';

// ICONS
import { HiSaveAs } from 'react-icons/hi';
// TYPES

// COMPONENTS
import { Button } from './ui/button';

function SaveFormButton() {
    return (
        <Button variant={'outline'} className="gap-2">
            <HiSaveAs className="h-4 w-4" />
            Save
        </Button>
    );
}

export default SaveFormButton;
