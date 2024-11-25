export interface Link {
  href: string;
}

export interface ObjPlanos {
  content: Plano[];
  page: number;
  page_elements: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

export interface Plano {
  registro_ans: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  classificacao_sigla: string;
  ativa: boolean;
  _links: {
    self: Link;
  };
}

export interface PlanoDetalhado extends Plano {
  email: string;
  representante_nome: string;
  representante_cargo: string;
  autorizacao_funcionamento_em: string;
  concessao_registro_definitivo_em: string;
  registrada_em: string;
  classificacao_nome: string;
  segmentacao_sigla: string;
  segmentacao_nome: string;
  endereco_logradouro: string;
  endereco_numero: string;
  endereco_bairro: string;
  endereco_cep: string;
  endereco_municipio_codigo: string;
  endereco_municipio_nome: string;
  endereco_uf_sigla: string;
  endereco_valido: boolean;
  telefone_ddd: string;
  telefone_numero: string;
  fax_ddd: string;
  fax_numero: string;
  _links: {
    self: Link;
    operadoras: Link & { templated: boolean };
  };
}
