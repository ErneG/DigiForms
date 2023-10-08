// REACT and NEXT
import React from 'react';

// ICONS
import { MdPreview } from 'react-icons/md';
// TYPES

// COMPONENTS
import { Button } from './ui/button';

function PreviewDialogButton() {
    return (
        <Button variant={'outline'} className="gap-2">
            <MdPreview className="h-6 w-6" />
            Preview
        </Button>
    );
}

export default PreviewDialogButton;
