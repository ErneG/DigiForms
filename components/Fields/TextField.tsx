'use client';

import { MdTextFields } from 'react-icons/md';
import {
    ElementsType,
    FormElement,
    FormElementInstance
} from '../FormElements';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const type: ElementsType = 'TextField';

const extraAttributes = {
    label: 'Text field',
    helperText: 'Helper text',
    required: false,
    placeHolder: 'Value here...'
};

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: 'Text Field'
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: () => <div>Properties component</div>
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
    elementInstance
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, require, placeHolder, helperText } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {element.extraAttributes.label}
                {element.extraAttributes.required && '*'}
            </Label>
            <Input readOnly disabled placeholder={placeHolder} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">
                    {helperText}
                </p>
            )}
        </div>
    );
}
