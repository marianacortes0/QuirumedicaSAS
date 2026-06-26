import { SectionHeading } from '../../components/common/SectionHeading';
import { Reveal } from '../../components/common/Reveal';

const MISION_VISION = [
  {
    title: 'Misión',
    body: 'Quirumédica tiene como propósito satisfacer de manera oportuna y eficaz las necesidades actuales y futuras de sus clientes institucionales y distribuidores del sector salud, mediante la provisión de dispositivos, insumos e instrumentos médico-quirúrgicos que cumplen con altos estándares de calidad en sus procesos de fabricación, comercialización y distribución.',
  },
  {
    title: 'Visión',
    body: 'Consolidarnos como una empresa referente en el sector salud, reconocida por la amplitud de su portafolio, la calidad de sus productos y su capacidad de respuesta frente a las necesidades del mercado. A través de la innovación, la actualización permanente y la mejora continua, buscamos fortalecer nuestro liderazgo y generar valor para los profesionales de la salud y sus pacientes.',
  },
];

export function AboutPage() {
  return (
    <>
      {/* ── Compromiso — intro + imagen ─────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Nosotros"
              title="Nuestro compromiso"
              intro="En Quirumédica contamos con un equipo humano altamente comprometido con el cumplimiento integral de nuestros objetivos, orientado a ofrecer soluciones confiables, eficientes y de alta calidad para el sector salud."
            />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Trabajamos para aportar al desarrollo seguro de los procedimientos
              médicos y quirúrgicos, contribuyendo al bienestar del paciente y a
              la excelencia en la atención.
            </p>
          </Reveal>

          {/* Imagen — equipo / instalaciones, con zoom suave al pasar */}
          <Reveal
            delay={120}
            className="group relative overflow-hidden rounded-3xl bg-primary"
          >
            <div className="caliper absolute inset-x-0 top-0 z-10 opacity-25" />
            <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-[24rem]">
              <img
                src="/images/nosotros/nosotros.jpg"
                alt="Equipo humano de Quirumédica SAS"
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Misión & Visión — imagen + tarjetas ────────────── */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Imagen lateral — se estira a la altura de las tarjetas */}
            <Reveal className="group relative min-h-[18rem] overflow-hidden rounded-3xl bg-primary lg:min-h-full">
              <div className="caliper absolute inset-x-0 top-0 z-10 opacity-25" />
              <img
                src="/images/nosotros/nosotros_2.jpg"
                alt="Procedimientos médico-quirúrgicos respaldados por Quirumédica SAS"
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </Reveal>

            {/* Misión y Visión apiladas, con entrada escalonada */}
            <div className="grid gap-6">
              {MISION_VISION.map(({ title, body }, i) => (
                <Reveal
                  key={title}
                  as="article"
                  delay={120 + i * 120}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-paper p-8 hover:border-accent/50 sm:p-10"
                >
                  <div className="caliper absolute inset-x-0 top-0 opacity-40" />
                  <h3 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
