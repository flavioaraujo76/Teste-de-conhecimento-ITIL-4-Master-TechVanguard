import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  app.post("/api/generate-scenario", async (req, res) => {
    try {
      const { currentStats, previousScenarioContext, turn } = req.body;

      // Determine the phase sequentially but keep it thematic based on turn
      let phase = "Fase 1: Conceitos Básicos e As 4 Dimensões";
      if (turn > 3 && turn <= 6) phase = "Fase 2: Os 7 Princípios Orientadores";
      if (turn > 6 && turn <= 9) phase = "Fase 3: SVS e Cadeia de Valor";
      if (turn > 9) phase = "Fase 4: As Práticas Principais da ITIL 4";

      const prompt = `
      Você é um Especialista ITIL 4 Master e Mestre de RPG. Gere um Cénario/Turno para um simulador de negócios ITIL (turno atual: ${turn}).
      Fase/Tema sugerido para focar: "${phase}".
      
      Status do jogador (0 a 200, onde 100 é o inicial. <=0 é Game Over):
      - Eficiência da TI: ${currentStats?.efficiency ?? 100}
      - Satisfação do Cliente (CSAT): ${currentStats?.csat ?? 100}
      - Orçamento: ${currentStats?.budget ?? 100}
      
      Contexto do turno passado (se houver, use como gancho de continuidade caso faça sentido, ou crie uma nova crise se nulo): ${
        previousScenarioContext || "Sua primeira semana como Diretor de TI da TechVanguard."
      }
      
      INSTRUÇÕES E REQUISITOS OBRIGATÓRIOS:
      1. Se o "Orçamento" estiver muito baixo (<50), crie um cenário em que a TI precise evitar gastos ou um stakeholder negue mais recursos.
      2. Se o "CSAT" estiver muito baixo (<30), foque em usuários finais revoltados e reclamações críticas na Central de Serviços.
      3. Se "Eficiência" estiver muito baixa (<40), traga incidentes, quedas de serviço ou dívida técnica explodindo.
      4. Formule "context" descrevendo o problema ou nova oportunidade.
      5. Formule "question" perguntando "Como você age baseando-se nas boas práticas da ITIL 4?".
      6. Forneça exatamente 4 opções. Apenas 1 (uma) deve ser "isCorrect: true", as outras 3 "isCorrect: false".
      7. A resposta correta deve seguir os preceitos oficiais do ITIL 4 (Cadeia de Valor, Princípios, Práticas ou Dimensões dependendo da Fase).
      8. Os impactos ("impact") em eficiência, csat e budget devem variar entre -40 e +40. Respostas corretas devem ajudar a melhorar a situação; respostas erradas devem prejudicar mais a métrica que já está ruim, ou outras.
      9. O "explanation" deve ser detalhado e embasado no glossário da prova do ITIL 4 Foundation, explicando o porquê a opção correta é correta. Retorne JSON apenas.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER, description: "Número inteiro do turno" },
              phase: { type: Type.STRING },
              context: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: "'A', 'B', 'C', ou 'D'" },
                    text: { type: Type.STRING },
                    isCorrect: { type: Type.BOOLEAN },
                    impact: {
                      type: Type.OBJECT,
                      properties: {
                        efficiency: { type: Type.NUMBER },
                        csat: { type: Type.NUMBER },
                        budget: { type: Type.NUMBER },
                      },
                      required: ["efficiency", "csat", "budget"],
                    },
                  },
                  required: ["id", "text", "isCorrect", "impact"],
                },
                description: "Array com exatamente 4 opções",
              },
              explanation: { type: Type.STRING },
            },
            required: ["id", "phase", "context", "question", "options", "explanation"],
          },
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate scenario." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
