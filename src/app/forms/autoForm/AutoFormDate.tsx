import React from 'react';

import {DatePicker} from './components/date-picker';
import {AutoFormInputComponentProps} from './types/types';
import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from './form';

export function AutoFormDate({
	label,
	isRequired,
	field,
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
				<DatePicker
					date={field.value}
					setDate={field.onChange}
					{...fieldProps}
				/>
			</FormControl>
			{fieldConfigItem.description && (
				<FormDescription>{fieldConfigItem.description}</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	);
}
