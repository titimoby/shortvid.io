import React from 'react';

import {Textarea} from './components/textarea';
import {AutoFormInputComponentProps} from './types/types';
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from './form';

export function AutoFormTextarea({
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
				<Textarea {...fieldProps} />
			</FormControl>
			{fieldConfigItem.description && (
				<FormDescription>{fieldConfigItem.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}
