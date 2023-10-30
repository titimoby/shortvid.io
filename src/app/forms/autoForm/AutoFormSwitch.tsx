import React from 'react';

import {Switch} from './components/switch';
import {AutoFormInputComponentProps} from './types/types';
import {FormControl, FormDescription, FormItem, FormLabel} from './form';

export function AutoFormSwitch({
	label,
	isRequired,
	field,
	fieldConfigItem,
	fieldProps,
}: AutoFormInputComponentProps) {
	return (
		<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
			<FormControl>
				<Switch
					checked={field.value}
					onCheckedChange={field.onChange}
					{...fieldProps}
				/>
			</FormControl>
			<div className="space-y-1 leading-none">
				<FormLabel>
					{label}
					{isRequired && <span className="text-destructive"> *</span>}
				</FormLabel>
				{fieldConfigItem.description && (
					<FormDescription>{fieldConfigItem.description}</FormDescription>
				)}
			</div>
		</FormItem>
	);
}
