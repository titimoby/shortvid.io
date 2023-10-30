import {AutoFormCheckbox} from '../AutoFormCheckbox';
import {AutoFormDate} from '../AutoFormDate';
import {AutoFormEnum} from '../AutoFormEnum';
import {AutoFormNumber} from '../AutoFormNumber';
import {AutoFormRadioGroup} from '../AutoFormRadioGroup';
import {AutoFormSwitch} from '../AutoFormSwitch';
import {AutoFormTextarea} from '../AutoFormTextArea';
import {AutoFormInput} from '../components/AutoFormInput';

export const INPUT_COMPONENTS = {
	checkbox: AutoFormCheckbox,
	date: AutoFormDate,
	select: AutoFormEnum,
	radio: AutoFormRadioGroup,
	switch: AutoFormSwitch,
	textarea: AutoFormTextarea,
	number: AutoFormNumber,
	fallback: AutoFormInput,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
	[key: string]: keyof typeof INPUT_COMPONENTS;
} = {
	ZodBoolean: 'checkbox',
	ZodDate: 'date',
	ZodEnum: 'select',
	ZodNativeEnum: 'select',
	ZodNumber: 'number',
};
