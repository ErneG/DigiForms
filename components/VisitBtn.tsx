'use client';

import React, { useEffect } from 'react';
import { Button } from './ui/button';

export default function VisitBtn({ shareUrl }: { shareUrl: string }) {
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // avoid window not defined error

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    return (
        <Button
            className="w-[200px]"
            onClick={() => {
                window.open(shareLink, '_blank');
            }}
        >
            Visit
        </Button>
    );
}
