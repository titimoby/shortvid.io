import React from 'react';

import {Button} from './components/button';

export function AutoFormSubmit({children}: {children?: React.ReactNode}) {
	return <Button type="submit">{children ?? 'Submit'}</Button>;
}
