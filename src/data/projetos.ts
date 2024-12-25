import { Api } from "@/services/api";

interface IProjeto{
    id: string;
    nome: string;
    descricao: string;
    valor: number;
    tecnologias: string;
    status: boolean;
}

export const getProjects = async () => {
    const response = await Api.get<IProjeto[]>('/projetos');
    return response.data;
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