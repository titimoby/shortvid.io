import React from 'react';

import {AutoFormInputComponentProps} from '../AutoForm';
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '../form';

import {Input} from './input';

export function AutoFormInput({
	label,
	isRequired,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	return (
		<FormItem>
			<FormLabel>
				{label}
				{isRequired && <span className="text-destructive"> *</span>}
			</FormLabel>
			<FormControl>
				<Input type="text" {...fieldProps} />
			</FormControl>
			{fieldConfigItem.description && (
				<FormDescription>{fieldConfigItem.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}
