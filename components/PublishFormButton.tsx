// REACT and NEXT
import React, { startTransition, useTransition } from 'react';

// ICONS
import { MdOutlinePublish } from 'react-icons/md';
// TYPES

// COMPONENTS
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from './ui/alert-dialog';
import { FaSpinner } from 'react-icons/fa';
import { toast } from '@/components/ui/use-toast';
import { PublishForm, UpdateFormContent } from '@/actions/form';
import { useRouter } from 'next/navigation';
import useDesigner from './hooks/useDesigner';

function PublishFormButton({ id }: { id: number }) {
    const { elements } = useDesigner();
    const [loading, startTransition] = useTransition();

    const updateFormContent = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive'
            });
        }
    };

    const router = useRouter();

    async function publishForm() {
        try {
            await updateFormContent();
            await PublishForm(id);
            toast({
                title: 'Success',
                description: 'Your form has been published'
            });
            router.refresh();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong'
            });
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={'outline'}
                    className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
                >
                    <MdOutlinePublish className="h-4 w-4" />
                    Publish
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. After publishing you WILL
                        NOT be able to update the form <br />
                        <br />
                        <span className="font-medium">
                            By publishing this form you will make it available
                            to the public and you will be able to collect
                            submissions
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                        className="flex flex-row gap-2"
                    >
                        Proceed
                        {loading && <FaSpinner className="animate-spin" />}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PublishFormButton;
