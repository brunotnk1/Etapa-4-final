import type { Maquina, OrdemServico, Status } from "@/tipos";

type CardMaquinaProps = {
  maquina: Maquina;
  ordens: OrdemServico[];
};

// Cor do selo de cada status
const coresStatus: Record<Status, string> = {
  Concluído: "bg-green-100 text-green-700",
  Pendente: "bg-amber-100 text-amber-700",
  Resolvido: "bg-blue-100 text-blue-700",
};

export default function CardMaquina({ maquina, ordens }: CardMaquinaProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-bold text-blue-700">{maquina.id}</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          {maquina.tipo}
        </span>
      </div>
      <p className="text-sm font-medium">{maquina.cliente}</p>
      <p className="text-sm text-gray-500">{maquina.modelo}</p>

      <h3 className="mt-4 text-xs font-semibold uppercase text-gray-400">Histórico</h3>
      {ordens.length === 0 ? (
        <p className="text-sm text-gray-400">Sem atendimentos.</p>
      ) : (
        <ul className="mt-1 space-y-1">
          {ordens.map((o) => (
            <li key={o.numero} className="flex items-center justify-between text-sm">
              <span>
                {o.numero} · {o.data} · {o.tecnico}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${coresStatus[o.status]}`}>
                {o.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}