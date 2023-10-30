import React from 'react';
import {z} from 'zod';

import {getBaseType} from './utils';

/**
 * Convert a Zod schema to HTML input props to give direct feedback to the user.
 * Once submitted, the schema will be validated completely.
 */
export function zodToHtmlInputProps(
	schema:
		| z.ZodNumber
		| z.ZodString
		| z.ZodOptional<z.ZodNumber | z.ZodString>
		| any,
): React.InputHTMLAttributes<HTMLInputElement> {
	if (['ZodOptional', 'ZodNullable'].includes(schema._def.typeName)) {
		const typedSchema = schema as z.ZodOptional<z.ZodNumber | z.ZodString>;
		return {
			...zodToHtmlInputProps(typedSchema._def.innerType),
			required: false,
		};
	}

	const typedSchema = schema as z.ZodNumber | z.ZodString;

	if (!('checks' in typedSchema._def)) return {};

	const {checks} = typedSchema._def;
	const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
		required: true,
	};
	const type = getBaseType(schema);

	for (const check of checks) {
		if (check.kind === 'min') {
			if (type === 'ZodString') {
				inputProps.minLength = check.value;
			} else {
				inputProps.min = check.value;
			}
		}
		if (check.kind === 'max') {
			if (type === 'ZodString') {
				inputProps.maxLength = check.value;
			} else {
				inputProps.max = check.value;
			}
		}
	}

	return inputProps;
}
