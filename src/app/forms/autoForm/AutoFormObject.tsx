import React from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './components/accordion';
import {DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS} from './constants/constant';
import {FieldConfig, FieldConfigItem} from './types/types';
import {beautifyObjectName, getBaseType} from './utils/utils';
import {zodToHtmlInputProps} from './utils/zodToHtmlInputProps.utils';
import {FormField} from './form';

function DefaultParent({children}: {children: React.ReactNode}) {
	return <>{children}</>;
}

export function AutoFormObject<SchemaType extends z.ZodObject<any, any>>({
	schema,
	form,
	fieldConfig,
	path = [],
}: {
	schema: SchemaType;
	form: ReturnType<typeof useForm>;
	fieldConfig?: FieldConfig<z.infer<SchemaType>>;
	path?: string[];
}) {
	const {shape} = schema;

	return (
		<Accordion type="multiple" className="space-y-5">
			{Object.keys(shape).map((name) => {
				const item = shape[name] as z.ZodAny;
				const zodBaseType = getBaseType(item);
				const itemName = item._def.description ?? beautifyObjectName(name);
				const key = `${path.join('.')}.${name}`;

				if (zodBaseType === 'ZodObject') {
					return (
						<AccordionItem value={name} key={key}>
							<AccordionTrigger>{itemName}</AccordionTrigger>
							<AccordionContent className="p-2">
								<AutoFormObject
									schema={item as unknown as z.ZodObject<any, any>}
									form={form}
									fieldConfig={
										(fieldConfig?.[name] ?? {}) as FieldConfig<
											z.infer<typeof item>
										>
									}
									path={[...path, name]}
								/>
							</AccordionContent>
						</AccordionItem>
					);
				}

				const fieldConfigItem: FieldConfigItem = fieldConfig?.[name] ?? {};
				const zodInputProps = zodToHtmlInputProps(item);
				const isRequired =
					zodInputProps.required ??
					fieldConfigItem.inputProps?.required ??
					false;

				return (
					<FormField
						control={form.control}
						name={key}
						key={key}
						render={({field}) => {
							const inputType =
								fieldConfigItem.fieldType ??
								DEFAULT_ZOD_HANDLERS[zodBaseType] ??
								'fallback';

							const InputComponent =
								typeof inputType === 'function'
									? inputType
									: INPUT_COMPONENTS[inputType];
							const ParentElement =
								fieldConfigItem.renderParent ?? DefaultParent;

							return (
								<ParentElement key={`${key}.parent`}>
									<InputComponent
										zodInputProps={zodInputProps}
										field={field}
										fieldConfigItem={fieldConfigItem}
										label={itemName}
										isRequired={isRequired}
										zodItem={item}
										fieldProps={{
											...zodInputProps,
											...field,
											...fieldConfigItem.inputProps,
											value: !fieldConfigItem.inputProps?.defaultValue
												? field.value ?? ''
												: undefined,
										}}
									/>
								</ParentElement>
							);
						}}
					/>
				);
			})}
		</Accordion>
	);
}
