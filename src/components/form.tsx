'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres',
	}),
	email: z.string().email({
		message: 'Ingresa un formato correcto de correo electrónico',
	}),
	phone: z.string().min(2, {
		message: 'Introduce un número de teléfono válido',
	}),
	content: z.string(),
});

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await fetch('/api/send', {
			method: 'POST',
			body: JSON.stringify({
				name: values.name,
				emailAddress: values.email,
				phoneNumber: values.phone,
				content: values.content,
			}),
		});
	}

	return (
		<div className="rounded-md drop-shadow-md mx-auto bg-amber-400 p-10 mt-10">
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="name">Nombre y apellido</label>

					<input
						className="w-full border bg-amber-200 border-amber-700 p-3 text-sm"
						type="text"
						id="name"
						{...register('name')}
					/>

					{errors?.name && (
						<p className="px-1 text-xs text-red-600">{errors.name.message}</p>
					)}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="email">Correo electrónico</label>

						<input
							className="w-full bg-amber-200 border border-amber-700 p-3 text-sm"
							type="email"
							id="email"
							{...register('email')}
						/>

						{errors?.email && (
							<p className="px-1 text-xs text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="phone">Teléfono de contacto</label>

						<input
							className="w-full bg-amber-200 border border-amber-700 p-3 text-sm"
							type="tel"
							id="phone"
							{...register('phone')}
						/>

						{errors?.phone && (
							<p className="px-1 text-xs text-red-600">
								{errors.phone.message}
							</p>
						)}
					</div>
				</div>

				<div>
					<label htmlFor="message">¿Quieres decirnos algo?</label>

					<textarea
						className="w-full rounded-md bg-amber-200 border border-amber-700 p-3 text-sm"
						rows={8}
						id="message"
						{...register('content')}
					/>
				</div>

				<div className="mt-4">
					<Button
						color="gray"
						variant="solid"
						type="submit"
						size="4"
						className="w-full"
						highContrast
					>
						Inscribirme
					</Button>
				</div>
			</form>
		</div>
	);
}
