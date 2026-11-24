export type Maquina = {
  id: string;
  cliente: string;
  modelo: string;
  tipo: "Mensal" | "Avulso";
};

export type OrdemServico = {
  numero: string;          
  maquinaId: string;
  data: string;
  tecnico: string;
  status: Status;
  pendencia: string;
  diagnostico: string;
  observacoes: string;
  itens: Item[];
};

export type Item = {
  id: string;
  problema: string;
  servico: string;
  status: StatusItem;
};

export type Status = "Concluído" | "Pendente" | "Resolvido";

export type StatusItem = "Resolvido" | "Pendente" | "Recusado pelo cliente";

export type CardMaquinaProps = { maquina : Maquina };