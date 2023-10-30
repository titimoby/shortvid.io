import React from 'react';

import {AutoFormInput} from './components/AutoFormInput';
import {AutoFormInputComponentProps} from './types/types';

export function AutoFormNumber({
	fieldProps,
	...props
}: AutoFormInputComponentProps) {
	return (
		<AutoFormInput
			fieldProps={{
				type: 'number',
				...fieldProps,
			}}
			{...props}
		/>
	);
}
