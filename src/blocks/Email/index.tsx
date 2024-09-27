import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types';
import { EmailField } from 'payload';
import { Box } from '@radix-ui/themes';
import React from 'react';

import type {
	FieldErrorsImpl,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';

export const Email: React.FC<
	EmailField & {
		errors: Partial<
			FieldErrorsImpl<{
				[x: string]: any;
			}>
		>;
		register: UseFormRegister<FieldValues & any>;
	}
> = ({ name, errors, label, register, required: requiredFromProps }) => {
	return (
		<Box>
			<div>
				<label htmlFor={name}>{label as string}</label>
				<input
					id={name}
					placeholder="Email"
					type="text"
					{...register(name, {
						pattern: /^\S[^\s@]*@\S+$/,
						required: requiredFromProps,
					})}
				/>
				{requiredFromProps && errors[name] && <div>Error</div>}
			</div>
		</Box>
	);
};
