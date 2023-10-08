// REACT and NEXT
import React from 'react';

// ICONS
import { MdOutlinePublish } from 'react-icons/md';
// TYPES

// COMPONENTS
import { Button } from './ui/button';

function PublishFormButton() {
    return (
        <Button
            variant={'outline'}
            className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
            <MdOutlinePublish className="h-4 w-4" />
            Publish
        </Button>
    );
}

export default PublishFormButton;
