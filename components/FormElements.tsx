import { CheckboxFieldFormElement } from './Fields/CheckboxField';
import { DateFieldFormElement } from './Fields/DateField';
import { NumberFieldFormElement } from './Fields/NumberField';
import { ParagraphFieldFormElement } from './Fields/ParagraphField';
import { SelectFieldFormElement } from './Fields/SelectField';
import { SeparatorFieldFormElement } from './Fields/SeparatorField';
import { SpacerFieldFormElement } from './Fields/SpacerField';
import { SubTitleFieldFormElement } from './Fields/SubTitleField';
import { TextAreaFieldFormElement } from './Fields/TextAreaField';
import { TextFieldFormElement } from './Fields/TextField';
import { TitleFieldFormElement } from './Fields/TitleField';

export type ElementsType =
    | 'TextField'
    | 'TitleField'
    | 'SubTitleField'
    | 'ParagraphField'
    | 'SeparatorField'
    | 'SpacerField'
    | 'NumberField'
    | 'TextAreaField'
    | 'DateField'
    | 'SelectField'
    | 'CheckboxField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;

    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    validate: (
        formElement: FormElementInstance,
        currentValue: string
    ) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement
};
