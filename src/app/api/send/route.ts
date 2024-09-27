import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'eduardo.mathias@protonmail.com',
      to: 'circulomolinari@protonmail.com',
      subject: 'Inscripción',
      text: 'Ejemplo'
      //react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
