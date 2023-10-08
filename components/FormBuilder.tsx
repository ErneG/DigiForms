'use client';
// REACT and NEXT
import React from 'react';

// ICONS

// TYPES
import { Form } from '@prisma/client';
// COMPONENTS

function FormBuilder({ form }: { form: Form }) {
    return <div>FormBuilder: {form.name}</div>;
}

export default FormBuilder;
