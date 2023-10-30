'use client';

import React from 'react';
import {DefaultValues, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {cn} from '../../utils/classname';

import {FieldConfig, ZodObjectOrWrapped} from './types/types';
import {getDefaultValues, getObjectFormSchema} from './utils/utils';
import {AutoFormObject} from './AutoFormObject';
import {Form} from './form';

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
	formSchema,
	values: valuesProp,
	onValuesChange: onValuesChangeProp,
	onSubmit: onSubmitProp,
	fieldConfig,
	children,
	className,
}: {
	formSchema: SchemaType;
	values?: Partial<z.infer<SchemaType>>;
	onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
	onSubmit?: (values: z.infer<SchemaType>) => void;
	fieldConfig?: FieldConfig<z.infer<SchemaType>>;
	children?: React.ReactNode;
	className?: string;
}) {
	const objectFormSchema = getObjectFormSchema(formSchema);
	const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> =
		getDefaultValues(objectFormSchema);

	const form = useForm<z.infer<typeof objectFormSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
		values: valuesProp,
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const parsedValues = formSchema.safeParse(values);
		if (parsedValues.success) {
			onSubmitProp?.(parsedValues.data);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					form.handleSubmit(onSubmit)(e);
				}}
				onChange={() => {
					const values = form.getValues();
					const parsedValues = formSchema.safeParse(values);

					if (parsedValues.success) {
						onValuesChangeProp?.(parsedValues.data);
					}
				}}
				className={cn('space-y-5', className)}
			>
				<AutoFormObject
					schema={objectFormSchema}
					form={form}
					fieldConfig={fieldConfig}
				/>
				{children}
			</form>
		</Form>
	);
}

export default AutoForm;
