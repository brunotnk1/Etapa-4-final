"use client";

import { useState } from "react";
import CardMaquina from "@/components/CardMaquina";
import type { Maquina } from "@/tipos";

type ListaMaquinasProps = {
  maquinas: Maquina[];
};

export default function ListaMaquinas({ maquinas }: ListaMaquinasProps) {
  const [busca, setBusca] = useState("");

  const termo = busca.toLowerCase();
  const filtradas = maquinas.filter(
    (m) =>
      m.id.toLowerCase().includes(termo) ||
      m.cliente.toLowerCase().includes(termo) ||
      m.modelo.toLowerCase().includes(termo)
  );

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          className="w-full rounded-lg border bg-white px-3 py-2"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar máquina..."
        />
        <span className="whitespace-nowrap text-sm text-gray-500">
          {filtradas.length} {filtradas.length === 1 ? "máquina" : "máquinas"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtradas.length === 0 ? (
          <p className="text-gray-500">Nenhuma máquina encontrada.</p>
        ) : (
          filtradas.map((m) => <CardMaquina key={m.id} maquina={m} ordens={[]} />)
        )}
      </div>
    </section>
  );
}