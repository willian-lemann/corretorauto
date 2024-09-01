import axios from "axios";

export async function getAgents() {
  const response = await axios.post(
    "https://www.crecisc.conselho.net.br/form_pesquisa_cadastro_geral_site.php",
    {
      cidade: "Imbituba",
    }
  );
  return response.data;
}
