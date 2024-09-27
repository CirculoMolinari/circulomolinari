import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactMeEmailProps {
	name: string;
	emailAddress: string;
	phoneNumber: string;
	content: string;
}

const ContactMeEmail = ({
	name,
	content,
	emailAddress,
	phoneNumber,
}: ContactMeEmailProps) => {
	const previewText = `${name} has a message`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Inscripción de <strong>{name}</strong>
						</Heading>

						<Text className="text-[#666666] text-[12px] leading-[24px]">
							{name} desea inscribirse. Su dirección de correco electrónica es{' '}
							{emailAddress} y el teléfono de contacto {phoneNumber}
						</Text>

						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

						<Text className="text-black text-[14px] leading-[24px]">
							Dejó el siguiente comentario
						</Text>

						<Text className="text-black text-[14px] leading-[24px]">
							{content}
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ContactMeEmail;
