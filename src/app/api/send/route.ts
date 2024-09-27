import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import ContactMeEmail from '@/components/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, emailAddress, phoneNumber, content } = await req.json()
    
    const { data, error } = await resend.emails.send({
      from: emailAddress,
      to: ['circulomolinari@protonmail.com'],
      subject: `Inscripción de ${name}`,
      react: ContactMeEmail({ name, emailAddress, phoneNumber, content }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
