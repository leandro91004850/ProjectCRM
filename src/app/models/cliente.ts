export interface Cliente{
    id?: any; // ? significa que é opcional
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: string[]; //array de perfis
    dataCriacao: any;

}
