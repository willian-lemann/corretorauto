"use server";

import { getUser } from "@/data-access/get-user";
import { supabaseDB } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath } from "next/cache";

type CheckAgentResponse = {
  cadastros: Array<{
    id: number;
    creci: number;
    nome: string;
    situacao: boolean;
    cpf: string;
    tipo: 1 | 2;
    foto: boolean;
    regular: boolean;
    telefones: string[];
  }>;
};

export async function checkAgent(prevState: any, formData: FormData) {
  const { userId } = auth();

  const loggedUser = await getUser({ id: userId! });

  const agentID = formData.get("agent-id") as string;

  if (agentID.length === 0) {
    return { error: "Por favor, insira o número do CRECI", success: false };
  }

  try {
    const response = await axios.post<CheckAgentResponse>(
      "https://www.crecisc.conselho.net.br/form_pesquisa_cadastro_geral_site.php",
      {
        inscricao: agentID,
      }
    );

    if (response.status === 500) {
      console.log("passou response 500");

      return {
        error: "Ocorreu um erro ao tentar checar o corretor",
        success: false,
      };
    }

    const { cadastros } = response.data;

    if (cadastros.length === 0) {
      return {
        error: "Nenhum registro encontrado com esse CRECI",
        success: false,
      };
    }

    const [agent] = response.data.cadastros;

    if (!agent) {
      return {
        error: "Nenhum registro encontrado com esse CRECI",
        success: false,
      };
    }

    const foundAgentWithAgentId = await supabaseDB
      .from("agents")
      .select("*")
      .filter("agentId", "eq", agent.creci)
      .single();

    console.log("agentid ", foundAgentWithAgentId);

    if (foundAgentWithAgentId.data) {
      return {
        error: "Não é possível logar com um CRECI de outro corretor",
        success: false,
      };
    }

    if (agent.situacao) {
      const { error } = await supabaseDB.from("agents").insert({
        id: agent.id,
        agentId: agent.creci,
        name: agent.nome,
        cpf: agent.cpf,
        type: agent.tipo,
        hasPhoto: agent.foto,
        isRegular: agent.regular,
        isActive: agent.situacao,
        phones: agent.telefones,
        user_id: loggedUser.id,
      });

      if (error) {
        return {
          error: "Ocorreu um erro ao tentar checar o corretor",
          success: false,
        };
      }

      await supabaseDB
        .from("users")
        .update({ role: "agent" })
        .eq("id", loggedUser.id);

      revalidatePath("/");
    }
  } catch (error) {
    return {
      error: "Ocorreu um erro ao tentar checar o corretor",
      success: false,
    };
  }
}
