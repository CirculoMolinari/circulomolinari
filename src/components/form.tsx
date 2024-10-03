'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'El nombre debe tener al menos 2 caracteres',
		})
		.max(50),
	email: z
		.string()
		.email({
			message: 'Ingresa un formato correcto de correo electrónico',
		})
		.max(50),
	phone: z
		.string()
		.min(2, {
			message: 'Introduce un número de teléfono válido',
		})
		.max(20),
	content: z.string().max(500),
});

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful, errors },
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
		<div className="relative rounded-md drop-shadow-md mx-auto bg-amber-400 p-10 mt-10">
			{isSubmitSuccessful && (
				<div className="absolute rounded-md drop-shadow-md p-10 z-10 bg-amber-400 w-full h-full top-0 left-0">
					<Text as="p" className="text-2xl font-semibold">
						¡Inscripción enviada con éxito!
					</Text>
					<Text as="p" className="text-lg mt-5">
						¡Gracias por inscribirte! En breve nos pondremos en contacto.
					</Text>
				</div>
			)}

			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="name" className="font-semibold">
						Nombre y apellido
					</label>

					<input
						className="w-full mt-2 border rounded-md focus:outline-none bg-amber-100 border-amber-500 shadow-sm p-3 text-sm"
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
						<label htmlFor="email" className="font-semibold">
							Correo electrónico
						</label>

						<input
							className="w-full mt-2 focus:outline-none shadow-sm rounded-md bg-amber-100 border border-amber-500 p-3 text-sm"
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
						<label htmlFor="phone" className="font-semibold">
							Teléfono de contacto
						</label>

						<input
							className="w-full mt-2 shadow-sm rounded-md focus:outline-none bg-amber-100 border border-amber-500 p-3 text-sm"
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
					<label htmlFor="message" className="font-semibold">
						¿Quieres decirnos algo?
					</label>

					<textarea
						className="w-full mt-2 rounded-md shadow-md focus:outline-none bg-amber-100 border border-amber-500 p-3 text-sm"
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
						className="w-full font-semibold"
						highContrast
						disabled={isSubmitting}
					>
						{!isSubmitting ? 'Inscribirme' : 'Enviando inscripción...'}
					</Button>
				</div>
			</form>
		</div>
	);
}
