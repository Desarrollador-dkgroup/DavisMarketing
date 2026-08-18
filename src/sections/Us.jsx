import { BarChart3, Megaphone, MessageSquareText, UsersRound } from "lucide-react";

const marketingStages = [
  {
    number: "01",
    name: "AUDIENCIA",
    title: "Entender",
    description: "Descubrimos a quién debe hablarle tu marca y qué necesita escuchar.",
    Icon: UsersRound,
  },
  {
    number: "02",
    name: "CONTENIDO",
    title: "Conectar",
    description: "Convertimos la estrategia en mensajes y experiencias con identidad.",
    Icon: MessageSquareText,
  },
  {
    number: "03",
    name: "CAMPAÑAS",
    title: "Activar",
    description: "Llevamos cada idea a los canales correctos con una ejecución coherente.",
    Icon: Megaphone,
  },
  {
    number: "04",
    name: "RESULTADOS",
    title: "Crecer",
    description: "Medimos lo que funciona, aprendemos y optimizamos el siguiente movimiento.",
    Icon: BarChart3,
  },
];

function Us() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative scroll-mt-[-90px] isolate min-h-screen scroll-mt-16 overflow-hidden bg-transparent px-6 py-28 font-sans text-white sm:px-10 lg:px-16 xl:px-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[6%] top-20 h-44 w-44 rounded-full bg-[#1C3D72]/20 blur-[90px]" />
        <div className="absolute bottom-10 right-[8%] h-52 w-52 rounded-full bg-[#AAC551]/15 blur-[100px]" />
        <div className="marketing-grid absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[#AAC551]">
              <span className="h-px w-11 bg-[#AAC551]" aria-hidden="true" />
              NUESTRA FORMA DE TRABAJAR
            </div>

            <h2 id="nosotros-title" className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
              No hacemos ruido
              <br />
              <span className="text-[#AAC551]">Creamos impacto</span>
            </h2>

            <span aria-hidden="true" className="my-8 block h-px w-16 bg-[#AAC551]" />
            <p className="text-base leading-8 text-white/72 sm:text-lg">
              Diseñamos estrategias de marketing que convierten atención en conexión,
              y conexión en resultados para tu marca.
            </p>

            <div className="mt-10 flex flex-wrap gap-2 text-[11px] font-bold tracking-[0.16em]">
              {marketingStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/40 px-3 py-2 text-white/70">
                    {stage.title.toUpperCase()}
                  </span>
                  {index < marketingStages.length - 1 && <span aria-hidden="true" className="text-[#AAC551]">→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="marketing-board relative border border-white/15 bg-[#070808]/85 p-4 shadow-2xl sm:p-7">
            <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.22em] text-[#AAC551]">SISTEMA DAVIS</p>
                <p className="mt-1 text-sm text-white/55">De una idea a una marca que avanza</p>
              </div>
            </div>

            <ol className="marketing-flow relative space-y-3">
              {marketingStages.map(({ number, name, title, description, Icon }, index) => (
                <li
                  key={name}
                  className={`marketing-stage group relative z-10 ml-8 border border-white/15 bg-black/85 
                    px-4 py-4 transition duration-500 hover:border-[#AAC551]/70 
                    sm:ml-12 sm:px-5 ${index % 2 === 1 ? "sm:translate-x-7" : "sm:-translate-x-1"}`}
                  style={{ animationDelay: `${index * 130}ms` }}
                >
                  <span className="absolute -left-10 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center 
                  rounded-full border border-[#AAC551] bg-black text-[10px] font-bold text-[#AAC551] 
                  sm:-left-12 sm:h-8 sm:w-8">
                    {number}
                  </span>
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center border border-[#1C3D72] bg-[#1C3D72]/20 text-[#AAC551] transition group-hover:bg-[#AAC551] group-hover:text-black">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-lg font-bold">{title}</h3>
                        <span className="text-[10px] font-bold tracking-[0.18em] text-[#AAC551]">{name}</span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
                    </div>
                  </div>
                </li>
              ))} 
            </ol> 
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[0.16em] left-1/2 -z-0 
      -translate-x-1/2 whitespace-nowrap text-[23vw] font-extrabold leading-none 
      tracking-[-0.07em] text-transparent opacity-25 [-webkit-text-stroke:1px_#AAC551]">
        MARKETING
      </div>
    </section>
  );
}

export default Us;
