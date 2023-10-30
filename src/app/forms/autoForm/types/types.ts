import React from 'react';
import {ControllerRenderProps, FieldValues} from 'react-hook-form';
import {z} from 'zod';

import {INPUT_COMPONENTS} from '../constants/constant';

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
	// If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
	[Key in keyof SchemaType]?: SchemaType[Key] extends object
		? FieldConfig<z.infer<SchemaType[Key]>>
		: FieldConfigItem;
};

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export type AutoFormInputComponentProps = {
	zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
	field: ControllerRenderProps<FieldValues, any>;
	fieldConfigItem: FieldConfigItem;
	label: string;
	isRequired: boolean;
	fieldProps: any;
	zodItem: z.ZodAny;
};

export type ZodObjectOrWrapped =
	| z.ZodObject<any, any>
	| z.ZodEffects<z.ZodObject<any, any>>;

export type FieldConfigItem = {
	description?: React.ReactNode;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	fieldType?:
		| keyof typeof INPUT_COMPONENTS
		| React.FC<AutoFormInputComponentProps>;

	renderParent?: (props: {
		children: React.ReactNode;
	}) => React.ReactElement | null;
};
