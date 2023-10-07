'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog';
import React from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' }),
    description: z.string().optional()
});

type formSchemaType = z.infer<typeof formSchema>;

function CreateFormButton() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    function onSubmit(values: formSchemaType) {
        console.log(values);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create new form</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create form</DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}></Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateFormButton;
