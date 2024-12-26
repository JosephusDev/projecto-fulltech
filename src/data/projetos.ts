import { Api } from "@/services/api";

interface IProjeto{
    id: string;
    nome: string;
    descricao: string;
    valor: number;
    tecnologias: string;
    status: boolean;
}
interface IData{
    projetos: IProjeto[];
    total: number;
}

export const getProjects = async (page: number, limit: number) => {
    const response = await Api.get<IData>(`/projetos/${page}/${limit}`)
    const projetos = response.data.projetos;
    const total = response.data.total;
    return { projetos, total };
}

export const createProject = async (data: Omit<IProjeto, "id">) => {
    const response = await Api.post<IProjeto>('/projetos', data);
    return response.data;
};


export const updateProject = async ({ id, status }: { id: string; status: boolean }) => {
    await Api.put(`/projetos/${id}`, { status });
};
  
export const deleteProject = async (id: string) => {
    await Api.delete(`/projetos/${id}`);
};