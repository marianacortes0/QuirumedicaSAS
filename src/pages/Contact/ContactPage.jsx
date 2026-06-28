import { useState } from 'react';
import { MessageCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { CONTACT, buildWhatsAppUrl } from '../../config/contact';

const DETAILS = [
  {
    icon: Phone,
    label: 'Teléfono',
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phoneTel}`,
  },
  {
    icon: Mail,
    label: 'Correo',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: CONTACT.location,
    href: null,
  },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Indique su nombre.';
    if (!form.message.trim()) next.message = 'Indique su solicitud.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `Buen día. Mi nombre es ${form.name}.${
      form.contact ? ` Datos de contacto: ${form.contact}.` : ''
    } ${form.message}`;
    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contacto"
        title="Atención y cotización"
        intro="Atención de pedidos y asesoría para profesionales e instituciones de salud, por WhatsApp Business."
      />

      {/* Datos directos */}
      <dl className="mt-10 grid gap-3 sm:grid-cols-3">
        {DETAILS.map(({ icon: Icon, label, value, href }) => {
          const body = (
            <>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-dark">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <dt className="font-mono text-[0.625rem] tracking-widest text-muted uppercase">
                  {label}
                </dt>
                <dd className="text-sm font-medium break-words text-primary">{value}</dd>
              </span>
            </>
          );
          return href ? (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
            >
              {body}
            </a>
          ) : (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4"
            >
              {body}
            </div>
          );
        })}
      </dl>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-whatsapp)] px-5 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        Escribir por WhatsApp Business
      </a>

      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[0.625rem] tracking-widest text-muted uppercase">
          o mediante el formulario
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* Form — local validation, sends to WhatsApp */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-primary">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-primary focus:border-accent focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-xs text-accent-dark">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-primary">
            Teléfono o correo <span className="text-muted">(opcional)</span>
          </label>
          <input
            id="contact"
            type="text"
            value={form.contact}
            onChange={update('contact')}
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-primary focus:border-accent focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-primary">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={update('message')}
            aria-invalid={Boolean(errors.message)}
            placeholder="Ej.: tijera Metzenbaum curva de 18 cm."
            className="w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none"
          />
          {errors.message && <p className="mt-1 text-xs text-accent-dark">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light sm:w-auto"
        >
          <Send className="size-4" aria-hidden="true" />
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
}
