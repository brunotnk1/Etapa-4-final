"use client";
import { useState, type FormEvent } from "react";
import { maquinas } from "@/dados";
import type { Item, OrdemServico, Status, StatusItem } from "@/tipos";

type FormNovaOSProps = {
  onSalvar: (ordem: OrdemServico) => void;
  proximoNumero: string;
};

function linhaVazia(): Item {
  return { id: crypto.randomUUID(), problema: "", servico: "", status: "Resolvido" };
}

// Classes repetidas em vários campos: guardadas numa variável pra não repetir
const estiloCampo = "mt-1 w-full rounded-lg border px-3 py-2";
const estiloLabel = "block text-sm font-medium text-gray-700";

export default function FormNovaOS({ onSalvar, proximoNumero }: FormNovaOSProps) {
  const [maquinaId, setMaquinaId] = useState(maquinas[0].id);
  const [data, setData] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [status, setStatus] = useState<Status>("Concluído");
  const [pendencia, setPendencia] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [itens, setItens] = useState<Item[]>([
  { id: "linha-inicial", problema: "", servico: "", status: "Resolvido" },
]);
  function adicionarItem() {
    setItens([...itens, linhaVazia()]);
  }

  function removerItem(id: string) {
    setItens(itens.filter((item) => item.id !== id));
  }

  function atualizarItem(id: string, campo: keyof Item, valor: string) {
    setItens(itens.map((item) => (item.id === id ? { ...item, [campo]: valor } : item)));
  }

  function salvar(e: FormEvent) {
    e.preventDefault();

    onSalvar({
      numero: proximoNumero,
      maquinaId,
      data,
      tecnico,
      status,
      pendencia: status === "Concluído" ? "Nenhuma" : pendencia,
      diagnostico,
      observacoes,
      itens: itens.filter((item) => item.problema || item.servico),
    });

    setTecnico("");
    setStatus("Concluído");
    setPendencia("");
    setDiagnostico("");
    setObservacoes("");
    setItens([linhaVazia()]);
  }

  return (
    <form onSubmit={salvar} className="space-y-5 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">
        Nova OS <span className="text-blue-700">{proximoNumero}</span>
      </h2>

      {/* Dados do atendimento: 3 colunas em tela média ou maior */}
      <div className="grid gap-4 sm:grid-cols-3">
        <label className={estiloLabel}>
          Máquina
          <select className={estiloCampo} value={maquinaId} onChange={(e) => setMaquinaId(e.target.value)}>
            {maquinas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id} - {m.modelo}
              </option>
            ))}
          </select>
        </label>

        <label className={estiloLabel}>
          Data
          <input type="date" className={estiloCampo} value={data} onChange={(e) => setData(e.target.value)} required />
        </label>

        <label className={estiloLabel}>
          Técnico
          <input className={estiloCampo} value={tecnico} onChange={(e) => setTecnico(e.target.value)} required />
        </label>
      </div>

      {/* Linhas de serviço */}
      <div>
        <p className={estiloLabel}>Problema encontrado → Serviço realizado</p>
        <div className="mt-1 space-y-2">
          {itens.map((item) => (
            <div key={item.id} className="flex gap-2">
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={item.problema}
                onChange={(e) => atualizarItem(item.id, "problema", e.target.value)}
                placeholder="Problema encontrado"
              />
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={item.servico}
                onChange={(e) => atualizarItem(item.id, "servico", e.target.value)}
                placeholder="Serviço realizado"
              />
              <select
                className="rounded-lg border px-3 py-2"
                value={item.status}
                onChange={(e) => atualizarItem(item.id, "status", e.target.value as StatusItem)}
              >
                <option>Resolvido</option>
                <option>Pendente</option>
                <option>Recusado pelo cliente</option>
              </select>
              <button
                type="button"
                onClick={() => removerItem(item.id)}
                className="rounded-lg px-3 text-xl text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={adicionarItem} className="mt-2 text-sm font-medium text-blue-700 hover:underline">
          + Adicionar linha
        </button>
      </div>

      {/* Diagnóstico e observações lado a lado */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={estiloLabel}>
          Diagnóstico
          <textarea className={estiloCampo} rows={3} value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
        </label>
        <label className={estiloLabel}>
          Observações
          <textarea className={estiloCampo} rows={3} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </label>
      </div>

      {/* Status e pendência */}
      <div className="grid gap-4 sm:grid-cols-3">
        <label className={estiloLabel}>
          Status
          <select className={estiloCampo} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            <option>Concluído</option>
            <option>Pendente</option>
            <option>Resolvido</option>
          </select>
        </label>

        {status !== "Concluído" && (
          <label className={`${estiloLabel} sm:col-span-2`}>
            Pendência
            <input className={estiloCampo} value={pendencia} onChange={(e) => setPendencia(e.target.value)} required />
          </label>
        )}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800">
          Salvar OS
        </button>
      </div>
    </form>
  );
}