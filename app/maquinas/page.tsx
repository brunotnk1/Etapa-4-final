import ListaMaquinas from "@/components/ListaMaquinas";
import { maquinas } from "@/dados";

export default function PaginaMaquinas() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Máquinas</h1>
      <ListaMaquinas maquinas={maquinas} />
    </div>
  );
}